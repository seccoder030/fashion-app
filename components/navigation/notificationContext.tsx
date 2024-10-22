import React, { createContext, useContext, useEffect, useState, useRef } from 'react';
import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';
import { router } from 'expo-router';
import * as Device from 'expo-device';
import Constants from 'expo-constants';

// Update the interface to specify void return type
interface NotificationContextType {
    expoPushToken: string | undefined;
    notification: Notifications.Notification | undefined;
    showNotification: (title: string, body: string, data?: any) => Promise<void>;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [expoPushToken, setExpoPushToken] = useState<string>();
    const [notification, setNotification] = useState<Notifications.Notification>();
    const notificationListener = useRef<any>();
    const responseListener = useRef<any>();

    // Updated showNotification to handle the return type properly
    const showNotification = async (title: string, body: string, data: any = {}): Promise<void> => {
        try {
            const notificationContent = {
                content: {
                    title,
                    body,
                    data,
                    sound: 'default',
                    priority: 'high',
                    badge: 1,
                },
                trigger: null
            };

            await Notifications.scheduleNotificationAsync(notificationContent);
            console.log('Notification scheduled successfully');
        } catch (error) {
            console.error('Error showing notification:', error);
            throw error;
        }
    };

    useEffect(() => {
        registerForPushNotificationsAsync().then(token => {
            setExpoPushToken(token);
        });

        notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
            console.log('Notification received:', notification);
            setNotification(notification);
        });

        responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
            const data = response.notification.request.content.data;
            if (data.userId && data.name) {
                console.log('hhh', data)
                router.push({
                    pathname: '/MessageScreen',
                    params: {
                        userId: data.userId,
                        name: data.name,
                        avatar: data.avatar
                    }
                });
            }
        });

        return () => {
            if (notificationListener.current) {
                Notifications.removeNotificationSubscription(notificationListener.current);
            }
            if (responseListener.current) {
                Notifications.removeNotificationSubscription(responseListener.current);
            }
        };
    }, []);

    return (
        <NotificationContext.Provider
            value={{
                expoPushToken,
                notification,
                showNotification
            }}
        >
            {children}
        </NotificationContext.Provider>
    );
};

async function registerForPushNotificationsAsync(): Promise<string | undefined> {
    let token;

    if (Platform.OS === 'android') {
        await Notifications.setNotificationChannelAsync('default', {
            name: 'Chat Messages',
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: '#FF231F7C',
            sound: 'default',
            enableLights: true,
            enableVibrate: true,
        });
    }

    if (Device.isDevice) {
        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;

        if (existingStatus !== 'granted') {
            const { status } = await Notifications.requestPermissionsAsync();
            finalStatus = status;
        }

        if (finalStatus !== 'granted') {
            console.error('Failed to get push token for push notification!');
            return undefined;
        }

        try {
            const projectId = Constants.expoConfig?.extra?.eas?.projectId;
            if (!projectId) {
                throw new Error('Project ID is not configured');
            }

            const tokenData = await Notifications.getExpoPushTokenAsync({
                projectId: projectId
            });
            token = tokenData.data;
            console.log('Push token:', token);
        } catch (error) {
            console.error('Error getting push token:', error);
        }
    }

    return token;
}

export const useNotifications = () => {
    const context = useContext(NotificationContext);
    if (!context) {
        throw new Error('useNotifications must be used within a NotificationProvider');
    }
    return context;
};