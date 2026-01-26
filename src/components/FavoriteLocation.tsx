import { useState } from "react";
import EditIcon from "../atoms/EditIcon";
import FavoriteIcon from "../atoms/FavoriteIcon";
import AliasEditModal from "./AliasEditModal";
import DailyWeather from "./DailyWeather";

interface IProps {
    favoriteLocation: any[];
    favoriteCallback: () => void;
    onFavortieLocationClick: (locationName: string) => void;
    updateAlias: (locationName: string, alias: string) => void;
}

const FavoriteLocation = ({
    favoriteLocation,
    favoriteCallback,
    onFavortieLocationClick,
    updateAlias,
}: IProps) => {
    const [editOpen, setEditOpen] = useState<boolean>(false);
    const [item, setItem] = useState<any | null>();

    return (
        <section className="mt-10">
            <AliasEditModal
                open={editOpen}
                defaultValue={""}
                onCancel={() => {
                    setEditOpen(false);
                    setItem(null);
                }}
                onConfirm={(alias) => {
                    updateAlias(item.locationName, alias);
                    setEditOpen(false);
                    setItem(null);
                }}
            />
            <div className="max-w-4xl mx-auto">
                <h2 className="mb-3 text-sm font-medium text-slate-600">
                    즐겨찾기 지역 (최대 6개)
                </h2>

                <ul
                    className="flex gap-4
                                    overflow-x-auto
                                    pb-2 scrollbar-hide"
                >
                    {favoriteLocation.map((item) => (
                        <li key={item.locationName}>
                            <div
                                className="rounded-2xl bg-white
                                        border border-slate-200
                                        shadow-sm cursor-pointer
                                        flex flex-col w-[200px] pb-3
                                        transition hover:shadow-md"
                            >
                                <div className="flex justify-between text-slate-600 text-xs p-3 pb-2">
                                    {/* 좌측 */}
                                    <div className="flex items-center gap-2">
                                        <button
                                            aria-label="수정하기"
                                            onClick={() => {
                                                setEditOpen(true);
                                                setItem(item);
                                            }}
                                        >
                                            <EditIcon />
                                        </button>
                                        <span className="text-xs text-slate-800 tracking-tight">
                                            {item.alias ?? item.locationName}
                                        </span>
                                    </div>

                                    <button
                                        aria-label="즐겨찾기"
                                        onClick={favoriteCallback}
                                    >
                                        <FavoriteIcon favorite={true} />
                                    </button>
                                </div>
                                <div
                                    role="button"
                                    onClick={() =>
                                        onFavortieLocationClick(
                                            item.locationName,
                                        )
                                    }
                                >
                                    <DailyWeather
                                        variant="card"
                                        nowTemp={item.nowTemp}
                                        minTemp={item.minTemp}
                                        maxTemp={item.maxTemp}
                                    />
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
};

export default FavoriteLocation;
