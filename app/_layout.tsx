import { AuthProvider, useAuth } from "@/components/navigation/Authentication";
import BackHandlerProvider from '@/components/navigation/BackHandlerProvider';
import { PusherProvider } from "@/components/navigation/PusherContext";
import { useFonts } from 'expo-font';
import { Slot } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { MenuProvider } from 'react-native-popup-menu';
import 'react-native-reanimated';

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
