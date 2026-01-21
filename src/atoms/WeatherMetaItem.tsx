// shared/ui/weather/WeatherMetaItem/WeatherMetaItem.tsx
interface WeatherMetaItemProps {
    label: string;
    value: number | string;
}

const WeatherMetaItem = ({ label, value }: WeatherMetaItemProps) => {
    return (
        <span className="text-slate-700">
            {label} <span className="font-bold text-black">{value}°</span>
        </span>
    );
};

export default WeatherMetaItem;
