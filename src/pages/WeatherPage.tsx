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

const WeatherPage = () => {
    const isLoading = false;

    const { locationName } = useParams();
    const decodedLocationName = decodeURIComponent(locationName ?? "");

    const { getFavoirteByLocationName } = useFavoriteStore();

    const [data, setData] = useState<IFavortieLocationStore | undefined>();

    const {
        weather,
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
    }, [decodedLocationName]);

    if (!data) return <div>잘못된 접근입니다.</div>;

    return (
        <div className="w-full">
            <div className="mx-auto max-w-4xl px-4 border border-slate-200 rounded-2xl bg-white ">
                {isLoading && (
                    <>
                        <DailyWeatherSkeleton />
                        <HoulyWeatherSkeleton />
                    </>
                )}

                <div className="mt-10">
                    <DailyWeather
                        nowTemp={data.nowTemp}
                        minTemp={data.minTemp}
                        maxTemp={data.maxTemp}
                    />

                    {isWeatherLoading || isPastHourlyLoading ? (
                        <HourlyWeather houlyData={[...pastHourlyData]} />
                    ) : (
                        <HourlyWeather houlyData={[...pastHourlyData]} />
                    )}
                </div>
                {/* {!isLoading && !data && (
                // <NoData message="날씨 데이터를 불러올 수 없습니다." />
                <div>nodata</div>
            )}

            
            {!isLoading && data && (
                <>

                    <HoulyWeather
                        houlyData={[...pastHourlyData, ...data.hourly]}
                    />
                </>
            )} */}
            </div>
        </div>
    );
};

export default WeatherPage;
