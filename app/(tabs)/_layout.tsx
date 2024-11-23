import { Tabs } from "expo-router";
import React from "react";

import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import images from "@/assets/images";
import { StyleSheet } from "react-native";
import Size from "@/constants/Size";
import { ThemedText } from "@/components/ThemedText";

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const scheme = colorScheme ?? "light";
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[scheme].tint,
        headerTitleAlign: "center",
        headerTitleStyle: {
          fontSize: Size.large,
          fontFamily: "Poppins-SemiBold",
        },
        tabBarLabelStyle: styles.textTitleStyle,
        tabBarStyle: { height: 92 },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          headerShown: false,
          tabBarLabel: ({ focused }) => (
            <ThemedText
              style={[
                styles.textTitleStyle,
                {
                  color: focused ? Colors[scheme].tabIconSelected : "black",
                },
              ]}
            >
              Home
            </ThemedText>
          ),
          tabBarIcon: ({ focused, size }) => (
            <TabBarIcon
              source={focused ? images.HomeActive : images.Home}
              size={size}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="statistics"
        options={{
          title: "Statistics",
          tabBarLabel: ({ focused }) => (
            <ThemedText
              style={[
                styles.textTitleStyle,
                {
                  color: focused ? Colors[scheme].tabIconSelected : "black",
                },
              ]}
            >
              Statistics
            </ThemedText>
          ),
          tabBarIcon: ({ size, focused }) => (
            <TabBarIcon
              source={focused ? images.StatisticActive : images.Statistic}
              size={size}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarLabel: ({ focused }) => (
            <ThemedText
              style={[
                styles.textTitleStyle,
                {
                  color: focused ? Colors[scheme].tabIconSelected : "black",
                },
              ]}
            >
              Settings
            </ThemedText>
          ),
          tabBarIcon: ({ size, focused }) => (
            <TabBarIcon
              source={focused ? images.SettingActive : images.Settings}
              size={size}
            />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  textTitleStyle: {
    fontFamily: "Poppins-Regular",
    fontSize: Size.xSmall,
    lineHeight: 16,
    marginBottom: 20,
  },
});
