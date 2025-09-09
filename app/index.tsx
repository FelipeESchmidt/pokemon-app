import { useMemo, useState } from "react";
import { Link, useRouter } from "expo-router";
import { FlatList, StyleSheet } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

import { usePokemonList } from "@/hooks/usePokemonList";
import { useThemeColorsContext } from "@/contexts/ThemeColors";
import { useFavoritesPokemons } from "@/store/favoritesPokemons";
import { Text, View } from "@/components/Themed";
import { EmptyList } from "@/components/ui/EmptyList";
import { InputSearch } from "@/components/ui/InputSearch";
import { FloatingButton } from "@/components/ui/FloatingButton";
import { PokemonCard, PokemonCardLoading } from "@/components/ui/PokemonCard";

export default function ListScreen() {
  const { gold } = useThemeColorsContext();
  const router = useRouter();
  const { favorites } = useFavoritesPokemons();
  const [inputValue, setInputValue] = useState("");
  const { pokemonData, loading, handleEndReached } = usePokemonList();

  const handleInputBlur = () => {
    setInputValue("");
    router.push(`/pokemon/${inputValue}`);
  };

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
      <View style={styles.topContainer}>
        <Text style={styles.title}>List of Pokémon</Text>
        {favorites.length > 0 && (
          <Link href="/favorites">
            <FontAwesome
              name="star-half-full"
              size={25}
              style={{ color: gold }}
            />
          </Link>
        )}
      </View>
      <InputSearch
        placeholder="Search by name or id"
        value={inputValue}
        onChangeText={setInputValue}
        onPressSearch={handleInputBlur}
      />
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
      {!loading && !hasData && <EmptyList />}
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
    display: "flex",
    flexDirection: "column",
    flex: 1,
    padding: 12,
    gap: 8,
  },
  topContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
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
