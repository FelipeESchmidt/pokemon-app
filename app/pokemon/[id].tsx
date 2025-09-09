import { Alert, StyleSheet, View } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";

import { useCustomStore } from "@/store/customPokemons";
import { usePokemonDetailed } from "@/hooks/usePokemonDetailed";
import {
  PokemonDetailedCard,
  PokemonDetailedCardLoading,
} from "@/components/ui/PokemonDetailedCard";
import { Button } from "@/components/ui/Button";

export default function PokemonDetailsScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const { remove } = useCustomStore();
  const pokemonIdOrName = Array.isArray(id) ? id[0] : id;

  const { pokemonData, loading } = usePokemonDetailed(pokemonIdOrName);

  const handleRemove = () => {
    remove(pokemonIdOrName);
    Alert.alert("Success", `Removed ${pokemonData?.name}`);
    router.back();
  };

  return (
    <View style={styles.container}>
      {loading && <PokemonDetailedCardLoading />}
      {pokemonData && <PokemonDetailedCard {...pokemonData} />}
      {pokemonData?.__local && <Button onPress={handleRemove} text="Remove" />}
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
