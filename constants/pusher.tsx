import Pusher from 'pusher-js/react-native';

export const pusherClient = new Pusher(process.env.EXPO_PUBLIC_PUSHER_APP_KEY!, {
    cluster: process.env.EXPO_PUBLIC_PUSHER_APP_CLUSTER!,
    forceTLS: true,
    authEndpoint: "/broadcasting/auth",
    enabledTransports: ['ws', 'wss']
});