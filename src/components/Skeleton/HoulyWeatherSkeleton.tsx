import Skeleton from "../Skeleton";

const HoulyWeatherSkeleton = () => {
    return (
        <ul className="flex gap-4 overflow-x-auto pb-4">
            {Array.from({ length: 12 }).map((_, i) => (
                <li
                    key={i}
                    className="min-w-[72px] rounded-xl bg-slate-100
                                        flex flex-col items-center py-3"
                >
                    <Skeleton className="h-4 w-8" />
                    <Skeleton className="w-8 h-8 my-2 rounded-full" />
                    <Skeleton className="h-3 w-6" />
                </li>
            ))}
        </ul>
    );
};

export default HoulyWeatherSkeleton;
