import { NamedAPIResource, PokemonListResponse } from "@/types/pokemon";

export const spriteById = (id: number) => {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
};

export const extractIdFromUrl = (url: string) => {
  const parts = url.split("/").filter(Boolean);
  return Number(parts[parts.length - 1]);
};

export const normalizePokemonList = (list: any): NamedAPIResource[] => {
  if (!list || !Array.isArray(list)) return [];

  return list.map((item: { url: string; name: string }) => {
    const id = extractIdFromUrl(item.url);
    return {
      id,
      url: "/",
      name: item.name,
      sprite: spriteById(id),
    };
  }) as NamedAPIResource[];
};

export const normalizePokemonListResponse = (
  data: any
): PokemonListResponse => {
  if (!data) return { count: 0, next: null, previous: null, results: [] };

  const { count, next, previous, results } = data;
  return {
    count,
    next,
    previous,
    results: normalizePokemonList(results),
  };
};
