import ImageList from '@/components/ImageList';
import SearchTopTabBar from '@/components/SearchTopTabBar';
import { BACKGROUND_GRADIENT_COLOR, SEARCHTOP_TAPBAR_HEIGHT } from '@/constants/Config';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { StyleSheet } from 'react-native';

export default function SearchScreen() {
    return (
        <LinearGradient
            colors={BACKGROUND_GRADIENT_COLOR}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.gradient}
        >
            <SearchTopTabBar />
            <ImageList />
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    gradient: {
        flex: 1,
        paddingTop: SEARCHTOP_TAPBAR_HEIGHT,
    },
});