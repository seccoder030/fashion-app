import { useState, useEffect } from 'react';
import { Channel } from 'pusher-js';
import { pusherClient } from '@/constants/pusher';

interface UsePusherOptions {
    channelName: string;
    eventName: string;
    onEvent: (data: any) => void;
}

export const usePusher = ({ channelName, eventName, onEvent }: UsePusherOptions) => {
    const [channel, setChannel] = useState<Channel | null>(null);
    const [isConnected, setIsConnected] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        console.log('Initializing Pusher connection...', { channelName, eventName });
        let mounted = true;

        const setupPusher = () => {
            try {
                // Subscribe to channel
                const newChannel = pusherClient.subscribe(channelName);
                console.log('Subscribed to channel:', channelName);

                // Bind to specific event
                newChannel.bind(eventName, (data: any) => {
                    console.log('Received event:', eventName, data);
                    if (mounted) {
                        onEvent(data);
                    }
                });

                // Connection status handlers
                pusherClient.connection.bind('connecting', () => {
                    console.log('Connecting to Pusher...');
                });

                pusherClient.connection.bind('connected', () => {
                    if (mounted) {
                        console.log('Connected to Pusher');
                        setIsConnected(true);
                    }
                });

                pusherClient.connection.bind('disconnected', () => {
                    if (mounted) {
                        console.log('Disconnected from Pusher');
                        setIsConnected(false);
                    }
                });

                pusherClient.connection.bind('error', (err: any) => {
                    if (mounted) {
                        console.error('Pusher connection error:', err);
                        setError(err.message);
                    }
                });

                // Subscribe succeeded
                newChannel.bind('pusher:subscription_succeeded', () => {
                    console.log('Successfully subscribed to channel:', channelName);
                });

                // Subscribe error
                newChannel.bind('pusher:subscription_error', (error: any) => {
                    console.error('Error subscribing to channel:', error);
                });

                if (mounted) {
                    setChannel(newChannel);
                }

            } catch (err) {
                console.error('Setup error:', err);
                if (mounted) {
                    setError(err instanceof Error ? err.message : 'Failed to connect to Pusher');
                    setIsConnected(false);
                }
            }
        };

        setupPusher();

        // Cleanup
        return () => {
            console.log('Cleaning up Pusher connection...');
            mounted = false;
            if (channel) {
                channel.unbind_all();
                pusherClient.unsubscribe(channelName);
            }
        };
    }, [channelName, eventName]);

    return { isConnected, error };
};