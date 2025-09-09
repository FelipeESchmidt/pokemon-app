import { StyleSheet, View } from "react-native";

import { Input } from "./Input";
import { Button } from "./Button";

export interface InputSearchProps {
  placeholder?: string;
  value: string;
  onChangeText: (text: string) => void;
  onPressSearch: () => void;
}

export const InputSearch: React.FC<InputSearchProps> = ({
  placeholder,
  value,
  onChangeText,
  onPressSearch,
}) => {
  return (
    <View style={styles.container}>
      <Input
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
      />
      <Button text="Search" onPress={onPressSearch} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-end",
    marginBottom: 12,
    gap: 8,
  },
});
