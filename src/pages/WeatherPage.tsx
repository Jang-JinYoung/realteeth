import React, { useEffect, useState } from "react";
import {
    fetchTimeMachine,
    fetchWeatherOneCall,
    getLatLonByLocation,
} from "../api/weatherAPI";
import { useQueries, useQuery } from "@tanstack/react-query";
import useGeolocation from "../hooks/useGeolocation";
import LocationSearch from "../components/LocationSearch";
import DailyWeather from "../components/DailyWeather";
import FavoriteLocation from "../components/FavoriteLocation";
import { IFavoriteLocation } from "../types/locationType";
import { useFavoriteStore } from "../stores/favoriteStore";
import HoulyWeather from "../components/HourlyWeather";
import DailyWeatherSkeleton from "../components/Skeleton/DailyWeatherSkeleton";
import HoulyWeatherSkeleton from "../components/Skeleton/HoulyWeatherSkeleton";
import { useNavigate } from "react-router-dom";

const WeatherPage = () => {

    console.log(process.env.REACT_APP_OPENWEATHER_API_KEY);

    const navigate = useNavigate();
    
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

    const now = new Date();
    const currentHour = now.getHours();

    const todayBase = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate(),
        0,
        0,
        0,
    );

    const pastHourlyTimestamps = Array.from({ length: currentHour }, (_, i) =>
        Math.floor(
            new Date(
                todayBase.getFullYear(),
                todayBase.getMonth(),
                todayBase.getDate(),
                i,
                0,
                0,
            ).getTime() / 1000,
        ),
    );

    const pastHourlyQueries = useQueries({
        queries: pastHourlyTimestamps.map((dt) => ({
            queryKey: ["weather-timemachine", position?.lat, position?.lon, dt],
            queryFn: () => fetchTimeMachine(position?.lat, position?.lon, dt),
            enabled: !!position?.lat && !!position?.lon,
            staleTime: 1000 * 60 * 10,
        })),
    });

    const pastHourlyData = pastHourlyQueries
        .filter((q) => q.data)
        .flatMap((q) => q.data!.data[0] ?? []);


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
        enabled: !!locationName,
    });

    useEffect(() => {
        if (!isLocationLoading && locationData) {
            setPosition({
                lat: locationData[0].lat,
                lon: locationData[0].lon,
            });
        }
    }, [locationData]);

    const locationSearchCallback = (locationName: string) => {
        // 지역이름
        const getSearchKeywort = (text: string) => {
            const parts = text.trim().split(" ").reverse();
            return parts.join(",");
        };

        setLocationName(getSearchKeywort(locationName));

        // 좋아요 갱신
        setFavorite(false);
    };

    const { favorites, toggleFavorite, removeFavorite } = useFavoriteStore();

    const [favorite, setFavorite] = useState(false);

    const favoriteCallback = (
        d: IFavoriteLocation,
        variant: "main" | "card",
    ) => {
        if (variant === "main") {
            setFavorite((prev) => !prev);

            toggleFavorite(d);
        } else {
            removeFavorite(d.locationName);
        }
    };

    const onFavortieLocationClick = () => {
        navigate(`/weather/${position?.lat}/${position?.lon}`);
    }

    if (loading) return <div>위치 확인 중...</div>;
    if (useGeolocationError) return <div>위치 정보를 가져올 수 없습니다.</div>;
    if (!position) return <div>123</div>;

    if (error) return <div>Error: {error.message}</div>;

    return (
        <div>
            <div className="w-full">
                <div className="mx-auto max-w-4xl px-4 border border-slate-200 rounded-2xl bg-white">
                    <LocationSearch
                        locationSearchCallback={locationSearchCallback}
                    />

                    {isLoading && (
                        <>
                            <DailyWeatherSkeleton />
                            <HoulyWeatherSkeleton />
                        </>
                    )}

                    {/* 2️⃣ 데이터 없음 */}
                    {!isLoading && !data && (
                        // <NoData message="날씨 데이터를 불러올 수 없습니다." />
                        <div>nodata</div>
                    )}

                    {/* 3️⃣ 정상 데이터 */}
                    {!isLoading && data && (
                        <>
                            <DailyWeather
                                locationName={`${data.documents[0].address.region_2depth_name} ${data.documents[0].address.region_3depth_name}`}
                                favorite={favorite}
                                favoriteCallback={favoriteCallback}
                                nowTemp={data.current.temp}
                                minTemp={data.daily[0].temp.min}
                                maxTemp={data.daily[0].temp.max}
                            />

                            <HoulyWeather houlyData={[...pastHourlyData ,...data.hourly]} />
                        </>
                    )}
                </div>
            </div>
            <FavoriteLocation
                favoriteLocation={favorites}
                favoriteCallback={favoriteCallback}
                onFavortieLocationClick={onFavortieLocationClick}
            />
        </div>
    );
};

export default WeatherPage;
