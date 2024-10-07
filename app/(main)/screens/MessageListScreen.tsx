import BottomTabBar from '@/components/BottomTabBar';
import MessageList from '@/components/MessageList';
import MessageListTopTabBar from '@/components/MessageListTopTabBar';
import { BACKGROUND_GRADIENT_COLOR, MESSAGELISTTOP_TAPBAR_HEIGHT } from '@/constants/Config';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { SafeAreaView, StatusBar, StyleSheet } from 'react-native';

export default function MessageListScreen() {
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="light-content" />
            <LinearGradient
                colors={BACKGROUND_GRADIENT_COLOR}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.gradient}
            >
                <MessageListTopTabBar />
                <MessageList />
            </LinearGradient>
            <BottomTabBar thisId={1} />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    gradient: {
        flex: 1,
        paddingTop: MESSAGELISTTOP_TAPBAR_HEIGHT,
    },
});