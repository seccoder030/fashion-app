import IconButton from '@/components/IconButton';
import TextButton from '@/components/TextButton';
import { BACKGROUND_GRADIENT_COLOR, ICON_EMAIL, ICON_EYE, ICON_TIKTOK, ICON_USER, ICON_USERLOCK, ICON_WECHAT, SCREEN_HEIGHT, SCREEN_WIDTH } from '@/constants/Config';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { SafeAreaView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function SignUp() {
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="light-content" />
            <LinearGradient
                colors={BACKGROUND_GRADIENT_COLOR}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.gradient}
            >
                <View style={styles.content}>
                    <View style={styles.topContainer}>
                        <View style={styles.titleContainer}>
                            <Text style={styles.title}>登       录</Text>
                        </View>
                        <View style={styles.authButtonContainer}>
                            <TouchableOpacity style={styles.authButton}>
                                <IconButton size={30} iconSource={ICON_WECHAT} enabled={false} />
                                <Text style={styles.authButtonText}>继 续 使 用 微 信</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.authButton}>
                                <IconButton size={30} iconSource={ICON_TIKTOK} enabled={false} />
                                <Text style={styles.authButtonText}>继 续 使 用 抖 音</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.info}>
                        <View style={styles.infoItem}>
                            <Text style={styles.infoTitle}>电子邮件:</Text>
                            <View style={styles.infoTextContainer}>
                                <IconButton size={30} iconSource={ICON_EMAIL} enabled={false} iconStyle={styles.icon} />
                                <TextInput
                                    style={styles.infoText}
                                    placeholder="email@email.com"
                                    placeholderTextColor="rgba(255, 255, 255, 0.5)"
                                />
                            </View>
                        </View>
                    </View>
                    <View style={styles.info}>
                        <View style={styles.infoItem}>
                            <Text style={styles.infoTitle}>姓        名:</Text>
                            <View style={styles.infoTextContainer}>
                                <IconButton size={30} iconSource={ICON_USER} enabled={false} iconStyle={styles.icon} />
                                <TextInput
                                    style={styles.infoText}
                                    placeholder="姓        名"
                                    placeholderTextColor="rgba(255, 255, 255, 0.5)"
                                />
                            </View>
                        </View>
                    </View>
                    <View style={styles.info}>
                        <View style={styles.infoItem}>
                            <Text style={styles.infoTitle}>用户名称:</Text>
                            <View style={styles.infoTextContainer}>
                                <IconButton size={30} iconSource={ICON_USER} enabled={false} iconStyle={styles.icon} />
                                <TextInput
                                    style={styles.infoText}
                                    placeholder="用户名称"
                                    placeholderTextColor="rgba(255, 255, 255, 0.5)"
                                />
                            </View>
                        </View>
                    </View>
                    <View style={styles.info}>
                        <View style={styles.infoItem}>
                            <Text style={styles.infoTitle}>密        码:</Text>
                            <View style={styles.infoTextContainer}>
                                <IconButton size={30} iconSource={ICON_USERLOCK} enabled={false} iconStyle={styles.icon} />
                                <TextInput
                                    style={styles.passwordText}
                                    placeholder="....................."
                                    placeholderTextColor="rgba(255, 255, 255, 0.5)"
                                    secureTextEntry
                                />
                                <IconButton size={30} iconSource={ICON_EYE} iconStyle={styles.icon} />
                            </View>
                        </View>
                    </View>
                    <View style={styles.other}>
                        <Text style={styles.otherText}>您还没有账户吗？</Text>
                        <TextButton text='立即注册' backgroundColor={'rgba(255, 255, 255, 0)'} textColor={'rgba(0, 255, 255, 1)'} fontSize={15} />
                    </View>
                    <View style={styles.registerButton}>
                        <TextButton text='报       名' backgroundColor={'rgba(255, 0, 153, 1)'} borderRadius={10} paddingHorizontal={35} paddingVertical={5} fontSize={25} />
                    </View>
                </View>
            </LinearGradient>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        flex: 1,
        marginHorizontal: 30
    },
    gradient: {
        flex: 1,
    },
    topContainer: {
        height: SCREEN_HEIGHT * 0.45,
        justifyContent: 'flex-end'
    },
    titleContainer: {
        alignItems: 'center'
    },
    title: {
        marginBottom: 30,
        color: 'rgba(255, 255, 255, 1)',
        fontSize: 35
    },
    authButtonContainer: {
        marginVertical: 30
    },
    authButton: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 5,
        paddingVertical: 5,
        borderRadius: 5,
        backgroundColor: 'rgba(255, 255, 255, 1)'
    },
    authButtonText: {
        marginLeft: 20,
        color: 'rgba(51, 51, 51, 1)',
        fontSize: 17
    },
    info: {
        justifyContent: 'space-between',
        marginVertical: 10
    },
    infoItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    infoTitle: {
        color: 'rgba(255, 255, 255, 1)',
        fontSize: 20,
    },
    infoTextContainer: {
        flexDirection: 'row',
        width: SCREEN_WIDTH * 0.6,
        borderBottomWidth: 1,
        borderColor: 'rgba(255, 255, 255, 1)',
    },
    infoText: {
        marginLeft: 10,
        width: SCREEN_WIDTH * 0.6 - 40,
        color: 'rgba(255, 255, 255, 1)',
        fontSize: 15,
    },
    passwordText: {
        marginLeft: 10,
        width: SCREEN_WIDTH * 0.6 - 65,
        color: 'rgba(255, 255, 255, 1)',
        fontSize: 15,
    },
    icon: {
        opacity: 0.5
    },
    other: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 40,
        marginBottom: 30
    },
    otherText: {
        marginRight: 10,
        color: 'rgba(255, 255, 255, 1)',
        fontSize: 15
    },
    registerButton: {
        alignItems: 'center',
        marginVertical: 30
    }
});