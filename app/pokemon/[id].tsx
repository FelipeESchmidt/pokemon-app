import { StyleSheet, View } from "react-native";
import { useLocalSearchParams } from "expo-router";

import { usePokemonDetailed } from "@/hooks/usePokemonDetailed";
import {
  PokemonDetailedCard,
  PokemonDetailedCardLoading,
} from "@/components/ui/PokemonDetailedCard";

export default function PokemonDetailsScreen() {
  const { id } = useLocalSearchParams();
  const idToSearch = Number(id);

  const { pokemonData, loading } = usePokemonDetailed(idToSearch);

  return (
    <View style={styles.container}>
      {loading && <PokemonDetailedCardLoading />}
      {pokemonData && <PokemonDetailedCard {...pokemonData} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
    gap: 8,
  },
});
