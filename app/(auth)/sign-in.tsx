import IconButton from '@/components/IconButton';
import Loading from '@/components/Loading';
import TextButton from '@/components/TextButton';
import { BACKGROUND_GRADIENT_COLOR, ICON_EMAIL, ICON_EYE, ICON_EYEOFF, ICON_TIKTOK, ICON_USERLOCK, ICON_WECHAT, SCREEN_HEIGHT, SCREEN_WIDTH } from '@/constants/Config';
import { useAuth } from "@/context/Authentication";
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { SafeAreaView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function SignIn() {
    const { signIn } = useAuth();
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [passwordVisible, setPasswordVisible] = useState<boolean>(false);

    async function handleSignIn() {
        await signIn({ email, password });
    }

    function handleWithWechat() { }

    function handleWithTiktok() { }

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
                            <TouchableOpacity onPress={handleWithWechat} style={styles.authButton}>
                                <IconButton size={30} iconSource={ICON_WECHAT} enabled={false} />
                                <Text style={styles.authButtonText}>继 续 使 用 微 信</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={handleWithTiktok} style={styles.authButton}>
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
                                    value={email}
                                    onChangeText={(value) => setEmail(value)}
                                    style={styles.infoText}
                                    placeholder="email@email.com"
                                    placeholderTextColor="rgba(255, 255, 255, 0.5)"
                                    keyboardType="email-address"
                                />
                            </View>
                        </View>
                    </View>
                    {
                        passwordVisible ?
                            <View style={styles.info}>
                                <View style={styles.infoItem}>
                                    <Text style={styles.infoTitle}>密        码:</Text>
                                    <View style={styles.infoTextContainer}>
                                        <IconButton size={30} iconSource={ICON_USERLOCK} enabled={false} iconStyle={styles.icon} />
                                        <TextInput
                                            value={password}
                                            onChangeText={(value) => setPassword(value)}
                                            style={styles.passwordText}
                                            placeholder="....................."
                                            placeholderTextColor="rgba(255, 255, 255, 0.5)"
                                        />
                                        <IconButton onPress={() => setPasswordVisible(false)} size={30} iconSource={ICON_EYEOFF} iconStyle={styles.icon} />
                                    </View>
                                </View>
                            </View> :
                            <View style={styles.info}>
                                <View style={styles.infoItem}>
                                    <Text style={styles.infoTitle}>密        码:</Text>
                                    <View style={styles.infoTextContainer}>
                                        <IconButton size={30} iconSource={ICON_USERLOCK} enabled={false} iconStyle={styles.icon} />
                                        <TextInput
                                            value={password}
                                            onChangeText={(value) => setPassword(value)}
                                            style={styles.passwordText}
                                            placeholder="....................."
                                            placeholderTextColor="rgba(255, 255, 255, 0.5)"
                                            secureTextEntry
                                        />
                                        <IconButton onPress={() => setPasswordVisible(true)} size={30} iconSource={ICON_EYE} iconStyle={styles.icon} />
                                    </View>
                                </View>
                            </View>
                    }
                    <View style={styles.other}>
                        <Text style={styles.otherText}>您还没有账户吗？</Text>
                        <TextButton onPress={() => router.replace('/sign-up')} text='立即注册' backgroundColor={'rgba(255, 255, 255, 0)'} textColor={'rgba(0, 255, 255, 1)'} fontSize={15} />
                    </View>
                    <View style={styles.loginButton}>
                        <TextButton onPress={handleSignIn} text='登       录' backgroundColor={'rgba(255, 0, 153, 1)'} borderRadius={10} paddingHorizontal={35} paddingVertical={5} fontSize={25} />
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
        marginVertical: 20
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
        marginVertical: 30,
    },
    otherText: {
        marginRight: 10,
        color: 'rgba(255, 255, 255, 1)',
        fontSize: 15
    },
    loginButton: {
        alignItems: 'center',
        marginVertical: 30
    }
});