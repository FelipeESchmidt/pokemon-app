import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

import type { Pokemon, NamedAPIResource } from "../types/pokemon";
import { Href } from "expo-router";

type CustomState = {
  custom: Pokemon[];
  add: (p: Pokemon) => Pokemon;
  get: (id: number) => Pokemon | undefined;
  remove: (id: number) => void;
  getListAsSimple: () => NamedAPIResource[];
};

export const useCustomStore = create<CustomState>()(
  persist(
    (set, get) => ({
      custom: [],
      add: (pokemon) => {
        set({ custom: [pokemon, ...get().custom] });
        return pokemon;
      },
      getListAsSimple: () => {
        return get().custom.map(
          (pokemon): NamedAPIResource => ({
            id: pokemon.id,
            name: pokemon.name,
            url: ("custom/" + pokemon.id) as Href,
            sprite: pokemon.sprites?.front_default,
          })
        );
      },
      get: (id) => get().custom.find((p) => p.id === id),
      remove: (id) => set({ custom: get().custom.filter((p) => p.id !== id) }),
    }),
    {
      name: "custom-pokemon-store",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
