import { Link } from "expo-router";
import { View as UnthemedView, StyleSheet } from "react-native";

import { NamedAPIResource } from "@/types/pokemon";
import { useFavoritesPokemons } from "@/store/favoritesPokemons";

import { Avatar } from "./Avatar";
import { Text, View } from "../Themed";
import { FavoriteButton } from "./FavoriteButton";
import { useThemeColorsContext } from "@/contexts/ThemeColors";

export const PokemonCard = (pokemon: NamedAPIResource) => {
  const { name, url, sprite } = pokemon;
  const { principal, cardBackground, cardText } = useThemeColorsContext();
  const { isFavorite, change } = useFavoritesPokemons();

  return (
    <Link href={url}>
      <View style={[styles.card, { backgroundColor: cardBackground }]}>
        <Avatar uri={sprite} style={styles.sprite} />
        <UnthemedView style={styles.infoContainer}>
          <Text style={[styles.title, { color: cardText }]}>{name}</Text>
          <Text style={[styles.details, { color: principal }]}>
            Press for details
          </Text>
        </UnthemedView>
        <FavoriteButton
          isFavorite={isFavorite(pokemon)}
          onPress={() => change(pokemon)}
        />
      </View>
    </Link>
  );
};

export const PokemonCardLoading = () => {
  const { cardBackground, cardText } = useThemeColorsContext();

  return (
    <View style={[styles.card, { backgroundColor: cardBackground }]}>
      <Avatar style={styles.sprite} />
      <UnthemedView style={styles.infoContainer}>
        <Text style={[styles.title, { color: cardText }]}>Loading...</Text>
      </UnthemedView>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 8,
    padding: 16,
    elevation: 2,
    gap: 24,
  },
  sprite: {
    width: 64,
    height: 64,
  },
  infoContainer: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
    gap: 4,
  },
  title: {
    textTransform: "capitalize",
    fontSize: 18,
    fontWeight: "bold",
  },
  details: {
    fontSize: 14,
  },
});
