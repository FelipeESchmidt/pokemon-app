import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

type FavoriteState = {
  favorites: number[];
  change: (id: number) => void;
  isFavorite: (name: number) => boolean;
};

export const useFavoritesPokemons = create<FavoriteState>()(
  persist(
    (set, get) => ({
      favorites: [],
      change: (id) => {
        if (get().favorites.includes(id)) {
          set({ favorites: get().favorites.filter((favId) => favId !== id) });
        } else {
          set({ favorites: [id, ...get().favorites] });
        }
      },
      isFavorite: (id) => get().favorites.includes(id),
    }),
    {
      name: "favorites-pokemon-store",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
