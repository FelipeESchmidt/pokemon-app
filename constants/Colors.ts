const tintColorLight = "#2f95dc";
const tintColorDark = "#fff";

export const Colors = {
  light: {
    text: "#000",
    background: "#fff",
    tint: tintColorLight,
    tabIconDefault: "#ccc",
    tabIconSelected: tintColorLight,
    cardBackground: "#f0f0f0",
    cardText: "#333",
    principal: "#0077ff",
    gold: "#ffcc00",
    danger: "#b91c1c",
  },
  dark: {
    text: "#fff",
    background: "#000",
    tint: tintColorDark,
    tabIconDefault: "#ccc",
    tabIconSelected: tintColorDark,
    cardBackground: "#1a1a1a",
    cardText: "#fff",
    principal: "#0077ff",
    gold: "#ffcc00",
    danger: "#b91c1c",
  },
};

export type Theme = typeof Colors.light | typeof Colors.dark;
