import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="screens/HomeScreen" options={{ headerShown: false }} />
      <Stack.Screen name="screens/SearchScreen" options={{ headerShown: false }} />
      <Stack.Screen name="screens/TestScreen" options={{ headerShown: false }} />
    </Stack>
  );
}
