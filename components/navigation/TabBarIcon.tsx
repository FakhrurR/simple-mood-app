import {
  Image,
  ImageSourcePropType,
  ImageStyle,
  StyleProp,
} from "react-native";

export function TabBarIcon({
  style,
  source,
  size,
  ...rest
}: {
  source: ImageSourcePropType | undefined;
  style?: StyleProp<ImageStyle>;
  size: number;
}) {
  return (
    <Image
      source={source}
      style={[
        { marginBottom: -3, width: size, height: size, resizeMode: "contain" },
        style,
      ]}
      {...rest}
    />
  );
}
