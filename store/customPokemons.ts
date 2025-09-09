import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

import type { Pokemon, NamedAPIResource } from "../types/pokemon";
import { Href } from "expo-router";

type CustomState = {
  custom: Pokemon[];
  add: (p: Pokemon) => Pokemon;
  get: (idOrName: string) => Pokemon | undefined;
  remove: (idOrName: string) => void;
  getListAsSimple: () => NamedAPIResource[];
};

const findByIdOrName = (pokemon: Pokemon, idOrName: string): boolean => {
  const idOrNameLower = idOrName.toLowerCase().trim();
  const pokemonNameLower = pokemon.name.toLowerCase().trim();

  return pokemon.id === Number(idOrName) || pokemonNameLower === idOrNameLower;
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
            url: ("pokemon/" + pokemon.id) as Href,
            sprite: pokemon.sprites?.front_default,
          })
        );
      },
      get: (idOrName) => get().custom.find((p) => findByIdOrName(p, idOrName)),
      remove: (idOrName) =>
        set({
          custom: get().custom.filter((p) => !findByIdOrName(p, idOrName)),
        }),
    }),
    {
      name: "custom-pokemon-store",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
