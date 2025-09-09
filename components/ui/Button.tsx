import { Pressable, StyleSheet, useColorScheme } from "react-native";

import { Text } from "../Themed";
import Colors from "@/constants/Colors";

export interface ButtonProps {
  onPress?: () => void;
  text: string;
}

export const Button: React.FC<ButtonProps> = ({ onPress, text }) => {
  const colorScheme = useColorScheme();
  const principalColor = Colors[colorScheme ?? "light"].principal;

  return (
    <Pressable
      onPress={onPress}
      style={[styles.btn, { backgroundColor: principalColor }]}
    >
      <Text style={styles.btnTxt}>{text}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  btn: {
    marginTop: 8,
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  btnTxt: { color: "#fff", fontWeight: "700" },
});
