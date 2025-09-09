import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { NamedAPIResource } from "@/types/pokemon";

type FavoriteState = {
  favorites: NamedAPIResource[];
  change: (pokemon: NamedAPIResource) => void;
  isFavorite: (name: NamedAPIResource) => boolean;
};

const checkIfIsFavorite = (
  favorites: NamedAPIResource[],
  pokemon: NamedAPIResource
) => {
  return !!favorites.find((fav) => fav.name === pokemon.name);
};

export const useFavoritesPokemons = create<FavoriteState>()(
  persist(
    (set, get) => ({
      favorites: [],
      change: (pokemon) => {
        const favorites = get().favorites;
        if (checkIfIsFavorite(favorites, pokemon)) {
          set({ favorites: favorites.filter(({ id }) => id !== pokemon.id) });
        } else {
          set({ favorites: [pokemon, ...favorites] });
        }
      },
      isFavorite: (pokemon) => checkIfIsFavorite(get().favorites, pokemon),
    }),
    {
      name: "favorites-pokemon-store",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
