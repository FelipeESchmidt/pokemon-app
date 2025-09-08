import { PokemonListResponse } from "@/types/pokemon";

import { normalizePokemonListResponse } from "./normalizer";

const BASE = "https://pokeapi.co/api/v2";
const PAGE_LIMIT = 20;

export const getPokemonList = async (
  page: number
): Promise<PokemonListResponse> => {
  const offset = (page - 1) * PAGE_LIMIT;
  const limit = PAGE_LIMIT;

  await new Promise((resolve) => setTimeout(resolve, 10000));

  const url = `${BASE}/pokemon?limit=${limit}&offset=${offset}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`List fetch failed: ${res.status}`);
  return normalizePokemonListResponse(await res.json());
};
