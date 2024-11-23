import images from "@/assets/images";
import { Colors } from "./Colors";

export default [
  {
    id: 1,
    title: "Happy",
    color: Colors.light.happyLabel,
    bgColor: Colors.light.bgHappy,
    source: images.HappyIcon,
  },
  {
    id: 2,
    title: "Neutral",
    color: Colors.light.neutralLabel,
    bgColor: Colors.light.bgNeutral,
    source: images.Neutral,
  },
  {
    id: 3,
    title: "Sad",
    color: Colors.light.sadLabel,
    bgColor: Colors.light.bgSad,
    source: images.Sad,
  },
  {
    id: 4,
    title: "Stress",
    color: Colors.light.stressLabel,
    bgColor: Colors.light.bgStress,
    source: images.Stress,
  },
];
