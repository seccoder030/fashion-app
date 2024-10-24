import { BOTTOM_TAPBAR_HEIGHT, ICON_AVATAR, ICON_CANCEL, ICON_CONFIRM, SCREEN_WIDTH } from '@/constants/Config';
import Request from '@/utils/request';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, ToastAndroid, TouchableOpacity, View } from 'react-native';
import Blank from './Blank';
import Loading from './Loading';
import { useAuth } from './navigation/Authentication';
import IconButton from './IconButton';
import { usePusher } from '@/hooks/usePusher';

const MessageList = () => {
    const { token, user, updateUser } = useAuth();
    const [friends, setFriends] = useState<IFriend[] | null>(null);
    const [pendingFriends, setPendingFriends] = useState<IPendingFriend[] | null>(null);

    function filterNotify(item: IPendingFriend | null) {
        if (!item) return null;
        if (item.receiver_id == user?.id && item.event_type == "add_friend") return item;
        if (item.sender_id == user?.id && item.event_type == "decline_friend") return item;
        return null;
    }

    async function refresh() {
        if (token) {
            try {
                Request.setAuthorizationToken(token);
                var resFriends = await Request.Get('/friends/get');
                setFriends(resFriends.friends);
                var resNotify = await Request.Get('/notify');
                resNotify.message.map((item: IPendingFriend) => {
                    setPendingFriends(prevItems => {
                        const newItems = prevItems ? prevItems : [];
                        const filter = filterNotify(item);
                        filter && newItems.push(filter);
                        return newItems;
                    });
                })
                if (!pendingFriends) setPendingFriends([]);
            } catch (error) {
                console.error(error);
                ToastAndroid.show('API 错误！', ToastAndroid.SHORT);
            }
        }
    }

    useEffect(() => {
        refresh();
    }, [])

    // Modified handleNewMessage to handle ID replacement
    const handleNewMessage = async (data: any) => {
        const pendingMessages = data.message as IPendingFriend;
        const filter = filterNotify(pendingMessages);
        if ((pendingMessages.sender_id != user?.id || pendingMessages.receiver_id != user?.id) && pendingMessages.event_type === "accept_friend") {
            refresh();
        } else if (filter) {
            if (pendingFriends) setPendingFriends([...pendingFriends, filter]);
            else setPendingFriends([filter]);
        }
    };

    const { isConnected, error: pusherError } = usePusher({
        channelName: 'broad_cast_message',
        eventName: 'broadcast.message',
        onEvent: handleNewMessage
    });

    if (!friends || !pendingFriends) {
        return <Loading backgroundColor={'transparent'} />;
    }

    if (friends.length === 0 && pendingFriends.length === 0) {
        return <Blank />
    }

    function handleItem(item: IFriend) {
        router.push({ pathname: '/MessageScreen', params: { userId: item.user1.id, name: item.user1.name, avatar: item.user1.avatar } });
    }

    async function handleFriend(item: IPendingFriend, type: string) {
        if (token) {
            try {
                Request.setAuthorizationToken(token);
                var res = await Request.Post('/friend/handle_friend', {
                    status: type,
                    notify_id: item.notify_id,
                    sender_id: item.sender_id,
                    receiver_id: item.receiver_id
                });
                setPendingFriends(prevItems => {
                    if (!prevItems) return [];
                    const index = prevItems.findIndex(pendingItem => pendingItem.notify_id === item.notify_id);
                    const newItems = [...prevItems];
                    newItems.splice(index, 1);
                    return newItems;
                });
                await updateUser();
            } catch (error) {
                console.error(error);
                ToastAndroid.show('API 错误！', ToastAndroid.SHORT);
            }
        }
    }

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.contentContainer} showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
                {pendingFriends.map((item, index) => (
                    <View key={index} style={styles.border}>
                        <View style={styles.message}>
                            <Image
                                source={item.sender_avatar ? { uri: item.sender_avatar } : ICON_AVATAR}
                                style={[
                                    { width: 42, height: 42 },
                                    styles.userImage
                                ]}
                            />
                            <View style={styles.pedingMessageContent}>
                                <View style={styles.messageItem}>
                                    <Text style={styles.messageTitle}>{item.sender_name}</Text>
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
                            {item.event_type === 'add_friend' ?
                                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                    <View style={{ marginRight: 10 }}>
                                        <IconButton onPress={() => handleFriend(item, 'accept')} size={35} iconSource={ICON_CONFIRM} />
                                    </View>
                                    <View>
                                        <IconButton onPress={() => handleFriend(item, 'declined')} size={35} iconSource={ICON_CANCEL} />
                                    </View>
                                </View> :
                                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                    <View style={{ marginLeft: 45 }}>
                                        <IconButton onPress={() => handleFriend(item, 'removed')} size={35} iconSource={ICON_CANCEL} />
                                    </View>
                                </View>
                            }
                        </View>
                    </View>
                ))}
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
    pedingMessageContent: {
        justifyContent: 'center',
        marginLeft: 10,
        width: SCREEN_WIDTH - 215
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