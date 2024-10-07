import BottomTabBar from '@/components/BottomTabBar';
import SearchDetail from '@/components/SearchDetail';
import SearchDetailTopTabBar from '@/components/SearchDetailTopTabBar';
import { BACKGROUND_GRADIENT_COLOR, SEARCHDETAILTOP_TAPBAR_HEIGHT } from '@/constants/Config';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { SafeAreaView, StatusBar, StyleSheet } from 'react-native';

export default function SearchDetailScreen() {
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="light-content" />
            <LinearGradient
                colors={BACKGROUND_GRADIENT_COLOR}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.gradient}
            >
                <SearchDetailTopTabBar />
                <SearchDetail />
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
        paddingTop: SEARCHDETAILTOP_TAPBAR_HEIGHT,
    },
});