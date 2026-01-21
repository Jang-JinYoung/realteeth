import WeatherMetaItem from "../atoms/WeatherMetaItem";

interface IProps {
    nowTemp: number;
    minTemp: number;
    maxTemp: number;
}

const DailyWeather = ({ nowTemp, minTemp, maxTemp }: IProps) => {

    const getFixed = (temp: number) => {
        return temp.toFixed(1);
    }

    return (
        <section className="flex flex-col items-center py-12">
            <div className="flex flex-col items-center">
                <div className="text-base font-medium text-slate-600 mb-2">
                    현재기온
                </div>

                <span className="text-[64px] font-bold leading-none text-black">
                    {getFixed(nowTemp)}°
                </span>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-2 text-sm text-slate-500">
                <WeatherMetaItem label="최소" value={getFixed(minTemp)} />
                <span>·</span>
                <WeatherMetaItem label="최대" value={getFixed(maxTemp)} />
            </div>
        </section>
    );
};

export default DailyWeather;
