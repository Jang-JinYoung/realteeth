import { districtData } from "../data/korea_districts";
import { useEffect, useMemo, useRef, useState } from "react";

interface IProps {
    locationSearchCallback: (locationName: string) => void;
}

const LocationSearch = ({ locationSearchCallback }: IProps) => {
    const itemRefs = useRef<(HTMLLIElement | null)[]>([]);

    const [query, setQuery] = useState("");
    const [selected, setSelected] = useState<string | null>(null);

    const [activeIndex, setActiveIndex] = useState<number>(-1);

    useEffect(() => {
        if (activeIndex < 0) return;

        const el = itemRefs.current[activeIndex];
        if (el) {
            el.scrollIntoView({
                block: "nearest",
                behavior: "smooth", // 원하면 제거 가능
            });
        }
    }, [activeIndex]);

    const suggestions = useMemo(() => {
        if (!query) return [];

        const keyword = query.replace(/\s/g, "");

        return districtData
            .filter((d) => d.replace(/\s/g, "").includes(keyword))
            .slice(0, 10); // 너무 많아지는 것 방지
    }, [query]);

    const highlightKeyword = (text: string, keyword: string) => {
        if (!keyword) return text;

        const escaped = keyword.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
        const regex = new RegExp(`(${escaped})`, "gi");

        return text.split(regex).map((part, index) =>
            part.toLowerCase() === keyword.toLowerCase() ? (
                <span key={index} className="text-red-500 font-medium">
                    {part}
                </span>
            ) : (
                part
            ),
        );
    };

    return (
        <section className="pt-6 pb-4 relative">
            {/* 입력 영역 */}
            <div
                className="flex items-center gap-3
                           rounded-xl border border-slate-200
                           px-4 py-3 bg-white"
            >
                {/* 아이콘 */}
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5 text-slate-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-4.35-4.35M10 18a8 8 0 100-16 8 8 0 000 16z"
                    />
                </svg>

                {/* 입력 */}
                <input
                    type="text"
                    placeholder="지역 검색"
                    className="flex-1 outline-none text-sm
                               placeholder:text-slate-400"
                    value={query}
                    onChange={(e) => {
                        setQuery(e.target.value);
                        setSelected(null);
                        setActiveIndex(-1);
                    }}
                    onKeyDown={(e) => {
                        if (suggestions.length === 0) return;

                        if (e.key === "ArrowDown") {
                            e.preventDefault();
                            setActiveIndex((prev) =>
                                prev < suggestions.length - 1 ? prev + 1 : 0,
                            );
                        }
                        if (e.key === "ArrowUp") {
                            e.preventDefault();
                            setActiveIndex((prev) =>
                                prev > 0 ? prev - 1 : suggestions.length - 1,
                            );
                        }
                        if (e.key === "Enter" && activeIndex >= 0) {
                            e.preventDefault();
                            setActiveIndex(-1);
                            const selectedItem = suggestions[activeIndex];

                            setQuery(selectedItem.replace(/-/g, " "));
                            setSelected(selectedItem);
                            locationSearchCallback(selectedItem);
                        }
                    }}
                />
            </div>

            {/* 자동완성 */}
            {suggestions.length > 0 && !selected && (
                <ul
                    className="absolute left-0 right-0
                               rounded-xl border border-slate-200
                               bg-white shadow-lg
                               max-h-64 overflow-y-auto z-10"
                >
                    {suggestions.map((item, index) => (
                        <li
                            key={item}
                            ref={(el) => {
                                itemRefs.current[index] = el;
                            }}
                            className={`
                                px-4 py-2 text-sm cursor-pointer
                                ${index === activeIndex ? "bg-slate-100" : ""}
                                hover:bg-slate-100
                            `}
                            onClick={() => {
                                setQuery(item.replace(/-/g, " "));
                                setSelected(item);
                                locationSearchCallback(item);
                            }}
                        >
                            {highlightKeyword(item.replace(/-/g, " "), query)}
                        </li>
                    ))}
                </ul>
            )}
        </section>
    );
};
export default LocationSearch;
