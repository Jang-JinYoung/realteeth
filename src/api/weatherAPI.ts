import {
    KakaoLocationApiResponse,
    LocationApiResponse,
} from "../types/locationType";
import { WeatherOneCallResponse } from "../types/weatherType";

export const getLatLonByLocation = async (q: string): Promise<LocationApiResponse> => {
    const res = await fetch(
        `https://dapi.kakao.com/v2/local/search/address.json?query=${q}`, {
            headers: {
                Authorization: `KakaoAK ${process.env.REACT_APP_KAKAO_API_KEY}`,
            },
        }
    );

    if (!res.ok) {
        // throw { code: 100, message: "지역 검색 좌표가 없습니다.", data };
    }

    return res.json() as Promise<LocationApiResponse>;
};

export const fetchWeatherOneCall = async (
    lat: number | undefined,
    lon: number | undefined,
): Promise<WeatherOneCallResponse & KakaoLocationApiResponse> => {
    const weatherUrl =
        `https://api.openweathermap.org/data/3.0/onecall` +
        `?lat=${lat}` +
        `&lon=${lon}` +
        `&exclude=minutely,alerts` +
        `&units=metric` +
        `&lang=kr` +
        `&appid=${process.env.REACT_APP_OPENWEATHER_API_KEY}`;

    const kakaoUrl =
        `https://dapi.kakao.com/v2/local/geo/coord2address.json` +
        `?x=${lon}&y=${lat}&input_coord=WGS84`;

    const [weatherRes, kakaoRes] = await Promise.all([
        fetch(weatherUrl),
        fetch(kakaoUrl, {
            headers: {
                Authorization: `KakaoAK ${process.env.REACT_APP_KAKAO_API_KEY}`,
            },
        }),
    ]);

    if (!weatherRes.ok) {
        throw new Error("Weather API failed");
    }

    if (!kakaoRes.ok) {
        throw new Error("Kakao API failed");
    }

    const [weather, address] = await Promise.all([
        weatherRes.json(),
        kakaoRes.json(),
    ]);

    return {
        ...weather, // current, hourly, daily 그대로 사용
        ...address, // 카카오 주소 정보
    };
};

export const fetchTimeMachine = async (
    lat: number | undefined,
    lon: number | undefined,
    dt: number,
): Promise<any> => {
    const res = await fetch(
        `https://api.openweathermap.org/data/3.0/onecall/timemachine` +
            `?lat=${lat}` +
            `&lon=${lon}` +
            `&dt=${dt}` +
            `&units=metric` +
            `&lang=kr` +
            `&appid=${process.env.REACT_APP_OPENWEATHER_API_KEY}`,
    );

    if (!res.ok) {
        throw new Error("TimeMachine fetch failed");
    }

    return res.json();
};
