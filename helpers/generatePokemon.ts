import { Pokemon } from "@/types/pokemon";

import { NewPokemonFormData } from "@/app/new";

const fakePokemonHeight = (): string => {
  return (Math.floor(Math.random() * 10) + 1).toString();
};

const fakePokemonWeight = (): string => {
  return (Math.floor(Math.random() * 100) + 1).toString();
};

const fakePokemonStats = (): { name: string; value: number }[] => {
  return [
    { name: "hp", value: Math.floor(Math.random() * 100) + 1 },
    { name: "attack", value: Math.floor(Math.random() * 100) + 1 },
    { name: "defense", value: Math.floor(Math.random() * 100) + 1 },
    { name: "special-attack", value: Math.floor(Math.random() * 100) + 1 },
    { name: "special-defense", value: Math.floor(Math.random() * 100) + 1 },
    { name: "speed", value: Math.floor(Math.random() * 100) + 1 },
  ];
};

export const generatePokemon = (data: NewPokemonFormData): Pokemon => {
  return {
    id: Date.now(),
    name: data.name,
    types: data.type ? [data.type] : ["normal"],
    sprites: {
      front_default: data.sprite,
    },
    height: fakePokemonHeight(),
    weight: fakePokemonWeight(),
    abilities: ["unknown"],
    stats: fakePokemonStats(),
    __local: true,
  };
};
