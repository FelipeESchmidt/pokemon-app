import React from "react";
import { View, Text, StyleSheet } from "react-native";

import { useThemeColorsContext } from "@/contexts/ThemeColors";
import { Avatar } from "./Avatar";

export const PokemonNotFoundCard = () => {
  const { cardBackground, cardText } = useThemeColorsContext();

  return (
    <View style={[styles.card, { backgroundColor: cardBackground }]}>
      <View style={styles.topContainer}>
        <View style={styles.infoContainer}>
          <Text style={[styles.title, { color: cardText }]}>
            Nenhum Pokémon encontrado
          </Text>
          <Text style={[styles.details, { color: cardText }]}>
            Tente outra busca ou verifique o nome digitado.
          </Text>
        </View>
      </View>
      <View style={styles.middleContainer}>
        <Avatar style={styles.sprite} />
      </View>
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
    alignItems: "flex-start",
    width: "100%",
  },
  middleContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  infoContainer: {
    display: "flex",
    flexDirection: "column",
    gap: 4,
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "left",
  },
  details: {
    fontSize: 14,
    opacity: 0.8,
  },
  sprite: {
    width: 96,
    height: 96,
    opacity: 0.5,
  },
});
