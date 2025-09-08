import { useMemo } from "react";
import { Link } from "expo-router";
import { FlatList, StyleSheet } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

import { usePokemonList } from "@/hooks/usePokemonList";
import { Text, View } from "@/components/Themed";
import { FloatingButton } from "@/components/ui/FloatingButton";
import { PokemonCard, PokemonCardLoading } from "@/components/ui/PokemonCard";

export default function ListScreen() {
  const { pokemonData, loading, handleEndReached } = usePokemonList();

  const hasData = useMemo(() => !!pokemonData.length, [pokemonData]);

  const renderLoading = () => {
    if (!loading) return null;
    if (!hasData) {
      return (
        <FlatList
          key={"pokemon-list-loading"}
          data={Array.from({ length: 5 })}
          renderItem={() => <PokemonCardLoading />}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          keyExtractor={(_, index) => `card-loading-${index}`}
        />
      );
    }
    return <PokemonCardLoading />;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>List of Pokémon</Text>
      {!!hasData && (
        <FlatList
          key={"pokemon-list"}
          data={pokemonData}
          renderItem={({ item }) => <PokemonCard {...item} />}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          keyExtractor={(item, index) => `${item.name}-${item.id}-${index}`}
          onEndReached={handleEndReached}
        />
      )}
      {renderLoading()}
      <FloatingButton onPress={() => {}}>
        <Link href="/new" style={styles.newButton}>
          <FontAwesome name="plus" size={25} style={{ color: "white" }} />
        </Link>
      </FloatingButton>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
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
  newButton: {
    display: "flex",
    width: 60,
    lineHeight: 60,
    borderRadius: 30,
    textAlign: "center",
  },
});
