import MessageList from '@/components/MessageList';
import MessageListTopTabBar from '@/components/MessageListTopTabBar';
import { BACKGROUND_COLOR, MESSAGELISTTOP_TAPBAR_HEIGHT } from '@/constants/Config';
import React from 'react';
import { StyleSheet, View } from 'react-native';

export default function MessageListScreen() {
    return (
        <View style={styles.container}>
            <MessageListTopTabBar />
            <MessageList />
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