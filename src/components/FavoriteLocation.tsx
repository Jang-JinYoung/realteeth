
import { IFavoriteLocation } from "../types/locationType";
import DailyWeather from "./DailyWeather";

interface IProps {
    favoriteLocation: any[];
    favoriteCallback: (d: IFavoriteLocation, variant: "main" | "card") => void;
    onFavortieLocationClick: () => void;
}

const FavoriteLocation = ({
    favoriteLocation,
    favoriteCallback,
    onFavortieLocationClick
}: IProps) => {
    
    return (
        <section className="mt-10">
            <div className="max-w-4xl mx-auto">
                <h2 className="mb-3 text-sm font-medium text-slate-600">
                    즐겨찾기 지역
                </h2>

                <ul
                    className="flex gap-4
                                    overflow-x-auto
                                    pb-2 scrollbar-hide"
                >
                    {favoriteLocation.map((item) => (
                        <li key={item.locationName} onClick={onFavortieLocationClick}>
                            <div
                                className="rounded-2xl bg-white
                                        border border-slate-200
                                        shadow-sm cursor-pointer
                                        flex flex-col items-center justify-center
                                        transition hover:shadow-md"
                            >
                                <DailyWeather
                                    variant="card"
                                    locationName={item.locationName}
                                    favoriteCallback={() => favoriteCallback({...item}, "card")}
                                    nowTemp={item.nowTemp}
                                    minTemp={item.minTemp}
                                    maxTemp={item.maxTemp}
                                />
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
};

export default FavoriteLocation;
