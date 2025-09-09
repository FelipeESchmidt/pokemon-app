import { View as UnthemedView, StyleSheet, useColorScheme } from "react-native";

import { Pokemon } from "@/types/pokemon";
import Colors from "@/constants/Colors";
import { useFavoritesPokemons } from "@/store/favoritesPokemons";
import { transformPokemonDetailedToSimple } from "@/helpers/transformPokemonDetailedToSimple";

import { Text, View } from "../Themed";
import { Avatar } from "./Avatar";
import { FavoriteButton } from "./FavoriteButton";
import { PokemonStats } from "./PokemonStats";
import { PokemonAbilities } from "./PokemonAbilities";

export const PokemonDetailedCard = (pokemon: Pokemon) => {
  const { name, sprites, height, weight, types, abilities, stats } = pokemon;
  const simplePokemon = transformPokemonDetailedToSimple(pokemon);
  const { isFavorite, change } = useFavoritesPokemons();
  const colorScheme = useColorScheme();

  const backgroundColor = Colors[colorScheme ?? "light"].cardBackground;
  const textColor = Colors[colorScheme ?? "light"].cardText;
  const principalColor = Colors[colorScheme ?? "light"].principal;

  return (
    <View style={[styles.card, { backgroundColor }]}>
      <UnthemedView style={styles.topContainer}>
        <UnthemedView style={styles.infoContainer}>
          <Text style={[styles.title, { color: textColor }]}>{name}</Text>
        </UnthemedView>
        <FavoriteButton
          isFavorite={isFavorite(simplePokemon)}
          onPress={() => change(simplePokemon)}
        />
      </UnthemedView>
      <UnthemedView style={styles.middleContainer}>
        <Avatar
          uri={sprites?.front_default || sprites?.back_default}
          style={styles.sprite}
        />
        <UnthemedView style={styles.infosContainer}>
          {height && (
            <Text style={[styles.details, { color: textColor }]}>
              Height: {height} m
            </Text>
          )}
          {weight && (
            <Text style={[styles.details, { color: textColor }]}>
              Weight: {weight} kg
            </Text>
          )}
          {types?.length && (
            <Text style={[styles.details, { color: textColor }]}>
              Types: {types.map((type) => type).join(", ")}
            </Text>
          )}
        </UnthemedView>
      </UnthemedView>
      <PokemonAbilities abilities={abilities} principalColor={principalColor} />
      <PokemonStats
        stats={stats}
        textColor={textColor}
        principalColor={principalColor}
      />
    </View>
  );
};

export const PokemonDetailedCardLoading = () => {
  const colorScheme = useColorScheme();

  const backgroundColor = Colors[colorScheme ?? "light"].cardBackground;
  const textColor = Colors[colorScheme ?? "light"].cardText;

  return (
    <View style={[styles.card, { backgroundColor }]}>
      <UnthemedView style={styles.topContainer}>
        <UnthemedView style={styles.infoContainer}>
          <Text style={[styles.title, { color: textColor }]}>Loading...</Text>
        </UnthemedView>
        <FavoriteButton isFavorite={Math.random() < 0.5} onPress={() => {}} />
      </UnthemedView>
      <UnthemedView style={styles.middleContainer}>
        <Avatar style={styles.sprite} />
      </UnthemedView>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    borderRadius: 8,
    padding: 16,
    elevation: 2,
    gap: 24,
  },
  topContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 12,
    width: "100%",
  },
  middleContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 12,
    width: "100%",
  },
  infosContainer: {
    display: "flex",
    flexDirection: "column",
    gap: 4,
    flex: 1,
  },
  sprite: {
    width: 128,
    height: 128,
  },
  infoContainer: {
    display: "flex",
    flexDirection: "column",
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
