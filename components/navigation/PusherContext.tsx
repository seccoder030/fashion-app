import React, { createContext, useContext, ReactNode } from 'react';
import { pusherClient } from '@/constants/pusher';

interface PusherContextType {
    pusher: typeof pusherClient;
}

const PusherContext = createContext<PusherContextType | undefined>(undefined);

export const PusherProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    return (
        <PusherContext.Provider value={{ pusher: pusherClient }}>
            {children}
        </PusherContext.Provider>
    );
};

export const usePusherContext = () => {
    const context = useContext(PusherContext);
    if (!context) {
        throw new Error('usePusherContext must be used within a PusherProvider');
    }
    return context;
};