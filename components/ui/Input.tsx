import {
  StyleSheet,
  TextInput,
  useColorScheme,
  View,
  type TextInputProps,
} from "react-native";
import { FieldError } from "react-hook-form";

import Colors from "@/constants/Colors";

import { Text } from "../Themed";

export interface InputProps extends TextInputProps {
  label: string;
  error?: FieldError;
  customErrorMessage?: string;
}

export function Input({
  label,
  error,
  customErrorMessage,
  ...inputProps
}: InputProps) {
  const colorScheme = useColorScheme();
  const dangerColor = Colors[colorScheme ?? "light"].danger;
  const textColor = Colors[colorScheme ?? "light"].text;

  return (
    <View style={styles.inputContainer}>
      <Text style={{ color: textColor }}>{label}</Text>
      <TextInput
        {...inputProps}
        onChangeText={(t) => inputProps.onChangeText?.(t)}
        style={[styles.input, { color: textColor }]}
      />
      {!!error && (
        <Text style={{ color: dangerColor }}>
          {customErrorMessage || error.message}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  label: { fontWeight: "bold" },
  inputContainer: {
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
