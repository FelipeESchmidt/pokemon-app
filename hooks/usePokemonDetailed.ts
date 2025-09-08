import { useEffect, useState } from "react";

import { getPokemonById } from "@/api/pokeapi";
import { Pokemon } from "@/types/pokemon";

export const usePokemonDetailed = (id: number) => {
  const [loading, setLoading] = useState(false);
  const [pokemonData, setPokemonData] = useState<Pokemon>();

  const handleFetchPokemonDetails = () => {
    setLoading(true);
    getPokemonById(id)
      .then((data) => setPokemonData(data))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    handleFetchPokemonDetails();
  }, []);

  return {
    pokemonData,
    loading,
  };
};
