import { Stack } from "expo-router"
import React from "react"

export default function PostLayout() {
    return (
        <Stack>
            <Stack.Screen name="CameraScreen" options={{ headerShown: false }} />
            <Stack.Screen name="PostScreen" options={{ headerShown: false }} />
            <Stack.Screen name="CategoryScreen" options={{ headerShown: false }} />
        </Stack>
    )
}