import Detail from '@/components/Detail';
import DetailTopTabBar from '@/components/DetailTopTabBar';
import { BACKGROUND_GRADIENT_COLOR, SEARCHDETAILTOP_TAPBAR_HEIGHT } from '@/constants/Config';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { StyleSheet } from 'react-native';

export default function DetailScreen() {
    return (
        <LinearGradient
            colors={BACKGROUND_GRADIENT_COLOR}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.gradient}
        >
            <DetailTopTabBar />
            <Detail />
        </LinearGradient>
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