import Colors from "@/constants/Colors";
import { Pressable, StyleSheet, useColorScheme } from "react-native";

export interface FloatingButtonProps {
  children: React.ReactNode;
  onPress?: () => void;
}

export function FloatingButton({ children, onPress }: FloatingButtonProps) {
  const colorScheme = useColorScheme();
  const principalColor = Colors[colorScheme ?? "light"].principal;

  return (
    <Pressable
      style={[styles.button, { backgroundColor: principalColor }]}
      onPress={onPress}
    >
      {children}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    position: "absolute",
    bottom: 30,
    right: 30,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
});
