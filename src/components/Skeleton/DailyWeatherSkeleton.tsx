import Skeleton from "../Skeleton";

const DailyWeatherSkeleton = () => {
    return (
        <section className="relative flex flex-col items-center py-12">
            <div className="absolute top-4 left-4">
                <Skeleton className="h-4 w-28" />
            </div>

            <div className="absolute top-4 right-4">
                <Skeleton className="w-6 h-6 rounded-full" />
            </div>

            <div className="flex flex-col items-center">
                <Skeleton className="h-4 w-20 mb-4" />
                <Skeleton className="h-[64px] w-[120px]" />
            </div>

            <div className="flex gap-3 mt-6">
                <Skeleton className="h-4 w-14" />
                <Skeleton className="h-4 w-14" />
            </div>
        </section>
    );
};

export default DailyWeatherSkeleton;
