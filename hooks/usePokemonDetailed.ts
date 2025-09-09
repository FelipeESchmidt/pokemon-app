import { useEffect, useState } from "react";

import { getPokemonByIdOrName } from "@/api/pokeapi";
import { useCustomStore } from "@/store/customPokemons";
import { Pokemon } from "@/types/pokemon";

export const usePokemonDetailed = (id: string) => {
  const { get } = useCustomStore();
  const [loading, setLoading] = useState(false);
  const [pokemonData, setPokemonData] = useState<Pokemon>();

  const handleSearchLocally = (id: string) => {
    const localData = get(id);
    if (localData) {
      setPokemonData(localData);
      return true;
    }
    return false;
  };

  const handleFetchPokemonDetails = () => {
    if (handleSearchLocally(id)) return;
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
