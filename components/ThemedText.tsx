import { Text, type TextProps, StyleSheet } from "react-native";

import { useThemeColor } from "@/hooks/useThemeColor";
import Size from "@/constants/Size";

export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  type?: "default" | "title" | "defaultSemiBold" | "subtitle" | "link";
};

export function ThemedText({
  style,
  lightColor,
  darkColor,
  type = "default",
  ...rest
}: ThemedTextProps) {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, "text");

  return (
    <Text
      style={[
        { color },
        type === "default" ? styles.default : undefined,
        type === "title" ? styles.title : undefined,
        type === "defaultSemiBold" ? styles.defaultSemiBold : undefined,
        style,
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  default: {
    fontSize: Size.xSmall,
    letterSpacing: 0,
    fontFamily: "Poppins-Regular",
  },
  defaultSemiBold: {
    fontSize: Size.medium,
    letterSpacing: 0,
    fontFamily: "Poppins-SemiBold",
  },
  title: {
    fontSize: Size.large,
    letterSpacing: 0,
    fontFamily: "Poppins-SemiBold",
  },
});
