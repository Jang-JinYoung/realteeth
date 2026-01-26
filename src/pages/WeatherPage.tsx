import { useParams } from "react-router-dom";
import DailyWeatherSkeleton from "../components/Skeleton/DailyWeatherSkeleton";
import HoulyWeatherSkeleton from "../components/Skeleton/HoulyWeatherSkeleton";
import {
    IFavortieLocationStore,
    useFavoriteStore,
} from "../stores/favoriteStore";
import { useEffect, useState } from "react";
import DailyWeather from "../components/DailyWeather";
import useTodayWeatherWithPastHourly from "../hooks/useTodayWeatherWithPastHourly";
import HourlyWeather from "../components/HourlyWeather";
import { NoData } from "../components/NoData";
import LocationIcon from "../atoms/LocationIcon";

const WeatherPage = () => {
    const { locationName } = useParams();
    const decodedLocationName = decodeURIComponent(locationName ?? "");

    const { getFavoirteByLocationName } = useFavoriteStore();

    const [data, setData] = useState<IFavortieLocationStore | undefined>();

    const {
        weather,
        location,
        pastHourlyData,
        isWeatherLoading,
        isPastHourlyLoading,
        error,
    } = useTodayWeatherWithPastHourly({
        lat: data?.lat ?? 0,
        lon: data?.lon ?? 0,
    });

    useEffect(() => {
        if (decodedLocationName !== "") {
            const favorite = getFavoirteByLocationName(decodedLocationName);
            setData(favorite);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [decodedLocationName]);

    if (!pastHourlyData || !weather) return <div>잘못된 접근입니다.</div>;

    if (error) return <div>error</div>;

    return (
        <div className="w-full mt-10">
            <div className="mx-auto max-w-4xl px-4 border border-slate-200 rounded-2xl bg-white ">
                {(isWeatherLoading || isPastHourlyLoading) && (
                    <>
                        <DailyWeatherSkeleton />
                        <HoulyWeatherSkeleton />
                    </>
                )}
                {!(isWeatherLoading || isPastHourlyLoading) && weather && (
                    <>
                        <div className="p-6 pb-0 flex items-center justify-between text-slate-600 text-xs">
                            <div className="flex items-center gap-2">
                                <LocationIcon />
                                <span>{location} {data?.alias && <span>({data?.alias})</span>}</span>
                            </div>
                        </div>
                        <DailyWeather
                            nowTemp={weather.current.temp}
                            minTemp={weather.daily[0].temp.min}
                            maxTemp={weather.daily[0].temp.max}
                        />

                        <HourlyWeather
                            houlyData={[...pastHourlyData, ...weather.hourly]}
                        />
                    </>
                )}
                {!(isWeatherLoading || isPastHourlyLoading) && !data && (
                    <NoData message="날씨 데이터를 불러올 수 없습니다." />
                )}
            </div>
        </div>
    );
};

export default WeatherPage;
