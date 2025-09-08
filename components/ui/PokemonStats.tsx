import { Pokemon } from "@/types/pokemon";
import { StyleSheet, View } from "react-native";
import { Text } from "../Themed";

export interface PokemonStatsProps {
  textColor?: string;
  principalColor?: string;
  stats?: Pokemon["stats"];
}

export const PokemonStats = ({
  stats,
  textColor,
  principalColor,
}: PokemonStatsProps) => {
  return (
    <View style={styles.statsContainer}>
      {stats?.length ? (
        stats.map((stat) => (
          <View key={stat?.name} style={styles.statRow}>
            <Text style={[styles.statName, { color: textColor }]}>
              {stat?.name}
            </Text>
            <View style={styles.statContainer}>
              <View style={styles.statBarBase}>
                <View
                  style={[
                    styles.statBarValue,
                    {
                      width: `${Math.min((stat?.value / 255) * 100, 100)}%`,
                      backgroundColor: principalColor,
                    },
                  ]}
                />
              </View>
            </View>
            <Text style={{ color: textColor }}>{stat?.value}</Text>
          </View>
        ))
      ) : (
        <Text style={{ color: textColor }}>Stats: Unknown</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  statsContainer: {
    display: "flex",
    flexDirection: "column",
    gap: 4,
  },
  statRow: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  statName: {
    width: "40%",
    textTransform: "capitalize",
  },
  statContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 8,
  },
  statBarBase: {
    flex: 1,
    position: "relative",
    backgroundColor: "#ddd",
    height: 8,
    borderRadius: 4,
  },
  statBarValue: {
    height: 8,
    borderRadius: 4,
    position: "absolute",
    top: 0,
    left: 0,
  },
});
