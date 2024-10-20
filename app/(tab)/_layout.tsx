import BottomTabBar from "@/components/BottomTabBar"
import { Stack } from "expo-router"
import React from "react"
import { SafeAreaView, StatusBar, StyleSheet } from "react-native"

export default function PostLayout() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <Stack>
        <Stack.Screen name="HomeScreen" options={{ headerShown: false }} />
        <Stack.Screen name="SearchScreen" options={{ headerShown: false }} />
        <Stack.Screen name="DetailScreen" options={{ headerShown: false }} />
        <Stack.Screen name="MessageListScreen" options={{ headerShown: false }} />
        <Stack.Screen name="MessageScreen" options={{ headerShown: false }} />
        <Stack.Screen name="ProfileScreen" options={{ headerShown: false }} />
        <Stack.Screen name="EditProfileScreen" options={{ headerShown: false }} />
      </Stack>
      <BottomTabBar />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});