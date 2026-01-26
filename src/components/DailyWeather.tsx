import WeatherMetaItem from "../atoms/WeatherMetaItem";
import FavoriteIcon from "../atoms/FavoriteIcon";
import { IFavoriteLocation } from "../types/locationType";
import LocationIcon from "../atoms/LocationIcon";
interface IProps {
    variant?: "main" | "card";
    nowTemp: number;
    minTemp: number;
    maxTemp: number;
}

const DailyWeather = ({
    variant = "main",
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
            className={`flex flex-col items-center ${variant === "main" ? "py-12" : "py-10"}} `}
        >
            <span
                className={`font-bold leading-none
                        ${isCard ? "" : "text-[64px]"}`}
            >
                {getFixed(nowTemp)}°
            </span>

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
