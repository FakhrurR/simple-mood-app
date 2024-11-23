/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = "#007AFF";
const tintColorDark = "#fff";

export const Colors = {
  light: {
    text: "#11181C",
    background: "#fff",
    tint: tintColorLight,
    icon: "#687076",
    tabIconDefault: "#687076",
    tabIconSelected: tintColorLight,
    happyLabel: "#FFCF30",
    bgHappy: "#FFFAE4",
    neutralLabel: "#7DE4EA",
    bgNeutral: "#E8FEFF",
    sadLabel: "#4370F2",
    bgSad: "#E9EFFF",
    stressLabel: "#FF2727",
    bgStress: "#FFE0E0",
  },
  dark: {
    stressLabel: "#FF2727",
    bgStress: "#FFE0E0",
    bgHappy: "#FFFAE4",
    happyLabel: "#FFCF30",
    neutralLabel: "#7DE4EA",
    bgNeutral: "#E8FEFF",
    sadLabel: "#4370F2",
    bgSad: "#E9EFFF",
    text: "#ECEDEE",
    background: "#151718",
    tint: tintColorDark,
    icon: "#9BA1A6",
    tabIconDefault: "#9BA1A6",
    tabIconSelected: tintColorDark,
  },
};
