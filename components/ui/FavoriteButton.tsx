import { FontAwesome } from "@expo/vector-icons";
import { GestureResponderEvent, StyleSheet, Pressable } from "react-native";

import { useCallback } from "react";
import { useThemeColorsContext } from "@/contexts/ThemeColors";

export interface FavoriteButtonProps {
  isFavorite: boolean;
  onPress: () => void;
}

export const FavoriteButton = ({
  isFavorite,
  onPress,
}: FavoriteButtonProps) => {
  const { gold, text } = useThemeColorsContext();

  const handlePress = useCallback(
    (e: GestureResponderEvent) => {
      e.stopPropagation();
      onPress();
    },
    [onPress]
  );

  const getColor = useCallback(() => {
    if (isFavorite) {
      return gold;
    }
    return text;
  }, [isFavorite]);

  return (
    <Pressable style={styles.container} onPress={handlePress}>
      <FontAwesome
        name={isFavorite ? "star" : "star-o"}
        size={25}
        color={getColor()}
        style={styles.star}
      />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  star: {
    marginRight: 15,
  },
});
