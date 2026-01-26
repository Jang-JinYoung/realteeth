import { useQuery, useQueries } from "@tanstack/react-query";
import { GeoPosition } from "../types/locationType";
import { fetchTimeMachine, fetchWeatherOneCall } from "../api/weatherAPI";

const useTodayWeatherWithPastHourly = (position?: GeoPosition) => {
    /* 1. 현재 + 미래 날씨 */
    const weatherQuery = useQuery({
        queryKey: ["weather-onecall", position?.lat, position?.lon],
        queryFn: () => fetchWeatherOneCall(position!.lat, position!.lon),
        enabled: !!position?.lat && !!position?.lon,
    });

    /* 2. 오늘 기준 시간 계산 */
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

    /* 3. 0시 ~ 현재-1시 타임스탬프 */
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

    /* 4. 과거 시간대 Time Machine */
    const pastHourlyQueries = useQueries({
        queries: pastHourlyTimestamps.map((dt) => ({
            queryKey: ["weather-timemachine", position?.lat, position?.lon, dt],
            queryFn: () => fetchTimeMachine(position!.lat, position!.lon, dt),
            enabled: !!position?.lat && !!position?.lon,
        })),
    });

    /* 5. 과거 시간 데이터 정리 */
    const pastHourlyData = pastHourlyQueries
        .filter((q) => q.data)
        .flatMap((q) => q.data!.data[0] ?? []);

    return {
        weather: weatherQuery.data,
        location: `${weatherQuery.data?.documents[0].address.region_1depth_name} ${weatherQuery.data?.documents[0].address.region_2depth_name} ${weatherQuery.data?.documents[0].address.region_3depth_name}`,
        isWeatherLoading: weatherQuery.isLoading,

        pastHourlyData,
        isPastHourlyLoading: pastHourlyQueries.some((q) => q.isLoading),

        error:
            weatherQuery.error || pastHourlyQueries.find((q) => q.error)?.error,
    };
}


export default useTodayWeatherWithPastHourly;