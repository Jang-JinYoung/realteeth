import React, { useEffect, useState } from "react";
import { getLatLonByLocation } from "../api/weatherAPI";
import { useQuery } from "@tanstack/react-query";
import useGeolocation from "../hooks/useGeolocation";
import LocationSearch from "../components/LocationSearch";
import DailyWeather from "../components/DailyWeather";
import FavoriteLocation from "../components/FavoriteLocation";
import { useFavoriteStore } from "../stores/favoriteStore";
import DailyWeatherSkeleton from "../components/Skeleton/DailyWeatherSkeleton";
import HoulyWeatherSkeleton from "../components/Skeleton/HoulyWeatherSkeleton";
import { useNavigate } from "react-router-dom";
import LocationIcon from "../atoms/LocationIcon";
import { NoData } from "../components/NoData";
import FavoriteIcon from "../atoms/FavoriteIcon";
import useTodayWeatherWithPastHourly from "../hooks/useTodayWeatherWithPastHourly";
import HourlyWeather from "../components/HourlyWeather";

const MainPage = () => {
    const navigate = useNavigate();

    /* 사용자의 현재 위치 정보 */
    const {
        position,
        setPosition,
        loading,
        error: useGeolocationError,
    } = useGeolocation();

    const {
        weather,
        location,
        pastHourlyData,
        isWeatherLoading,
        isPastHourlyLoading,
    } = useTodayWeatherWithPastHourly({
        lat: position?.lat ?? 0,
        lon: position?.lon ?? 0,
    });

    const [locationName, setLocationName] = useState<string>("");

    const {
        data: locationData,
        isLoading: isLocationLoading,
        isSuccess: isLocationSearchSuccess,
        error: locationError,
    } = useQuery({
        queryKey: [locationName],
        queryFn: () => getLatLonByLocation(locationName),
        enabled: !!locationName,
    });

    useEffect(() => {
        if (!isLocationLoading && locationData) {
            console.log(locationData.documents[0].address);
            setPosition({
                lat: locationData.documents[0].address.y,
                lon: locationData.documents[0].address.x,
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLocationSearchSuccess, locationData]);

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

    const { favorites, toggleFavorite, updateAlias } = useFavoriteStore();

    const [favorite, setFavorite] = useState<boolean>(false);

    const onFavoriteClick = () => {
        setFavorite((prev) => !prev);

        toggleFavorite({
            nowTemp: weather!.current.temp,
            maxTemp: weather!.daily[0].temp.max,
            minTemp: weather!.daily[0].temp.min,
            locationName: location,
            lat: position!.lat,
            lon: position!.lon,
        });
    };

    const onFavortieLocationClick = (locationName: string) => {
        navigate(`/weather/${encodeURIComponent(locationName)}`);
    };

    if (loading) return <div>위치 확인 중...</div>;
    if (useGeolocationError || !position || locationError)
        return <div>위치 정보를 가져올 수 없습니다.</div>;

    return (
        <div>
            <div className="w-full">
                {loading ?? <div>위치 정보 확인 중입니다...</div>}
                <div className="mx-auto max-w-4xl px-4 border border-slate-200 rounded-2xl bg-white">
                    <LocationSearch
                        locationSearchCallback={locationSearchCallback}
                    />

                    {(isWeatherLoading || isPastHourlyLoading) && (
                        <>
                            <DailyWeatherSkeleton />
                            <HoulyWeatherSkeleton />
                        </>
                    )}

                    {!(isWeatherLoading || isPastHourlyLoading) && !weather && (
                        <NoData message="날씨 데이터를 불러올 수 없습니다." />
                    )}

                    {!(isWeatherLoading || isPastHourlyLoading) && weather && (
                        <>
                            <div className="p-6 pb-0 flex items-center justify-between text-slate-600 text-xs">
                                <div className="flex items-center gap-2">
                                    <LocationIcon />
                                    <span>{location}</span>
                                </div>

                                <button
                                    aria-label="즐겨찾기"
                                    onClick={onFavoriteClick}
                                >
                                    <FavoriteIcon favorite={favorite} />
                                </button>
                            </div>
                            <DailyWeather
                                nowTemp={weather.current.temp}
                                minTemp={weather.daily[0].temp.min}
                                maxTemp={weather.daily[0].temp.max}
                            />

                            <HourlyWeather
                                houlyData={[
                                    ...pastHourlyData,
                                    ...weather.hourly,
                                ]}
                            />
                        </>
                    )}
                </div>
            </div>

            <FavoriteLocation
                favoriteLocation={favorites}
                favoriteCallback={onFavoriteClick}
                onFavortieLocationClick={onFavortieLocationClick}
                updateAlias={updateAlias}
            />
        </div>
    );
};

export default MainPage;
