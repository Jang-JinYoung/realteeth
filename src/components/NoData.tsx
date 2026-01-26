interface NoDataProps {
    message?: string;
}

export function NoData({ message = '데이터가 없습니다.' }: NoDataProps) {
    return (
        <div className="flex flex-col items-center justify-center py-20
                        text-slate-500">
            <span className="text-sm">{message}</span>
        </div>
    );
}
