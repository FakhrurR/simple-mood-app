import React, { useEffect, useRef } from "react";
import { ThemedText } from "./ThemedText";
import {
  Image,
  Animated,
  ImageSourcePropType,
  StyleSheet,
  TouchableHighlight,
} from "react-native";
import Size from "@/constants/Size";

interface CardFeelingProps {
  label: string;
  bgColor: string;
  source: ImageSourcePropType | undefined;
  color: string;
  isActive?: boolean;
  onPress?: () => void;
}

const CardFeeling = ({
  label = "",
  bgColor = "",
  color = "",
  source,
  isActive = false,
  onPress = () => {},
  ...rest
}: CardFeelingProps) => {
  const scaleValue = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.spring(scaleValue, {
      toValue: isActive ? 1.02 : 1,
      friction: 5,
      useNativeDriver: true,
    }).start();
  }, [isActive]);

  return (
    <TouchableHighlight
      style={styles.button}
      underlayColor={"gray"}
      onPress={onPress}
      {...rest}
    >
      <Animated.View
        style={[
          styles.container,
          { backgroundColor: bgColor, transform: [{ scale: scaleValue }] },
          isActive ? [styles.activeButton, { borderColor: color }] : null,
        ]}
      >
        <Image source={source} height={20} width={20} resizeMode="contain" />
        <ThemedText
          type="defaultSemiBold"
          style={[
            styles.labelHappy,
            {
              color,
            },
          ]}
        >
          {label}
        </ThemedText>
      </Animated.View>
    </TouchableHighlight>
  );
};

export default CardFeeling;

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    padding: 20,
    flexDirection: "row",
    gap: 20,
  },
  labelHappy: {
    alignSelf: "center",
    fontSize: Size.mediumXtra,
  },
  button: { borderRadius: 8 },
  activeButton: { borderWidth: 1 },
});
