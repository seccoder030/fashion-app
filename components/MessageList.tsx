import { BOTTOM_TAPBAR_HEIGHT, ICON_AVATAR, SCREEN_WIDTH } from '@/constants/Config';
import Request from '@/utils/request';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, ToastAndroid, TouchableOpacity, View } from 'react-native';
import Blank from './Blank';
import Loading from './Loading';
import { useAuth } from './navigation/Authentication';

const MessageList = () => {
    const { token } = useAuth();
    const [friends, setFriends] = useState<IFriend[] | null>(null);

    useEffect(() => {
        async function fetchData() {
            if (token) {
                try {
                    Request.setAuthorizationToken(token);
                    var res = await Request.Get('/chat/friends/get');
                    setFriends(res.friends);
                } catch (error) {
                    console.log(error);
                    ToastAndroid.show('API 错误！', ToastAndroid.SHORT);
                }
            }
        }
        fetchData();
    }, [])

    if (!friends) {
        return <Loading backgroundColor={'transparent'} />;
    }

    if (friends.length === 0) {
        return <Blank />
    }

    function handleItem(item: IFriend) {
        router.push({ pathname: '/MessageScreen', params: { userId: item.user1.id, name: item.user1.name, avatar: item.user1.avatar } });
    }

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.contentContainer} showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
                {friends.map((item, index) => (
                    <View key={index} style={styles.border}>
                        <TouchableOpacity onPress={() => handleItem(item)} style={styles.message}>
                            <Image
                                source={item.user1.avatar ? { uri: item.user1.avatar } : ICON_AVATAR}
                                style={[
                                    { width: 42, height: 42 },
                                    styles.userImage
                                ]}
                            />
                            <View style={styles.messageContent}>
                                <View style={styles.messageItem}>
                                    <Text style={styles.messageTitle}>{item.user1.name}</Text>
                                    {/* {item.unread > 0 &&
                                        <View style={styles.borderUnread}>
                                            <Text style={styles.messageUnread}>{item.unread}</Text>
                                        </View>
                                    } */}
                                </View>
                                <View style={styles.messageItem}>
                                    {/* <Text style={styles.messageText}>{item.message.length > 20 ? item.message.slice(0, 20) + '...' : item.message}</Text> */}
                                    <Text style={styles.messageDate}>{item.updated_at && new Date(item.updated_at).toDateString()}</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    </View>
                ))}
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
        paddingBottom: BOTTOM_TAPBAR_HEIGHT + 10,
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