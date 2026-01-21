export type LocationApiResponse = {
    country: string;
    lat: number;
    lon: number;
    name: string;
    local_name: {
        ko: string;
        en: string;
    }
}[];