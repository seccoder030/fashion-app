import BottomTabBar from '@/components/BottomTabBar';
import IconButton from '@/components/IconButton';
import PersonalList from '@/components/PersonalList';
import { BACKGROUND_GRADIENT_COLOR, ICON_EDIT, ICON_HEARTLINE, ICON_LISTLINE, IMAGE_PROFILEBG, IMAGE_PROFILEUSER, SCREEN_HEIGHT, SCREEN_WIDTH } from '@/constants/Config';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import { Image, SafeAreaView, StatusBar, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';

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
                    <Image source={IMAGE_PROFILEUSER} style={styles.profileUser} />
                </View>
                <View style={styles.info}>
                    <View style={styles.infoItem}>
                        <Text style={styles.infoText}>514</Text>
                        <Text style={styles.infoText}>获 赞</Text>
                    </View>
                    <View style={styles.infoItem}>
                        <Text style={styles.infoText}>252</Text>
                        <Text style={styles.infoText}>朋 友</Text>
                    </View>
                    <View style={styles.infoCenter}></View>
                    <View style={styles.infoItem}>
                        <Text style={styles.infoText}>736</Text>
                        <Text style={styles.infoText}>关 注</Text>
                    </View>
                    <View style={styles.infoItem}>
                        <Text style={styles.infoText}>943</Text>
                        <Text style={styles.infoText}>粉 丝</Text>
                    </View>
                </View>
                <View style={styles.editButtonContainer}>
                    <IconButton onPress={() => router.replace('/EditProfileScreen')} size={15} iconSource={ICON_EDIT} style={styles.editButton} />
                </View>
                <View style={styles.infoDetail}>
                    <Text style={styles.infoText}>昵  称</Text>
                </View>
                <View style={styles.infoDetail}>
                    <Text style={styles.infoDetailText}>在这里写一个关于你自己的简短介绍。</Text>
                </View>
                <View style={styles.tabContainer}>
                    <IconButton onPress={() => handleTab(true)} size={20} iconSource={ICON_LISTLINE} style={[styles.tabButton, activeTab && styles.activeTab]} />
                    <IconButton onPress={() => handleTab(false)} size={20} iconSource={ICON_HEARTLINE} style={[styles.tabButton, !activeTab && styles.activeTab]} />
                </View>
                <PersonalList />
                <BottomTabBar thisId={3} />
            </LinearGradient>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
    profileUser: {
        alignItems: 'center',
        width: SCREEN_WIDTH * 0.25,
        height: SCREEN_WIDTH * 0.25,
        borderRadius: SCREEN_WIDTH * 0.25,
        borderWidth: 2,
        borderColor: 'rgba(255, 255, 255, 1)',
        marginTop: -(SCREEN_WIDTH * 0.125)
    },
    info: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: SCREEN_WIDTH * 0.125,
        marginHorizontal: 20,
        marginBottom: 5
    },
    infoItem: {
        alignItems: 'center',
        marginHorizontal: 10
    },
    infoText: {
        color: 'rgba(255, 255, 255, 1)',
        fontSize: 12,
        paddingVertical: 2
    },
    infoCenter: {
        width: SCREEN_WIDTH * 0.25
    },
    infoDetail: {
        alignItems: 'center',
        paddingVertical: 5
    },
    infoDetailText: {
        color: 'rgba(255, 255, 255, 1)',
        fontSize: 13,
    },
    editButtonContainer: {
        alignItems: 'center',
        marginTop: -16
    },
    editButton: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 20,
        height: 20,
        backgroundColor: 'white',
        borderRadius: 20
    },
    tabContainer: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderColor: 'rgba(79, 158, 191, 1)',
    },
    tabButton: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 5,
        width: SCREEN_WIDTH / 2,
        height: SCREEN_WIDTH / 10,
    },
    activeTab: {
        borderBottomWidth: 2,
        borderColor: 'rgba(79, 158, 191, 1)',
    }
});