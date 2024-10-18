import { BOTTOM_TAPBAR_HEIGHT, SCREEN_WIDTH } from '@/constants/Config';
import { useRouter } from 'expo-router';
import React from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const MessageList = () => {
    const router = useRouter();

    const userlist = [
        { id: '1', name: '姓  名', uri: 'https://johnyanderson-portfolio.onrender.com/assets/images/logo/logo.png', date: '2024. 10. 30', unread: 3, message: '请输入您的意见请输入您的意见请输入您的请...' },
        { id: '2', name: '姓  名2', uri: 'https://johnyanderson-portfolio.onrender.com/assets/images/logo/logo.png', date: '2024. 10. 30', unread: 2, message: '请输入您的意见。请输入您的意见。请输入您的意见。请输入您的意见。请输入您的意见。请输入您的意见。' },
        { id: '3', name: '姓  名3', uri: 'https://johnyanderson-portfolio.onrender.com/assets/images/logo/logo.png', date: '2024. 10. 30', unread: 0, message: '请输入您的意见。请输入您的意见。请输入您的意见。请输入您的意见。请输入您的意见。请输入您的意见。' },
        { id: '3', name: '姓  名3', uri: 'https://johnyanderson-portfolio.onrender.com/assets/images/logo/logo.png', date: '2024. 10. 30', unread: 0, message: '请输入您的意见。请输入您的意见。请输入您的意见。请输入您的意见。请输入您的意见。请输入您的意见。' },
        { id: '3', name: '姓  名3', uri: 'https://johnyanderson-portfolio.onrender.com/assets/images/logo/logo.png', date: '2024. 10. 30', unread: 0, message: '请输入您的意见。请输入您的意见。请输入您的意见。请输入您的意见。请输入您的意见。请输入您的意见。' },
        { id: '3', name: '姓  名3', uri: 'https://johnyanderson-portfolio.onrender.com/assets/images/logo/logo.png', date: '2024. 10. 30', unread: 0, message: '请输入您的意见。请输入您的意见。请输入您的意见。请输入您的意见。请输入您的意见。请输入您的意见。' },
        { id: '3', name: '姓  名3', uri: 'https://johnyanderson-portfolio.onrender.com/assets/images/logo/logo.png', date: '2024. 10. 30', unread: 0, message: '请输入您的意见。请输入您的意见。请输入您的意见。请输入您的意见。请输入您的意见。请输入您的意见。' },
        { id: '3', name: '姓  名3', uri: 'https://johnyanderson-portfolio.onrender.com/assets/images/logo/logo.png', date: '2024. 10. 30', unread: 0, message: '请输入您的意见。请输入您的意见。请输入您的意见。请输入您的意见。请输入您的意见。请输入您的意见。' },
        { id: '3', name: '姓  名3', uri: 'https://johnyanderson-portfolio.onrender.com/assets/images/logo/logo.png', date: '2024. 10. 30', unread: 0, message: '请输入您的意见。请输入您的意见。请输入您的意见。请输入您的意见。请输入您的意见。请输入您的意见。' },
        { id: '3', name: '姓  名3', uri: 'https://johnyanderson-portfolio.onrender.com/assets/images/logo/logo.png', date: '2024. 10. 30', unread: 0, message: '请输入您的意见。请输入您的意见。请输入您的意见。请输入您的意见。请输入您的意见。请输入您的意见。' },
        { id: '3', name: '姓  名3', uri: 'https://johnyanderson-portfolio.onrender.com/assets/images/logo/logo.png', date: '2024. 10. 30', unread: 0, message: '请输入您的意见。请输入您的意见。请输入您的意见。请输入您的意见。请输入您的意见。请输入您的意见。' },
        { id: '3', name: '姓  名3', uri: 'https://johnyanderson-portfolio.onrender.com/assets/images/logo/logo.png', date: '2024. 10. 30', unread: 0, message: '请输入您的意见。请输入您的意见。请输入您的意见。请输入您的意见。请输入您的意见。请输入您的意见。' },
        { id: '3', name: '姓  名3', uri: 'https://johnyanderson-portfolio.onrender.com/assets/images/logo/logo.png', date: '2024. 10. 30', unread: 0, message: '请输入您的意见。请输入您的意见。请输入您的意见。请输入您的意见。请输入您的意见。请输入您的意见。' },
    ]

    function handleItem() {
        router.push('/MessageScreen');
    }

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.contentContainer} showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
                {userlist.map((item, index) => (
                    <View key={index} style={styles.border}>
                        <TouchableOpacity onPress={handleItem} style={styles.message}>
                            <Image
                                source={{ uri: item.uri }}
                                style={[
                                    { width: 42, height: 42 },
                                    styles.userImage
                                ]}
                            />
                            <View style={styles.messageContent}>
                                <View style={styles.messageItem}>
                                    <Text style={styles.messageTitle}>{item.name}</Text>
                                    {item.unread > 0 &&
                                        <View style={styles.borderUnread}>
                                            <Text style={styles.messageUnread}>{item.unread}</Text>
                                        </View>
                                    }
                                </View>
                                <View style={styles.messageItem}>
                                    <Text style={styles.messageText}>{item.message.length > 20 ? item.message.slice(0, 20) + '...' : item.message}</Text>
                                    <Text style={styles.messageDate}>{item.date}</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    </View>
                ))}
                <View style={{ margin: BOTTOM_TAPBAR_HEIGHT / 2 + 10 }} />
            </ScrollView>
        </View>
    );
};



const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: 20,
    },
    contentContainer: {
        justifyContent: 'space-between',
        zIndex: 50,
    },
    border: {
        borderColor: 'rgba(255, 255, 255, 0.2)',
        borderWidth: 1,
        backgroundColor: 'rgba(1, 1, 1, 0.15)',
        padding: 10
    },
    userImage: {
        borderRadius: 42,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.7)',
    },
    message: {
        marginHorizontal: 10,
        flexDirection: 'row',
        paddingVertical: 10
    },
    messageContent: {
        justifyContent: 'center',
        marginLeft: 10,
        width: SCREEN_WIDTH - 135
    },
    messageItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 2,
    },
    messageTitle: {
        color: 'rgba(255, 255, 255, 1)',
        fontSize: 12,
    },
    messageText: {
        color: 'rgba(181, 181, 181, 1)',
        fontSize: 10,
    },
    messageDate: {
        color: 'rgba(181, 181, 181, 1)',
        fontSize: 10,
    },
    borderUnread: {
        width: 13,
        height: 13,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'red',
        borderRadius: 10
    },
    messageUnread: {
        color: 'white',
        borderRadius: 9,
        fontSize: 9,
    },
    messageLine: {
        marginHorizontal: 10,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(79, 158, 191, 1)',
    },
});

export default MessageList;