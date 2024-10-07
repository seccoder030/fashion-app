import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="screens/HomeScreen" options={{ headerShown: false }} />
      <Stack.Screen name="screens/SearchScreen" options={{ headerShown: false }} />
      <Stack.Screen name="screens/SearchDetailScreen" options={{ headerShown: false }} />
      <Stack.Screen name="screens/MessageListScreen" options={{ headerShown: false }} />
      <Stack.Screen name="screens/MessageScreen" options={{ headerShown: false }} />
      <Stack.Screen name="screens/PersonalScreen" options={{ headerShown: false }} />
      <Stack.Screen name="screens/ProfileScreen" options={{ headerShown: false }} />
    </Stack>
  );
}
