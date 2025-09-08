import { FontAwesome } from "@expo/vector-icons";
import { StyleSheet, useColorScheme, View } from "react-native";

import Colors from "@/constants/Colors";

export interface FavoriteButtonProps {
  isFavorite: boolean;
  onPress: () => void;
}

export const FavoriteButton = ({
  isFavorite,
  onPress,
}: FavoriteButtonProps) => {
  const colorScheme = useColorScheme();

  return (
    <View style={styles.container} onTouchEnd={onPress}>
      <FontAwesome
        name={isFavorite ? "star" : "star-o"}
        size={25}
        color={Colors[colorScheme ?? "light"].text}
        style={styles.star}
      />
    </View>
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
