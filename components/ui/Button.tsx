import { Pressable, StyleSheet } from "react-native";

import { useThemeColorsContext } from "@/contexts/ThemeColors";
import { Text } from "../Themed";

export interface ButtonProps {
  onPress?: () => void;
  text: string;
}

export const Button: React.FC<ButtonProps> = ({ onPress, text }) => {
  const { principal, text: textColor } = useThemeColorsContext();

  return (
    <Pressable
      onPress={onPress}
      style={[styles.btn, { backgroundColor: principal }]}
    >
      <Text style={[styles.btnTxt, { color: textColor }]}>{text}</Text>
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
  btnTxt: { fontWeight: "700" },
});
