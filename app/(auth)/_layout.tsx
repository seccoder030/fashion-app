import React from "react"
import { Redirect, Stack } from "expo-router"
import { useAuth } from "@/components/navigation/Authentication";
import Loading from "@/components/Loading";

export default function AuthLayout() {
    const { isLoading } = useAuth()

    if (isLoading) {
        return <Loading />
    }

    return (
        <Stack>
            <Stack.Screen name="sign-in" options={{ headerShown: false }} />
            <Stack.Screen name="sign-up" options={{ headerShown: false }} />
        </Stack>
    )
}