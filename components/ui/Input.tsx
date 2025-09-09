import {
  StyleSheet,
  TextInput,
  useColorScheme,
  View,
  type TextInputProps,
} from "react-native";
import { FieldError } from "react-hook-form";

import { Text } from "../Themed";
import { useThemeColorsContext } from "@/contexts/ThemeColors";

export interface InputProps extends TextInputProps {
  label?: string;
  error?: FieldError;
  customErrorMessage?: string;
}

export function Input({
  label,
  error,
  customErrorMessage,
  ...inputProps
}: InputProps) {
  const { danger, cardText } = useThemeColorsContext();

  return (
    <View style={styles.inputContainer}>
      {!!label && <Text style={{ color: cardText }}>{label}</Text>}
      <TextInput
        {...inputProps}
        onChangeText={(t) => inputProps.onChangeText?.(t)}
        style={[styles.input, { color: cardText }]}
      />
      {!!error && (
        <Text style={{ color: danger }}>
          {customErrorMessage || error.message}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  label: { fontWeight: "bold" },
  inputContainer: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    gap: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 8,
    padding: 10,
  },
});
