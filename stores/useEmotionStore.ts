import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";
import FeelingData from "@/constants/FeelingData";

interface Emotion {
  id: number;
  title: string;
  timestamp?: string;
  color?: string;
  bgColor?: string;
  source?: string;
}

interface EmotionStore {
  emotions: Emotion[];
  selectedEmotions: Emotion | null;
  history: Emotion[];
  selectEmotions: (emotions: Emotion) => Promise<void>;
  clearSelection: () => void;
  loadHistory: () => Promise<void>;
  clearHistory: () => Promise<void>;
  addEmotions: (newEmotion: Emotion) => void;
  removeEmotions: (id: number) => void;
}

const useEmotionStore = create<EmotionStore>((set, get) => ({
  emotions: [
    ...FeelingData.map((item) => {
      return {
        ...item,
        value: 0,
      };
    }),
  ],

  selectedEmotions: null,

  history: [],

  selectEmotions: async (emotions: Emotion) => {
    const timestamp = new Date().toISOString();
    const selection = { ...emotions, timestamp };

    set((state: { history: any }) => ({
      selectedEmotions: emotions,
      history: [...state.history, selection],
    }));

    await AsyncStorage.setItem(
      "EmotionsHistory",
      JSON.stringify(get().history)
    );
  },

  clearSelection: () => set({ selectedEmotions: null }),

  loadHistory: async () => {
    const savedHistory = await AsyncStorage.getItem("EmotionsHistory");
    if (savedHistory) {
      set({ history: JSON.parse(savedHistory) });
    }
  },

  clearHistory: async () => {
    set({ history: [] });
    await AsyncStorage.removeItem("EmotionsHistory");
  },

  addEmotions: (newEmotions: Emotion) =>
    set((state: { emotions: any }) => ({
      emotions: [...state.emotions, newEmotions],
    })),

  removeEmotions: (id: number) =>
    set((state: { emotions: Emotion[] }) => ({
      emotions: state.emotions.filter(
        (emotions: { id: number }) => emotions.id !== id
      ),
    })),
}));

export default useEmotionStore;
