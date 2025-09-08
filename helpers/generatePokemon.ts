import { Pokemon } from "@/types/pokemon";

import { NewPokemonFormData } from "@/app/new";
import { randomNumber } from "./randomNumber";

const fakePokemonHeight = (): string => {
  return randomNumber(1, 6).toString();
};

const fakePokemonWeight = (): string => {
  return randomNumber(20, 100).toString();
};

const fakePokemonStats = (): { name: string; value: number }[] => {
  return [
    { name: "hp", value: randomNumber(30, 150) },
    { name: "attack", value: randomNumber(30, 150) },
    { name: "defense", value: randomNumber(30, 150) },
    { name: "special-attack", value: randomNumber(30, 150) },
    { name: "special-defense", value: randomNumber(30, 150) },
    { name: "speed", value: randomNumber(30, 150) },
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
