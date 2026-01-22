export type LocationApiResponse = {
    country: string;
    lat: number;
    lon: number;
    name: string;
    local_name: {
        ko: string;
        en: string;
    };
}[];

export type KakaoLocationApiResponse = {
    documents: {
        address: {
            region_1depth_name: string;
            region_2depth_name: string;
            region_3depth_name: string;
        };
    }[]
};

export interface IFavoriteLocation {
    locationName: string;
    nowTemp: number;
    minTemp: number;
    maxTemp: number;
}