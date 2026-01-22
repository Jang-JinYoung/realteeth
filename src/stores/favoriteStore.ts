import { create } from 'zustand';
import { IFavoriteLocation } from '../types/locationType';

interface FavoriteStore {
    favorites: IFavoriteLocation[];

    addFavorite: (location: IFavoriteLocation) => void;
    removeFavorite: (locationName: string) => void;
    toggleFavorite: (location: IFavoriteLocation) => void;
    clearFavorites: () => void;
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

    clearFavorites: () => set({ favorites: [] }),
}));
