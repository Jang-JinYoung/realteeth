import React, { useEffect, useState } from "react";
import { fetchWeatherOneCall, getLatLonByLocation } from "../api/weatherAPI";
import { useQuery } from "@tanstack/react-query";
import useGeolocation from "../hooks/useGeolocation";
import LocationSearch from "../components/LocationSearch";
import DailyWeather from "../components/DailyWeather";

const nowHour = new Date().getHours();

const WeatherPage = () => {
    /* 사용자의 현재 위치 정보 */
    const {
        position,
        setPosition,
        loading,
        error: useGeolocationError,
    } = useGeolocation();

    /* 해당 지역의 날씨 정보 API */
    const { data, isLoading, error } = useQuery({
        queryKey: [position?.lat, position?.lon],
        queryFn: () => fetchWeatherOneCall(position?.lat, position?.lon),
        enabled: !!position?.lat && !!position?.lon,
    });

    // 지역 선택
    const [locationName, setLocationName] = useState<string | null>(null);
    /* 지역 검색 API */
    const {
        data: locationData,
        isLoading: isLocationLoading,
        error: locationError,
    } = useQuery({
        queryKey: [locationName],
        queryFn: () => getLatLonByLocation(locationName),
        // queryFn: () => getLatLonByLocation("서울특별시 종로구 청운동")
        enabled: !!locationName,
    });

    useEffect(() => {
        if (!isLocationLoading && locationData) {
            console.log(locationData[0]);
            setPosition({
                lat: locationData[0].lat,
                lon: locationData[0].lon,
            });
        }
    }, [locationData]);

    const locationSearchCallback = (locationName: string) => {
        const getLastWord = (text: string) => {
            const parts = text.trim().split(" ");
            return parts[parts.length - 1];
        };

        setLocationName(getLastWord(locationName));
    };

    if (loading) return <div>위치 확인 중...</div>;
    if (useGeolocationError) return <div>위치 정보를 가져올 수 없습니다.</div>;
    if (!position) return <div>123</div>;

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;
    if (!data) return <div>해당 장소의 정보가 제공되지 않습니다.</div>;

    return (
        <div className="w-full">
            <div className="mx-auto max-w-4xl px-4 border border-slate-200 rounded-2xl bg-white">
                <LocationSearch
                    locationSearchCallback={locationSearchCallback}
                />

                <DailyWeather
                    nowTemp={data.current.temp}
                    minTemp={data.daily[0].temp.min}
                    maxTemp={data.daily[0].temp.max}
                />

                <section className="mt-10">
                    <ul className="flex gap-4 overflow-x-auto pb-4">
                        {data.hourly.map((h) => {
                            const hour = new Date(h.dt * 1000).getHours();

                            return (
                                <li
                                    key={h.dt}
                                    className="min-w-[72px] rounded-xl bg-slate-100
                                       flex flex-col items-center py-3"
                                >
                                    <span className="text-sm font-semibold text-black">
                                        {Math.round(h.temp)}°
                                    </span>

                                    <img
                                        src="https://openweathermap.org/img/wn/01d@2x.png"
                                        className="w-8 h-8 my-1"
                                    />

                                    <span className="text-xs text-slate-500">
                                        {hour}시
                                    </span>
                                </li>
                            );
                        })}
                    </ul>
                </section>
            </div>
        </div>
    );
};

export default WeatherPage;
