import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";

interface PreferencesState {
  chart: number;
  loadPreferences: () => Promise<void>;
  savePreferences: (chart: number) => Promise<void>;
}

export const usePreferencesStore = create<PreferencesState>((set) => ({
  chart: 1,
  loadPreferences: async () => {
    const savedPreferences = await AsyncStorage.getItem("preferences");
    if (savedPreferences) {
      set({ chart: JSON.parse(savedPreferences) });
    }
  },
  savePreferences: async (chart: number) => {
    set((state: { chart: number }) => ({
      chart: state.chart,
    }));

    await AsyncStorage.setItem("preferences", JSON.stringify(chart));
  },
}));
