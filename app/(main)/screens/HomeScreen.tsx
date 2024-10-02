import ActionBar from '@/components/ActionBar';
import BottomTabBar from '@/components/BottomTabBar';
import HomeTopTabBar from '@/components/HomeTopTabBar';
import { BACKGROUND_GRADIENT_COLOR, IMAGE_BG, STATUSBAR_HEIGHT } from '@/constants/Config';
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
                <View style={styles.content}>
                    <Image
                        source={IMAGE_BG}
                        style={styles.image}
                    />
                </View>
            </LinearGradient>
            <BottomTabBar thisId={0} />
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
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    gradient: {
        flex: 1,
        paddingTop: STATUSBAR_HEIGHT,
    },
});