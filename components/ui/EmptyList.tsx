import React from "react";
import { View, Text, StyleSheet } from "react-native";

import { useThemeColorsContext } from "@/contexts/ThemeColors";
import { Avatar } from "./Avatar";

type EmptyListProps = {
  title?: string;
  message?: string;
};

export const EmptyList: React.FC<EmptyListProps> = ({
  title = "Empty List",
  message = "No items available at the moment.",
}) => {
  const { cardBackground, cardText } = useThemeColorsContext();

  return (
    <View style={[styles.card, { backgroundColor: cardBackground }]}>
      <View style={styles.topContainer}>
        <Text style={[styles.title, { color: cardText }]}>{title}</Text>
      </View>
      <View style={styles.middleContainer}>
        <Avatar style={styles.sprite} />
      </View>
      <Text style={[styles.details, { color: cardText }]}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    padding: 20,
    elevation: 2,
    gap: 16,
  },
  topContainer: {
    width: "100%",
    alignItems: "center",
  },
  middleContainer: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  details: {
    fontSize: 14,
    textAlign: "center",
    opacity: 0.8,
  },
  sprite: {
    width: 96,
    height: 96,
    opacity: 0.4,
  },
});
