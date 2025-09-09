import React, { createContext, useContext } from "react";

import { useColorScheme } from "@/components/useColorScheme";
import { Colors, type Theme } from "@/constants/Colors";

interface ThemeColorsContextReceivedData {}

type ThemeColorsContextData = ThemeColorsContextReceivedData & Theme & {};

interface Props extends ThemeColorsContextReceivedData {
  children: React.ReactNode;
}

const ThemeColorsContext = createContext<ThemeColorsContextData>(
  {} as ThemeColorsContextData
);

const ThemeColorsProvider: React.FC<Props> = ({ children }) => {
  const colorScheme = useColorScheme();

  return (
    <ThemeColorsContext.Provider value={{ ...Colors[colorScheme ?? "light"] }}>
      {children}
    </ThemeColorsContext.Provider>
  );
};

const useThemeColorsContext = (): ThemeColorsContextData => {
  const context = useContext(ThemeColorsContext);

  if (!context) {
    throw new Error(
      "useThemeColorsContext must be used within an ThemeColorsContext"
    );
  }
  return context;
};

export { ThemeColorsProvider, useThemeColorsContext, ThemeColorsContextData };
