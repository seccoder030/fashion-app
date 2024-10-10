import BottomTabBar from '@/components/BottomTabBar';
import IconButton from '@/components/IconButton';
import TextButton from '@/components/TextButton';
import { BACKGROUND_GRADIENT_COLOR, ICON_CAMERA, ICON_CAMERAFILL, IMAGE_PROFILEBG, IMAGE_PROFILEUSER, SCREEN_HEIGHT, SCREEN_WIDTH } from '@/constants/Config';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Image, SafeAreaView, StatusBar, StyleSheet, Text, TextInput, View } from 'react-native';

export default function EditProfileScreen() {
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
                    <View style={styles.changeProfileBg}>
                        <IconButton size={52} iconSource={ICON_CAMERAFILL} />
                    </View>
                    <Image source={IMAGE_PROFILEUSER} style={styles.profileUser} />
                    <View style={styles.changeProfileUser}>
                        <IconButton size={27} iconSource={ICON_CAMERA} />
                    </View>
                </View>
                <View style={styles.info}>
                    <View style={styles.infoItem}>
                        <Text style={styles.infoTitle}>姓       名</Text>
                        <TextInput
                            style={styles.infoText}
                            placeholder="请输入您的姓名"
                            placeholderTextColor="rgba(255, 255, 255, 0.5)"
                        />
                    </View>
                </View>
                <View style={styles.info}>
                    <View style={styles.infoItem}>
                        <Text style={styles.infoTitle}>用户名称</Text>
                        <TextInput
                            style={styles.infoText}
                            placeholder="请输入您的用户名"
                            placeholderTextColor="rgba(255, 255, 255, 0.5)"
                        />
                    </View>
                </View>
                <View style={styles.info}>
                    <View style={styles.infoItem}>
                        <Text style={styles.infoTitle}>性       别</Text>
                        <TextInput
                            style={styles.infoText}
                            placeholder="请输入您的姓氏"
                            placeholderTextColor="rgba(255, 255, 255, 0.5)"
                        />
                    </View>
                </View>
                <View style={styles.info}>
                    <View style={styles.infoItem}>
                        <Text style={styles.infoTitle}>出生日期</Text>
                        <TextInput
                            style={styles.infoText}
                            placeholder="请输入出生日期"
                            placeholderTextColor="rgba(255, 255, 255, 0.5)"
                        />
                    </View>
                </View>
                <View style={styles.info}>
                    <View style={styles.infoItem}>
                        <Text style={styles.infoTitle}>学校名称</Text>
                        <TextInput
                            style={styles.infoText}
                            placeholder="请输入学校名称"
                            placeholderTextColor="rgba(255, 255, 255, 0.5)"
                        />
                    </View>
                </View>
                <View style={styles.info}>
                    <View style={styles.infoItem}>
                        <Text style={styles.infoTitle}>年       级</Text>
                        <TextInput
                            style={styles.infoText}
                            placeholder="请输入您的年级"
                            placeholderTextColor="rgba(255, 255, 255, 0.5)"
                        />
                    </View>
                </View>
                <View style={styles.profileButtonContainer}>
                    <View style={styles.profileButton}>
                        <TextButton text='取   消' backgroundColor={'rgba(255, 255, 255, 1)'} borderRadius={5} paddingHorizontal={15} paddingVertical={3} textColor={'rgba(1, 1, 1, 1)'} />
                    </View>
                    <View style={styles.profileButton}>
                        <TextButton text='保   存' backgroundColor={'rgba(255, 0, 153, 1)'} borderRadius={5} paddingHorizontal={15} paddingVertical={3} />
                    </View>
                </View>
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
        marginBottom: 20,
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
        backgroundColor: 'rgba(0, 0, 0, 0.3)'
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
        marginVertical: 10
    },
    infoItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 30
    },
    infoTitle: {
        color: 'rgba(255, 255, 255, 1)',
        fontSize: 13,
    },
    infoText: {
        width: '50%',
        color: 'rgba(255, 255, 255, 1)',
        fontSize: 10,
        borderBottomWidth: 1,
        borderColor: 'rgba(255, 255, 255, 1)',
        marginLeft: 50,
        paddingHorizontal: 10,
    },
    profileButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: SCREEN_HEIGHT * 0.25
    },
    profileButton: {
        marginHorizontal: 10
    }
});