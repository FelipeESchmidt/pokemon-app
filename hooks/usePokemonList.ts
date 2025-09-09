import { useEffect, useState } from "react";

import { getPokemonList } from "@/api/pokeapi";
import { NamedAPIResource } from "@/types/pokemon";
import { useCustomStore } from "@/store/customPokemons";

export const usePokemonList = () => {
  const { getListAsSimple, custom } = useCustomStore();
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

  useEffect(() => {
    const customList = getListAsSimple();
    const allLoadedPokemon = pokemonData.filter((p) => !p.__local);
    setPokemonData([...customList, ...allLoadedPokemon]);
  }, [custom]);

  return {
    pokemonData,
    loading,
    handleEndReached,
  };
};
