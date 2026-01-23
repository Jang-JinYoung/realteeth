import { useState } from "react";
import WeatherMetaItem from "../atoms/WeatherMetaItem";
import FavoriteIcon from "../atoms/FavoriteIcon";
import { IFavoriteLocation } from "../types/locationType";
import Skeleton from "./Skeleton";

interface IProps {
    variant?: "main" | "card";
    favorite?: boolean;
    favoriteCallback: (d: IFavoriteLocation, variant: "main" | "card") => void;
    locationName: string;
    nowTemp: number;
    minTemp: number;
    maxTemp: number;
}

const DailyWeather = ({
    variant = "main",
    favorite = true,
    favoriteCallback,
    locationName,
    nowTemp,
    minTemp,
    maxTemp,
}: IProps) => {
    const isCard = variant === "card";

    const getFixed = (temp: number) => {
        return temp.toFixed(1);
    };

    return (
        <section
            className={`relative flex flex-col items-center
                        ${isCard ? "p-4 w-[190px] rounded-2xl border border-slate-200 bg-white" : "py-12"}`}
        >
            <div
                className={`absolute top-4 left-4 flex items-center gap-1 text-slate-600 ${isCard ? "top-3 left-3 text-xs" : "top-4 left-4 text-sm"}`}
            >
                {/* 위치 아이콘 */}
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4 text-slate-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 11c1.657 0 3-1.343 3-3S13.657 5 12 5s-3 1.343-3 3 1.343 3 3 3z"
                    />
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19.5 8c0 7-7.5 11-7.5 11S4.5 15 4.5 8a7.5 7.5 0 1115 0z"
                    />
                </svg>

                {/* 주소 텍스트 */}
                <span className="font-medium">{locationName}</span>
            </div>

            <button
                onClick={() =>
                    favoriteCallback(
                        { locationName, nowTemp, minTemp, maxTemp },
                        variant,
                    )
                }
                className={`absolute ${isCard ? "top-3 right-3" : "top-4 right-4"}`}
                aria-label="즐겨찾기"
            >
                <FavoriteIcon favorite={favorite} />
            </button>

            <div className="flex flex-col items-center">
                {!isCard && (
                    <div className="text-base font-medium text-slate-600 mb-2">
                        현재기온
                    </div>
                )}

                <span
                    className={`font-bold leading-none text-black
                                ${isCard ? "text-2xl mt-6" : "text-[64px]"}`}
                >
                    {getFixed(nowTemp)}°
                </span>
            </div>

            <div
                className={`flex items-center gap-2 text-slate-500
                        ${isCard ? "text-xs mt-2" : "text-sm mt-2"}`}
            >
                <WeatherMetaItem label="최저" value={getFixed(minTemp)} />
                <span>·</span>
                <WeatherMetaItem label="최고" value={getFixed(maxTemp)} />
            </div>
        </section>
    );
};

export default DailyWeather;
