import React, { useRef, useEffect, useState } from "react";
import * as echarts from "echarts/core";
import { LineChart, PieChart, BarChart } from "echarts/charts";
import {
  GridComponent,
  LegendComponent,
  TooltipComponent,
  TitleComponent,
  GraphicComponent,
} from "echarts/components";
import SvgChart, { SVGRenderer } from "@wuba/react-native-echarts/svgChart";
import { ThemedView } from "./ThemedView";
import { Dimensions, Image, StyleSheet, useColorScheme } from "react-native";
import { Colors } from "@/constants/Colors";
import images from "@/assets/images";

echarts.use([
  SVGRenderer,
  LineChart,
  GridComponent,
  PieChart,
  LegendComponent,
  TooltipComponent,
  TitleComponent,
  BarChart,
  GraphicComponent,
]);

export default function ChartEmotion({
  happyValue = 0,
  sadValue = 0,
  stressValue = 0,
  neutralValue = 0,
  switchToBar,
}: {
  happyValue: number;
  sadValue: number;
  stressValue: number;
  neutralValue: number;
  switchToBar?: boolean;
}) {
  const skiaRef = useRef<any>(null);
  const chartRef = useRef<any>(null);
  const [chartWidth, setChartWidth] = useState(320);
  const [chartHeight, setChartHeight] = useState(320);
  const colorScheme = useColorScheme() ?? "light";

  useEffect(() => {
    const handleDimensionsChange = ({
      screen,
    }: {
      screen: { width: number; height: number };
    }) => {
      const { width, height } = screen;
      setChartWidth(width);
      setChartHeight(height);
    };

    const dimensionsListener = Dimensions.addEventListener(
      "change",
      handleDimensionsChange
    );

    return () => {
      dimensionsListener.remove();
    };
  }, []);

  useEffect(() => {
    const option = {
      title: { show: false },
      tooltip: { trigger: "item" },
      legend: { show: false },
      series: [
        {
          name: "Feeling",
          type: "pie",
          data: [
            {
              value: happyValue,
              name: "Happy",
              itemStyle: { color: Colors[colorScheme].happyLabel },
            },
            {
              value: neutralValue,
              name: "Neutral",
              itemStyle: { color: Colors[colorScheme].neutralLabel },
            },
            {
              value: sadValue,
              name: "Sad",
              itemStyle: { color: Colors[colorScheme].sadLabel },
            },
            {
              value: stressValue,
              name: "Stress",
              itemStyle: { color: Colors[colorScheme].stressLabel },
            },
          ],
          label: { show: false },
          emphasis: { label: { show: false } },
        },
      ],
    };

    let chart: echarts.ECharts;
    if (skiaRef.current) {
      chart = echarts.init(skiaRef.current, "light", {
        renderer: "svg",
        width: chartWidth,
        height: chartHeight,
      });
      chart.setOption(option);
      chartRef.current = chart;
    }
    return () => chart?.dispose();
  }, [
    chartWidth,
    chartHeight,
    switchToBar,
    happyValue,
    sadValue,
    neutralValue,
    stressValue,
  ]);

  const data = [
    {
      label: "Happy",
      value: happyValue,
      color: Colors[colorScheme].happyLabel,
      source: images.HappyIcon,
    },
    {
      label: "Sad",
      value: sadValue,
      color: Colors[colorScheme].sadLabel,
      source: images.Sad,
    },
    {
      label: "Neutral",
      value: neutralValue,
      color: Colors[colorScheme].neutralLabel,
      source: images.Neutral,
    },
    {
      label: "Stress",
      value: stressValue,
      color: Colors[colorScheme].stressLabel,
      source: images.Stress,
    },
  ];

  const maxValue = Math.max(...data.map((item) => item.value));

  return switchToBar ? (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.chartContainer}>
        {data.map((item, index) => {
          const barHeight = (item.value / maxValue) * 100;
          return (
            <ThemedView key={index} style={styles.barContainer}>
              <Image source={item.source} style={styles.image} />
              <ThemedView
                style={[
                  styles.bar,
                  { height: `${barHeight}%`, backgroundColor: item.color },
                ]}
              />
            </ThemedView>
          );
        })}
      </ThemedView>
    </ThemedView>
  ) : (
    <ThemedView
      style={styles.wrapContainer}
      onLayout={(e) => {
        const { width, height } = e.nativeEvent.layout;
        setChartWidth(width);
        setChartHeight(height);
      }}
    >
      <SvgChart ref={skiaRef} />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  wrapContainer: {
    alignItems: "center",
    padding: 0,
    borderRadius: 4,
  },
  container: {
    flex: 1,
    paddingTop: 30,
    marginTop: 20,
    marginBottom: 10,
    alignItems: "center",
  },
  chartContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
    height: 200,
    marginHorizontal: 30,
    marginBottom: -10,
  },
  barContainer: {
    flex: 1,
    alignItems: "center",
    marginHorizontal: 5,
  },
  image: {
    width: 18,
    height: 18,
    resizeMode: "contain",
    marginBottom: 5,
  },
  bar: {
    width: 80,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  label: {
    marginTop: 5,
    fontSize: 12,
    textAlign: "center",
  },
});
