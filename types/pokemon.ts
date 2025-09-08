import { Href } from "expo-router";

export type NamedAPIResource = {
  id: number;
  name: string;
  url: Href;
  sprite?: string;
};

export type PokemonListResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: NamedAPIResource[];
};

export type Pokemon = {
  id: number;
  name: string;
  sprites?: {
    front_default?: string;
    back_default?: string;
  };
  types?: string[];
  abilities?: string[];
  height?: string;
  weight?: string;
  stats?: { name: string; value: number }[];
  // Local-only fields
  __local?: boolean;
  __spriteOverride?: string;
};
