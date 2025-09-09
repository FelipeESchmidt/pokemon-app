import { Href } from "expo-router";

import { Pokemon, NamedAPIResource } from "@/types/pokemon";

export const transformPokemonDetailedToSimple = (
  pokemon: Pokemon
): NamedAPIResource => {
  const { id, name, sprites } = pokemon;
  return {
    id,
    name,
    url: `pokemon/${id}` as Href,
    sprite: sprites?.front_default,
  };
};
