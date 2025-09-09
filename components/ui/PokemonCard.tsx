import { Link } from "expo-router";
import { View as UnthemedView, StyleSheet, useColorScheme } from "react-native";

import Colors from "@/constants/Colors";
import { NamedAPIResource } from "@/types/pokemon";
import { useFavoritesPokemons } from "@/store/favoritesPokemons";

import { Avatar } from "./Avatar";
import { Text, View } from "../Themed";
import { FavoriteButton } from "./FavoriteButton";

export const PokemonCard = (pokemon: NamedAPIResource) => {
  const { name, url, sprite } = pokemon;
  const { isFavorite, change } = useFavoritesPokemons();
  const colorScheme = useColorScheme();

  const backgroundColor = Colors[colorScheme ?? "light"].cardBackground;
  const textColor = Colors[colorScheme ?? "light"].cardText;
  const principalColor = Colors[colorScheme ?? "light"].principal;

  return (
    <Link href={url}>
      <View style={[styles.card, { backgroundColor }]}>
        <Avatar uri={sprite} style={styles.sprite} />
        <UnthemedView style={styles.infoContainer}>
          <Text style={[styles.title, { color: textColor }]}>{name}</Text>
          <Text style={[styles.details, { color: principalColor }]}>
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
  const colorScheme = useColorScheme();

  const backgroundColor = Colors[colorScheme ?? "light"].cardBackground;
  const textColor = Colors[colorScheme ?? "light"].cardText;

  return (
    <View style={[styles.card, { backgroundColor }]}>
      <Avatar style={styles.sprite} />
      <UnthemedView style={styles.infoContainer}>
        <Text style={[styles.title, { color: textColor }]}>Loading...</Text>
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
