import { AuthProvider, useAuth } from "@/components/navigation/Authentication";
import BackHandlerProvider from '@/components/navigation/BackHandlerProvider';
import { useFonts } from 'expo-font';
import * as Notifications from 'expo-notifications';
import { router, Slot } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { MenuProvider } from 'react-native-popup-menu';
import { PusherProvider } from "@/components/navigation/PusherContext";
import 'react-native-reanimated';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

async function registerForPushNotificationsAsync() {
  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;
  if (existingStatus !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }
  if (finalStatus !== 'granted') {
    alert('Failed to get push token for push notification!');
    return;
  }
  const token = (await Notifications.getExpoPushTokenAsync()).data;
  console.log(token);
  // Send this token to your server
}

export default function RootLayout() {
  const { isLoading } = useAuth();

  const [loaded] = useFonts({
    SpaceMono: require('@/assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded && !isLoading) {
      SplashScreen.hideAsync();
    }
  }, [loaded, isLoading]);

  if (!loaded && isLoading) {
    return null;
  }

  return (
    <AuthProvider>
      <BackHandlerProvider>
        <PusherProvider>
          <MenuProvider>
            <Slot />
          </MenuProvider>
        </PusherProvider>
      </BackHandlerProvider>
    </AuthProvider>
  );
}
