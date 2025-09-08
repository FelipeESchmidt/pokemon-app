import { Alert, StyleSheet, View } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";

import { PokemonDetailedCard } from "@/components/ui/PokemonDetailedCard";
import { useCustomStore } from "@/store/customPokemons";
import { Button } from "@/components/ui/Button";

export default function CustomPokemonDetailsScreen() {
  const router = useRouter();
  const { get, remove } = useCustomStore();
  const { id } = useLocalSearchParams();
  const idToSearch = Number(id);

  const pokemonData = get(idToSearch);

  const handleRemove = () => {
    remove(idToSearch);
    Alert.alert("Success", `Removed ${pokemonData?.name}`);
    router.back();
  };

  return (
    <View style={styles.container}>
      {pokemonData && <PokemonDetailedCard {...pokemonData} />}
      <Button onPress={handleRemove} text="Remove" />
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
