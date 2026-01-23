interface SkeletonProps {
    className?: string;
}

const Skeleton = ({ className = "" }: SkeletonProps) => {
    return (
        <div className={`animate-pulse rounded-md bg-slate-200 ${className}`} />
    );
};


export default Skeleton;