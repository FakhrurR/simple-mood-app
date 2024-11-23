import { StyleSheet, useColorScheme } from "react-native";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedView } from "@/components/ThemedView";
import ChartEmotion from "@/components/ChartEmotion";
import images from "@/assets/images";
import { Colors } from "@/constants/Colors";
import PercentageCard from "@/components/PercentageCard";
import useEmotionStore from "@/stores/useEmotionStore";
import { useCallback } from "react";
import { usePreferencesStore } from "@/stores/usePreferencesStore";
import { useFocusEffect } from "@react-navigation/native";

export default function StatisticsScreen() {
  const colorScheme = useColorScheme() ?? "light";
  const { loadHistory, history } = useEmotionStore((state) => state);
  const { chart, loadPreferences } = usePreferencesStore((state) => state);

  useFocusEffect(
    useCallback(() => {
      loadHistory();
      loadPreferences();
    }, [])
  );

  const statisticCount = () => {
    // Initialize counts for each category
    const counts = {
      happyValue: 0,
      neutralValue: 0,
      sadValue: 0,
      stressValue: 0,
    };

    // Count occurrences of each category
    history.forEach((item: { id: number }) => {
      switch (item.id) {
        case 1:
          counts.happyValue++;
          break;
        case 2:
          counts.neutralValue++;
          break;
        case 3:
          counts.sadValue++;
          break;
        case 4:
          counts.stressValue++;
          break;
      }
    });

    // Calculate total occurrences
    const total =
      counts.happyValue +
      counts.neutralValue +
      counts.sadValue +
      counts.stressValue;

    // Calculate percentages, ensuring no division by zero
    const toPercentage = (value: number) =>
      total > 0 ? Math.round((value / total) * 1000) / 10 : 0;

    return {
      happyPercentage: toPercentage(counts.happyValue),
      neutralPercentage: toPercentage(counts.neutralValue),
      sadPercentage: toPercentage(counts.sadValue),
      stressPercentage: toPercentage(counts.stressValue),
    };
  };

  const stats = statisticCount();

  return (
    <ParallaxScrollView>
      <ThemedView style={styles.wrapChart}>
        <ChartEmotion
          switchToBar={chart === 2}
          sadValue={stats.sadPercentage}
          happyValue={stats.happyPercentage}
          stressValue={stats.stressPercentage}
          neutralValue={stats.neutralPercentage}
        />
      </ThemedView>

      <ThemedView style={styles.wrapPercentage}>
        <PercentageCard
          label={"Happy"}
          percentage={stats.happyPercentage}
          source={images.HappyIcon}
          color={Colors[colorScheme].happyLabel}
        />
        <PercentageCard
          label={"Sad"}
          percentage={stats.sadPercentage}
          source={images.Sad}
          color={Colors[colorScheme].sadLabel}
        />
      </ThemedView>

      <ThemedView style={styles.wrapPercentage}>
        <PercentageCard
          label={"Neutral"}
          percentage={stats.neutralPercentage}
          source={images.Neutral}
          color={Colors[colorScheme].neutralLabel}
        />
        <PercentageCard
          label={"Stress"}
          percentage={stats.stressPercentage}
          source={images.Stress}
          color={Colors[colorScheme].stressLabel}
        />
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    gap: 8,
  },
  wrapPercentage: {
    flexDirection: "row",
    marginTop: 20,
    justifyContent: "space-between",
    gap: 10,
  },
  wrapChart: {
    borderRadius: 4,
    alignItems: "center",
    elevation: 3,
  },
});
