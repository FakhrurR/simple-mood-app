import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { ThemedView } from "./ThemedView";
import { Ionicons } from "@expo/vector-icons";
import { ThemedText } from "./ThemedText";

interface ButtonModeProps {
  color: string;
  onPress: () => void;
  iconName: "pie-chart" | "bar-chart";
  label: string;
}

const ButtonMode = ({ color, onPress, iconName, label }: ButtonModeProps) => {
  return (
    <TouchableOpacity
      style={[styles.button, { borderColor: color }]}
      onPress={onPress}
    >
      <ThemedView style={styles.wrapLabel}>
        <Ionicons name={iconName} size={24} color={color} />
        <ThemedText type="defaultSemiBold" style={{ color }}>
          {label}
        </ThemedText>
      </ThemedView>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 10,
    paddingVertical: 15,
    borderWidth: 1,
    borderRadius: 8,
  },
  wrapLabel: {
    flexDirection: "row",
    gap: 10,
    alignSelf: "center",
    backgroundColor: "white",
  },
});

export default ButtonMode;
