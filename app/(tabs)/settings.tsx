import ButtonMode from "@/components/ButtonMode";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Colors } from "@/constants/Colors";
import { usePreferencesStore } from "@/stores/usePreferencesStore";
import React, { useEffect, useState } from "react";
import { StyleSheet, useColorScheme } from "react-native";

const settings = () => {
  const { savePreferences, loadPreferences, chart } = usePreferencesStore(
    (state) => state
  );
  const [chartMode, setChartMode] = useState(0);
  const colorScheme = useColorScheme() ?? "light";
  const pieChartColor =
    chartMode === 1
      ? Colors[colorScheme].tabIconSelected
      : Colors[colorScheme].tabIconDefault;
  const barChartColor =
    chartMode === 2
      ? Colors[colorScheme].tabIconSelected
      : Colors[colorScheme].tabIconDefault;

  useEffect(() => {
    loadPreferences();
  }, []);

  useEffect(() => {
    if (chart) {
      setChartMode(chart);
    }
  }, [chart]);

  const onHandleChart = (id: number) => {
    savePreferences(id);
    setChartMode(id);
  };

  return (
    <ParallaxScrollView>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="defaultSemiBold">Type Chart</ThemedText>
      </ThemedView>
      <ThemedView style={styles.wrapModeChart}>
        <ButtonMode
          label="Pie Chart"
          onPress={() => onHandleChart(1)}
          iconName="pie-chart"
          color={pieChartColor}
        />
        <ButtonMode
          label="Bar Chart"
          onPress={() => onHandleChart(2)}
          iconName="bar-chart"
          color={barChartColor}
        />
      </ThemedView>
    </ParallaxScrollView>
  );
};

export default settings;

const styles = StyleSheet.create({
  headerImage: {
    color: "#808080",
    bottom: -90,
    left: -35,
    position: "absolute",
  },
  titleContainer: {
    gap: 8,
  },
  wrapModeChart: { gap: 10, marginTop: 10 },
});
