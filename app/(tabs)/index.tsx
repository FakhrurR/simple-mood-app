import { StyleSheet } from "react-native";

import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import CardFeeling from "@/components/CardFeeling";
import FeelingData from "@/constants/FeelingData";
import { useState } from "react";
import useEmotionStore from "@/stores/useEmotionStore";

export default function HomeScreen() {
  const [feeling, setFeeling] = useState(0);
  const { selectEmotions } = useEmotionStore((state) => state);

  const onSelectedEmotion = (item: { id: number; title: string }) => {
    setFeeling(item.id);
    selectEmotions({ id: item.id, title: item.title });
  };
  return (
    <ParallaxScrollView>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">How are you feeling right now?</ThemedText>
      </ThemedView>
      <ThemedView style={styles.wrapCard}>
        {FeelingData.map((item) => (
          <CardFeeling
            key={item.id}
            label={item.title}
            color={item.color}
            bgColor={item.bgColor}
            source={item.source}
            onPress={() => {
              onSelectedEmotion({ id: item.id, title: item.title });
            }}
            isActive={item.id === feeling}
          />
        ))}
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  wrapCard: { gap: 20, marginTop: 20 },
});
