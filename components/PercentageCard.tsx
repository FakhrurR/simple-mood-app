import React from "react";
import { ThemedView } from "./ThemedView";
import { Image, ImageSourcePropType, StyleSheet } from "react-native";
import Size from "@/constants/Size";
import { ThemedText } from "./ThemedText";

interface PercentageCardProps {
  label: string;
  percentage: number;
  source: ImageSourcePropType | undefined;
  color: string;
}

const PercentageCard = ({
  label,
  percentage,
  source,
  color,
}: PercentageCardProps) => {
  return (
    <ThemedView style={styles.wrapPercentage}>
      <Image source={source} style={styles.image} resizeMode="contain" />
      <ThemedView style={styles.wrapLabel}>
        <ThemedText type="defaultSemiBold" style={[styles.label, { color }]}>
          {label}
        </ThemedText>
        <ThemedText type="default" style={styles.percentage}>
          {percentage}%
        </ThemedText>
      </ThemedView>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  wrapPercentage: {
    elevation: 3,
    flexDirection: "row",
    gap: 8,
    paddingVertical: 16,
    paddingHorizontal: 12,
    flex: 1,
    borderRadius: 4,
  },
  wrapLabel: {
    alignSelf: "center",
    flexDirection: "row",
    gap: 10,
    flex: 1,
  },
  label: { fontSize: Size.xSmall },
  percentage: { flex: 1, textAlign: "right" },
  image: { width: 20, height: 20 },
});

export default PercentageCard;
