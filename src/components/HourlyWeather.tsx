import { useEffect, useRef } from "react";
import { IHoulyWeather } from "../types/weatherType";

interface IProps {
    houlyData: IHoulyWeather[];
}

const HourlyWeather = ({ houlyData }: IProps) => {
    const currentHourRef = useRef<HTMLLIElement | null>(null);

    useEffect(() => {
        if (currentHourRef.current) {
            currentHourRef.current.scrollIntoView({
                behavior: "smooth",
                inline: "center", // 가로 스크롤 핵심
                block: "nearest",
            });
        }
    }, [houlyData]);

    const todayHourly = houlyData.filter((h: IHoulyWeather) => {
        const now = new Date();

        const startOfToday = new Date(
            now.getFullYear(),
            now.getMonth(),
            now.getDate(),
            0,
            0,
            0,
        );

        const endOfToday = new Date(
            now.getFullYear(),
            now.getMonth(),
            now.getDate(),
            23,
            59,
            59,
        );

        const date = new Date(h.dt * 1000);
        return date >= startOfToday && date <= endOfToday;
    });

    return (
        <ul className="flex gap-4 overflow-x-auto pb-4 pb-10">
            {todayHourly.map((h: IHoulyWeather) => {
                const hour = new Date(h.dt * 1000).getHours();
                const isCurrentHour = hour === new Date().getHours();

                return (
                    <li
                        key={h.dt}
                        ref={isCurrentHour ? currentHourRef : null}
                        className="min-w-[72px] rounded-xl bg-slate-100
                                       flex flex-col items-center py-3 bg-white"
                    >
                        <span className="text-sm font-semibold text-black">
                            {Math.round(h.temp)}°
                        </span>

                        <img
                            src={`https://openweathermap.org/img/wn/${h.weather[0].icon}@2x.png`}
                            className="w-10 h-10 my-1"
                            alt={h.weather[0].description}
                        />

                        <span className="text-xs text-slate-500">{hour}시</span>
                    </li>
                );
            })}
        </ul>
    );
};

export default HourlyWeather;
