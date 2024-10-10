import ActionBar from '@/components/ActionBar';
import BottomTabBar from '@/components/BottomTabBar';
import HomeTopTabBar from '@/components/HomeTopTabBar';
import { BACKGROUND_GRADIENT_COLOR, HOMETOP_TAPBAR_HEIGHT, IMAGE_BG } from '@/constants/Config';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Image, SafeAreaView, StatusBar, StyleSheet, View } from 'react-native';

export default function HomeScreen() {
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="light-content" />
            <LinearGradient
                colors={BACKGROUND_GRADIENT_COLOR}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.gradient}
            >
                <HomeTopTabBar />
                <ActionBar />
                <View style={styles.image}>
                    <Image
                        style={styles.image}
                        source={IMAGE_BG}
                    />
                </View>
                <BottomTabBar thisId={0} />
            </LinearGradient>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    image: {
        width: '100%',
        height: '100%',
    },
    gradient: {
        flex: 1,
        paddingTop: HOMETOP_TAPBAR_HEIGHT,
    },
});