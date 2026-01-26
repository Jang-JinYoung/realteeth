
export interface GeoPosition {
    lat: number;
    lon: number;
}

export interface LocationApiResponse {
    documents: {
        address: {
            x: number,
            y: number;
        }
    }[];
};

export interface KakaoLocationApiResponse {
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
    alias?: string;
    nowTemp: number;
    minTemp: number;
    maxTemp: number;
}