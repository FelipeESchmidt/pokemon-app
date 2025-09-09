import { useEffect } from "react";
import { useRouter } from "expo-router";
import { FlatList, StyleSheet } from "react-native";

import { useFavoritesPokemons } from "@/store/favoritesPokemons";
import { Text, View } from "@/components/Themed";
import { PokemonCard } from "@/components/ui/PokemonCard";

export default function FavoritesScreen() {
  const router = useRouter();
  const { favorites } = useFavoritesPokemons();

  useEffect(() => {
    if (!favorites.length) {
      router.back();
    }
  }, [favorites]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>List of Favorites</Text>
      {!!favorites.length && (
        <FlatList
          key={"pokemon-favorites-list"}
          data={favorites}
          renderItem={({ item }) => <PokemonCard {...item} />}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          keyExtractor={(item, index) => `${item.name}-${item.id}-${index}`}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
    padding: 12,
    gap: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 5,
    height: 1,
    width: "80%",
  },
});
