import { Pressable, StyleSheet } from "react-native";

import { useThemeColorsContext } from "@/contexts/ThemeColors";

export interface FloatingButtonProps {
  children: React.ReactNode;
  onPress?: () => void;
}

export function FloatingButton({ children, onPress }: FloatingButtonProps) {
  const { principal } = useThemeColorsContext();

  return (
    <Pressable
      style={[styles.button, { backgroundColor: principal }]}
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
