import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

import type { Pokemon } from "../types/pokemon";

type CustomState = {
  custom: Pokemon[];
  add: (p: Pokemon) => Pokemon;
};

export const useCustomStore = create<CustomState>()(
  persist(
    (set, get) => ({
      custom: [],
      add: (pokemon) => {
        set({ custom: [pokemon, ...get().custom] });
        return pokemon;
      },
    }),
    {
      name: "custom-pokemon-store",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
