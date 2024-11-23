import type { PropsWithChildren } from "react";
import { StyleSheet } from "react-native";
import Animated from "react-native-reanimated";

import { ThemedView } from "@/components/ThemedView";

type Props = PropsWithChildren<{
  isScrollView?: boolean;
}>;

export default function ParallaxScrollView({
  children,
  isScrollView = true,
}: Props) {
  return isScrollView ? (
    <Animated.ScrollView style={styles.wrapContainer} scrollEventThrottle={16}>
      <ThemedView style={styles.content}>{children}</ThemedView>
    </Animated.ScrollView>
  ) : (
    <ThemedView style={styles.content}>{children}</ThemedView>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    overflow: "hidden",
    padding: 15,
  },
  wrapContainer: { backgroundColor: "white" },
});
