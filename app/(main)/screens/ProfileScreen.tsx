import BottomTabBar from '@/components/BottomTabBar';
import ImageButton from '@/components/ImageButton';
import PersonalList from '@/components/PersonalList';
import { BACKGROUND_GRADIENT_COLOR, ICON_EDIT, ICON_LISTLINE, ICON_HEARTLINE, IMAGE_PROFILEBG, IMAGE_PROFILEUSER, SCREEN_HEIGHT, SCREEN_WIDTH, ICON_CAMERAFILL, ICON_CAMERA } from '@/constants/Config';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import { Image, SafeAreaView, StatusBar, StyleSheet, Text, View } from 'react-native';

export default function ProfileScreen() {
    const [activeTab, setActiveTab] = useState(true);

    function handleTab(id: boolean) {
        setActiveTab(id)
    }

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="light-content" />
            <LinearGradient
                colors={BACKGROUND_GRADIENT_COLOR}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.gradient}
            >
                <View style={styles.topContainer}>
                    <Image source={IMAGE_PROFILEBG} style={styles.profileBg} />
                    <LinearGradient
                        colors={['rgba(0, 0, 0, 0.7)', 'rgba(255, 255, 255, 0.7)']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        style={styles.changeProfileBg}
                    ></LinearGradient>
                    <View style={styles.changeProfileBg}>
                        <ImageButton size={52} iconSource={ICON_CAMERAFILL} />
                    </View>
                    <Image source={IMAGE_PROFILEUSER} style={styles.profileUser} />
                    <View style={styles.changeProfileUser}>
                        <ImageButton size={27} iconSource={ICON_CAMERA} />
                    </View>
                    <View style={styles.info}>
                        <View style={styles.infoItem}></View>
                    </View>
                </View>
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
    },
    topContainer: {
        alignItems: 'center',
        marginBottom: -(SCREEN_WIDTH * 0.125),
    },
    profileBg: {
        width: '100%',
        height: SCREEN_HEIGHT * 0.3,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
    },
    changeProfileBg: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: SCREEN_HEIGHT * 0.3,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        // backgroundColor: 'rgba(0, 0, 0, 0.3)'
    },
    profileUser: {
        alignItems: 'center',
        width: SCREEN_WIDTH * 0.25,
        height: SCREEN_WIDTH * 0.25,
        borderRadius: SCREEN_WIDTH * 0.25,
        marginTop: -(SCREEN_WIDTH * 0.125)
    },
    changeProfileUser: {
        justifyContent: 'center',
        alignItems: 'center',
        width: SCREEN_WIDTH * 0.25,
        height: SCREEN_WIDTH * 0.25,
        borderRadius: SCREEN_WIDTH * 0.25,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        borderWidth: 2,
        borderColor: 'rgba(255, 255, 255, 1)',
        marginTop: -(SCREEN_WIDTH * 0.25)
    },
    info: {
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    infoItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 30
    }
});