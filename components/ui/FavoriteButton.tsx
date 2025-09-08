import { FontAwesome } from "@expo/vector-icons";
import {
  GestureResponderEvent,
  StyleSheet,
  useColorScheme,
  Pressable,
} from "react-native";

import Colors from "@/constants/Colors";
import { useCallback } from "react";

export interface FavoriteButtonProps {
  isFavorite: boolean;
  onPress: () => void;
}

export const FavoriteButton = ({
  isFavorite,
  onPress,
}: FavoriteButtonProps) => {
  const colorScheme = useColorScheme();

  const handlePress = useCallback(
    (e: GestureResponderEvent) => {
      e.stopPropagation();
      onPress();
    },
    [onPress]
  );

  const getColor = useCallback(() => {
    if (isFavorite) {
      return Colors[colorScheme ?? "light"].gold;
    }
    return Colors[colorScheme ?? "light"].text;
  }, [colorScheme, isFavorite]);

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
