import Message from '@/components/Message';
import MessageTopTabBar from '@/components/MessageTopTabBar';
import { BACKGROUND_COLOR, MESSAGELISTTOP_TAPBAR_HEIGHT } from '@/constants/Config';
import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { StyleSheet, View } from 'react-native';

type MessageParams = {
    userId: string;
    name: string;
    avatar: string;
};

export default function MessageScreen() {
    const { userId, name, avatar } = useLocalSearchParams<MessageParams>();

    return (
        <View style={styles.container} >
            <MessageTopTabBar userId={userId} name={name} avatar={avatar} />
            <Message userId={userId} avatar={avatar} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: MESSAGELISTTOP_TAPBAR_HEIGHT,
        backgroundColor: BACKGROUND_COLOR
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});