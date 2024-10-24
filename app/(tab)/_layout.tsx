import BottomTabBar from "@/components/BottomTabBar"
import { useAuth } from "@/components/navigation/Authentication";
import { useNotifications } from "@/components/navigation/notificationContext";
import { usePusher } from "@/hooks/usePusher";
import { Stack } from "expo-router"
import React from "react"
import { SafeAreaView, StatusBar, StyleSheet } from "react-native"

export default function PostLayout() {
  const { user } = useAuth();
  const { showNotification } = useNotifications();

  // // Modified handleNewMessage to handle ID replacement
  // const handleNewMessage = async (data: any) => {
  //   const serverMessage = data.message.message as IMessage;

  //   if (serverMessage.receiver_id == user?.id) {
  //     try {
  //       await showNotification(
  //         data.sender?.name || "New Message",
  //         serverMessage.message,
  //         {
  //           userId: serverMessage.sender_id,
  //           name: data.sender?.name || "User",
  //           avatar: data.sender?.avatar
  //         }
  //       );
  //     } catch (error) {
  //       console.error('Failed to show notification:', error);
  //     }
  //   }
  // };

  // const { isConnected, error: pusherError } = usePusher({
  //   channelName: 'broad_cast_message',
  //   eventName: 'broadcast.message',
  //   onEvent: handleNewMessage
  // });

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