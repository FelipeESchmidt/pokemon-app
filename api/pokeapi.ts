import { Pokemon, PokemonListResponse } from "@/types/pokemon";

import {
  normalizePokemonDetailedResponse,
  normalizePokemonListResponse,
} from "./normalizer";

const BASE = "https://pokeapi.co/api/v2";
const PAGE_LIMIT = 20;

export const getPokemonList = async (
  page: number
): Promise<PokemonListResponse> => {
  const offset = (page - 1) * PAGE_LIMIT;
  const limit = PAGE_LIMIT;

  const url = `${BASE}/pokemon?limit=${limit}&offset=${offset}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`List fetch failed: ${res.status}`);
  return normalizePokemonListResponse(await res.json());
};

export const getPokemonByIdOrName = async (id: string): Promise<Pokemon> => {
  const url = `${BASE}/pokemon/${id}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Pokemon fetch failed: ${res.status}`);
  return normalizePokemonDetailedResponse(await res.json());
};
