import { Pokemon } from "@/types/pokemon";
import { StyleSheet, View } from "react-native";
import { Text } from "../Themed";

export interface PokemonAbilitiesProps {
  textColor?: string;
  principalColor?: string;
  abilities?: Pokemon["abilities"];
}

export const PokemonAbilities = ({
  abilities,
  textColor,
  principalColor,
}: PokemonAbilitiesProps) => {
  return (
    <View style={styles.abilitiesContainer}>
      {abilities?.length ? (
        abilities.map((ability) => (
          <View
            key={ability}
            style={[styles.abilityBadge, { backgroundColor: principalColor }]}
          >
            <Text style={styles.abilityText}>{ability}</Text>
          </View>
        ))
      ) : (
        <Text style={{ color: textColor }}>Abilities: Unknown</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  abilitiesContainer: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  abilityBadge: {
    borderRadius: 12,
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  abilityText: {
    textTransform: "capitalize",
  },
});
