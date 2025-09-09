import { useEffect, useState } from "react";

import { getPokemonByIdOrName } from "@/api/pokeapi";
import { Pokemon } from "@/types/pokemon";

export const usePokemonDetailed = (id: string) => {
  const [loading, setLoading] = useState(false);
  const [pokemonData, setPokemonData] = useState<Pokemon>();

  const handleFetchPokemonDetails = () => {
    setLoading(true);
    getPokemonByIdOrName(id)
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
