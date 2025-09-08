import { useEffect, useState } from "react";

import { getPokemonList } from "@/api/pokeapi";
import { NamedAPIResource } from "@/types/pokemon";

export const usePokemonList = () => {
  const [page, setPage] = useState(1);
  const [hasNext, setHasNext] = useState(true);
  const [loading, setLoading] = useState(false);
  const [pokemonData, setPokemonData] = useState<NamedAPIResource[]>([]);

  const handleFetchPokemonList = () => {
    setLoading(true);
    getPokemonList(page)
      .then(({ results, next }) => {
        setPokemonData((prev) => [...prev, ...results]);
        setHasNext(!!next);
      })
      .finally(() => setLoading(false));
  };

  const handleEndReached = () => {
    if (!hasNext) return;
    setPage((prev) => prev + 1);
  };

  useEffect(() => {
    handleFetchPokemonList();
  }, [page]);

  return {
    pokemonData,
    loading,
    handleEndReached,
  };
};
