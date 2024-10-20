import Message from '@/components/Message';
import MessageTopTabBar from '@/components/MessageTopTabBar';
import { BACKGROUND_COLOR, MESSAGELISTTOP_TAPBAR_HEIGHT } from '@/constants/Config';
import React from 'react';
import { StyleSheet, View } from 'react-native';

export default function MessageScreen() {
    return (
        <View style={styles.container} >
            <MessageTopTabBar />
            <Message />
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