import { useEffect, useState } from "react";

import { getPokemonList } from "@/api/pokeapi";
import { NamedAPIResource } from "@/types/pokemon";
import { useCustomStore } from "@/store/customPokemons";

export const usePokemonList = () => {
  const { getListAsSimple } = useCustomStore();
  const [page, setPage] = useState(1);
  const [hasNext, setHasNext] = useState(true);
  const [loading, setLoading] = useState(false);
  const [pokemonData, setPokemonData] = useState<NamedAPIResource[]>([]);

  const handleSetPokemonData = (data: NamedAPIResource[], page: number) => {
    const customData = getListAsSimple();
    if (page === 1) {
      setPokemonData([...customData, ...data]);
      return;
    }
    setPokemonData((prev) => [...prev, ...data]);
  };

  const handleFetchPokemonList = () => {
    setLoading(true);
    getPokemonList(page)
      .then(({ results, next }) => {
        handleSetPokemonData(results, page);
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
