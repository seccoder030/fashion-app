import { Stack } from 'expo-router';

export default function MainLayout() {
  return (
    <Stack>
      <Stack.Screen name="HomeScreen" options={{ headerShown: false }} />
      <Stack.Screen name="SearchScreen" options={{ headerShown: false }} />
      <Stack.Screen name="SearchDetailScreen" options={{ headerShown: false }} />
      <Stack.Screen name="MessageListScreen" options={{ headerShown: false }} />
      <Stack.Screen name="MessageScreen" options={{ headerShown: false }} />
      <Stack.Screen name="ProfileScreen" options={{ headerShown: false }} />
      <Stack.Screen name="EditProfileScreen" options={{ headerShown: false }} />
      <Stack.Screen name="PostScreen" options={{ headerShown: false }} />
    </Stack>
  );
}
