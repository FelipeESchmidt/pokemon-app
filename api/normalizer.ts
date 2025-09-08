import { capitalizeString } from "@/helpers/capitalizeString";
import {
  NamedAPIResource,
  Pokemon,
  PokemonListResponse,
} from "@/types/pokemon";

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
      url: "/pokemon/[id]".replace("[id]", String(id)),
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

export const normalizePokemonDetailedResponse = (data: any): Pokemon => {
  return {
    id: data.id,
    name: data.name,
    height: Number((Number(data.height) || 0) / 10).toFixed(1),
    weight: Number((Number(data.weight) || 0) / 10).toFixed(1),
    sprites: {
      front_default: data.sprites?.front_default,
      back_default: data.sprites?.back_default,
    },
    types:
      data.types?.map((typeInfo: any) =>
        capitalizeString(typeInfo.type.name)
      ) || [],
    abilities:
      data.abilities?.map((abilityInfo: any) =>
        capitalizeString(abilityInfo.ability.name)
      ) || [],
    stats:
      data.stats?.map((statInfo: any) => ({
        name: statInfo.stat.name,
        value: statInfo.base_stat,
      })) || [],
  };
};
