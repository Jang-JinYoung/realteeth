import { create } from "zustand";
import { GeoPosition, IFavoriteLocation } from "../types/locationType";

export interface IFavortieLocationStore extends GeoPosition, IFavoriteLocation {};

interface FavoriteStore {
    favorites: IFavortieLocationStore[];

    addFavorite: (location: IFavortieLocationStore) => void;
    removeFavorite: (locationName: string) => void;
    toggleFavorite: (location: IFavortieLocationStore) => void;
    updateAlias: (locationName: string, alias: string) => void;
    clearFavorites: () => void;
    getFavoirteByLocationName: (locationName: string) => IFavortieLocationStore | undefined;
}
export const useFavoriteStore = create<FavoriteStore>((set, get) => ({
    favorites: [],

    addFavorite: (location) =>
        set((state) => {
            const exists = state.favorites.some(
                (item) => item.locationName === location.locationName,
            );

            if (exists || state.favorites.length >= 6) {
                return state;
            }

            return {
                favorites: [...state.favorites, location],
            };
        }),

    removeFavorite: (locationName) =>
        set((state) => ({
            favorites: state.favorites.filter(
                (item) => item.locationName !== locationName,
            ),
        })),

    toggleFavorite: (location) => {
        const { favorites } = get();
        const exists = favorites.some(
            (item) => item.locationName === location.locationName,
        );

        set({
            favorites: exists
                ? favorites.filter(
                      (item) => item.locationName !== location.locationName,
                  )
                : favorites.length < 6
                  ? [...favorites, location]
                  : favorites,
        });
    },

    updateAlias: (locationName, alias) =>
        set((state) => ({
            favorites: state.favorites.map((item) =>
                item.locationName === locationName ? { ...item, alias } : item,
            ),
        })),

    clearFavorites: () => set({ favorites: [] }),


    getFavoirteByLocationName: (locationName) => {
        const { favorites } = get();

        return favorites.find(
            (item) => item.locationName === locationName,
        );
    },
}));
