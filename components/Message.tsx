import { useAuth } from '@/components/navigation/Authentication';
import { BOTTOM_TAPBAR_HEIGHT, CHINESE_EMOJI_LANG, ICON_AD, ICON_EMOJI, ICON_SEND, SCREEN_WIDTH } from '@/constants/Config';
import { usePusher } from '@/hooks/usePusher';
import Request from '@/utils/request';
import React, { useEffect, useRef, useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TextInput, ToastAndroid, View } from 'react-native';
import { GestureHandlerRootView, PinchGestureHandler, State } from 'react-native-gesture-handler';
import EmojiPicker from 'rn-emoji-keyboard';
import Blank from './Blank';
import IconButton from './IconButton';
import Loading from './Loading';
import MessageBox from './MessageBox';

interface MessageProps {
    userId: string;
    avatar: string | undefined;
}

interface IMessage {
    id: string;
    sender_id: string;
    receiver_id: string;
    message: string;
    updated_at: string;
    reply_id?: string;
}

const Message: React.FC<MessageProps> = ({
    userId,
    avatar
}) => {
    const { token, user } = useAuth();
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [text, setText] = useState<string>('');
    const [selectedMessages, setSelectedMessages] = useState<string[]>([]);
    const [isSelectionMode, setIsSelectionMode] = useState<boolean>(false);
    const [messages, setMessages] = useState<IMessage[] | null>(null);
    const [fontSize, setFontSize] = useState(10);
    const [pendingMessages, setPendingMessages] = useState<{ [key: string]: string }>({});
    const scrollViewRef = useRef<ScrollView>(null);
    const [scale, setScale] = useState(1);
    const baseScale = useRef(1);

    // Modified handleNewMessage to handle ID replacement
    const handleNewMessage = async (data: any) => {
        if (data.message.event_type !== "new_message" && data.message.receiver_id != user?.id) return;
        const serverMessage = data.message.message as IMessage;

        setMessages(currentMessages => {
            if (!currentMessages) return [serverMessage];

            // Remove any temporary message and add the server message
            const filteredMessages = currentMessages.filter(msg => {
                // Keep all messages except the temporary one with negative ID
                const isTemporaryMessage = parseInt(msg.id) < 0 &&
                    msg.message === serverMessage.message &&
                    msg.sender_id === serverMessage.sender_id;
                return !isTemporaryMessage;
            });

            return [...filteredMessages, serverMessage];
        });

        scrollViewRef.current?.scrollToEnd();
    };

    const { isConnected, error: pusherError } = usePusher({
        channelName: 'broad_cast_message',
        eventName: 'broadcast.message',
        onEvent: handleNewMessage
    });

    const messageById = (id: string): IMessage | null => {
        const res = messages ? messages.find(item => item.id === id) : null;
        return res ? res : null;
    };

    useEffect(() => {
        async function fetchData() {
            if (token) {
                try {
                    Request.setAuthorizationToken(token);
                    var res = await Request.Get(`/messages/get_message/${userId}`);
                    setMessages(res);
                    scrollViewRef.current?.scrollToEnd();
                } catch (error) {
                    console.error(error);
                    ToastAndroid.show('API 错误！', ToastAndroid.SHORT);
                }
            }
        }
        fetchData();
    }, []);

    const onPinchGestureEvent = (event: any) => {
        const newScale = baseScale.current * event.nativeEvent.scale;
        setScale(newScale);
        const newFontSize = Math.min(Math.max(10 * newScale, 10), 20);
        setFontSize(newFontSize);
    };

    const onPinchHandlerStateChange = (event: any) => {
        if (event.nativeEvent.oldState === State.ACTIVE) {
            baseScale.current *= event.nativeEvent.scale;
            setScale(baseScale.current);
        }
    };

    async function handleSend() {
        if (token && text && user) {
            const tempId = (-Date.now()).toString(); // Use negative timestamp as temporary ID

            try {
                // Create temporary message
                const tempMessage: IMessage = {
                    id: tempId,
                    sender_id: user.id,
                    receiver_id: userId,
                    updated_at: new Date().toISOString(),
                    message: text
                };

                // Optimistically add message to UI
                setMessages(current =>
                    current ? [...current, tempMessage] : [tempMessage]
                );
                setText('');
                scrollViewRef.current?.scrollToEnd();

                // Send API request
                Request.setAuthorizationToken(token);
                const res = await Request.Post(`/messages/send_message`, {
                    receiver_id: userId,
                    message: text
                });

                // Store the mapping between server ID and temp ID
                if (res.id) {
                    setPendingMessages(current => ({
                        ...current,
                        [res.id]: tempId
                    }));
                }
            } catch (error) {
                // Handle error - remove temporary message
                setMessages(current =>
                    current ? current.filter(msg => msg.id !== tempId) : null
                );
                console.error(error);
                ToastAndroid.show('消息发送失败！', ToastAndroid.SHORT);
            }
        }
    }

    function handleAd() {
        setText(text + '@');
    }

    function handleEmoji() {
        setIsOpen(!isOpen);
    }

    function handlePick(emoji: any) {
        setText(text + emoji.emoji);
    }

    function handlePress(id: string) {
        if (isSelectionMode) {
            toggleMessageSelection(id);
        } else {
            showPopupMenu([id]);
        }
    }

    function handleReplyPress(id: string) {
        // Implement reply logic
    }

    function handleLongPress(id: string) {
        if (!isSelectionMode) {
            setIsSelectionMode(true);
            setSelectedMessages([id]);
        } else {
            toggleMessageSelection(id);
        }
    }

    function toggleMessageSelection(id: string) {
        setSelectedMessages(prevSelected => {
            const newSelected = prevSelected.includes(id)
                ? prevSelected.filter(messageId => messageId !== id)
                : [...prevSelected, id];

            if (newSelected.length === 0) {
                setIsSelectionMode(false);
            }

            return newSelected;
        });
    }

    function showPopupMenu(messageIds: string[]) {
        Alert.alert(
            "消息选项",
            "请选择操作",
            [
                { text: "复制", onPress: () => handleCopy(messageIds) },
                { text: "回复", onPress: () => handleReply(messageIds) },
                { text: "删除", onPress: () => handleDelete(messageIds) },
                { text: "取消", style: "cancel" }
            ]
        );
    }

    function handleCopy(messageIds: string[]) {
        console.log("Copying messages:", messageIds);
    }

    function handleReply(messageIds: string[]) {
        console.log("Replying to messages:", messageIds);
    }

    function handleDelete(messageIds: string[]) {
        console.log("Deleting messages:", messageIds);
    }

    if (!messages) {
        return <Loading backgroundColor={'transparent'} />;
    }

    if (messages.length === 0) {
        return (
            <View style={{ flex: 1 }}>
                <View style={styles.container}>
                    <Blank />
                    <View style={styles.inputBarContainer}>
                        <View style={styles.inputBar}>
                            <TextInput
                                value={text}
                                onChangeText={(value) => setText(value)}
                                style={[styles.input, { fontSize: fontSize }]}
                                placeholder="请输入您的意见。"
                                placeholderTextColor="#888"
                                multiline={true}
                            />
                            <View style={{ justifyContent: 'flex-end', paddingBottom: 5 }}>
                                <View style={{ flexDirection: 'row' }}>
                                    <IconButton
                                        onPress={handleAd}
                                        size={15}
                                        iconSource={ICON_AD}
                                        style={styles.inputBarIcon}
                                    />
                                    <IconButton
                                        onPress={handleEmoji}
                                        size={15}
                                        iconSource={ICON_EMOJI}
                                        style={styles.inputBarIcon}
                                    />
                                </View>
                            </View>
                        </View>
                        <View style={{ justifyContent: 'flex-end', paddingBottom: 7, marginLeft: 7 }}>
                            <IconButton onPress={handleSend} size={20} iconSource={ICON_SEND} />
                        </View>
                    </View>

                    <EmojiPicker
                        onEmojiSelected={handlePick}
                        open={isOpen}
                        onClose={() => setIsOpen(false)}
                        translation={CHINESE_EMOJI_LANG}
                    />
                </View>
            </View>
        );
    }

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <View style={styles.container}>
                <PinchGestureHandler
                    onGestureEvent={onPinchGestureEvent}
                    onHandlerStateChange={onPinchHandlerStateChange}
                >
                    <ScrollView
                        ref={scrollViewRef}
                        contentContainerStyle={styles.contentContainer}
                        showsVerticalScrollIndicator={false}
                        showsHorizontalScrollIndicator={false}
                    >
                        <View style={styles.messageContainer}>
                            {messages.map((item) => (
                                item.id ?
                                    <MessageBox
                                        key={item.id}
                                        userId={user?.id}
                                        receiverAvatar={avatar}
                                        senderAvatar={user?.avatar}
                                        message={item}
                                        replyMessage={item.reply_id ? messageById(item.reply_id) : null}
                                        fontSize={fontSize}
                                        // handlePress={() => item.id && handlePress(item.id)}
                                        // handleLongPress={() => item.id && handleLongPress(item.id)}
                                        // handleReplyPress={() => item.id && handleReplyPress(item.id)}
                                        selected={selectedMessages.includes(item.id)}
                                    /> :
                                    <View key={item.updated_at} style={styles.titleContainer}>
                                        <Text style={[styles.titleText, { fontSize: fontSize + 2 }]}>
                                            {item.updated_at && (
                                                new Date(item.updated_at).toDateString() === new Date().toDateString()
                                                    ? '今   天'
                                                    : new Date(item.updated_at).toDateString()
                                            )}
                                        </Text>
                                    </View>
                            ))}
                        </View>
                    </ScrollView>
                </PinchGestureHandler>

                <View style={styles.inputBarContainer}>
                    <View style={styles.inputBar}>
                        <TextInput
                            value={text}
                            onChangeText={(value) => setText(value)}
                            style={[styles.input, { fontSize: fontSize }]}
                            placeholder="请输入您的意见。"
                            placeholderTextColor="#888"
                            multiline={true}
                        />
                        <View style={{ justifyContent: 'flex-end', paddingBottom: 5 }}>
                            <View style={{ flexDirection: 'row' }}>
                                <IconButton
                                    onPress={handleAd}
                                    size={15}
                                    iconSource={ICON_AD}
                                    style={styles.inputBarIcon}
                                />
                                <IconButton
                                    onPress={handleEmoji}
                                    size={15}
                                    iconSource={ICON_EMOJI}
                                    style={styles.inputBarIcon}
                                />
                            </View>
                        </View>
                    </View>
                    <View style={{ justifyContent: 'flex-end', paddingBottom: 7, marginLeft: 7 }}>
                        <IconButton onPress={handleSend} size={20} iconSource={ICON_SEND} />
                    </View>
                </View>

                <EmojiPicker
                    onEmojiSelected={handlePick}
                    open={isOpen}
                    onClose={() => setIsOpen(false)}
                    translation={CHINESE_EMOJI_LANG}
                />

                {/* {isSelectionMode && (
                    <View style={styles.selectionBar}>
                        <TouchableOpacity onPress={() => showPopupMenu(selectedMessages)}>
                            <Text style={styles.selectionBarText}>选项</Text>
                        </TouchableOpacity>
                        <Text style={styles.selectionBarText}>{selectedMessages.length} 已选择</Text>
                        <TouchableOpacity onPress={() => {
                            setSelectedMessages([]);
                            setIsSelectionMode(false);
                        }}>
                            <Text style={styles.selectionBarText}>取消</Text>
                        </TouchableOpacity>
                    </View>
                )} */}
            </View>
        </GestureHandlerRootView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: 20,
        marginTop: 10,
        paddingBottom: BOTTOM_TAPBAR_HEIGHT + 50
    },
    contentContainer: {
        justifyContent: 'space-between',
        zIndex: 50,
    },
    messageContainer: {
        paddingVertical: 10
    },
    titleContainer: {
        alignItems: 'center'
    },
    titleText: {
        color: 'rgba(255, 255, 255, 0.5)',
    },
    inputBarContainer: {
        position: 'absolute',
        bottom: BOTTOM_TAPBAR_HEIGHT,
        width: SCREEN_WIDTH - 40,
        flexDirection: 'row',
        marginVertical: 10,
        backgroundColor: 'rgba(255, 255, 255, 1)',
        borderRadius: 5
    },
    inputBar: {
        flexDirection: 'row',
        width: SCREEN_WIDTH - 90,
        backgroundColor: 'rgba(236, 236, 236, 1)',
        borderRadius: 5,
        paddingHorizontal: 15,
        margin: 5,
    },
    input: {
        flex: 1,
        color: '#333',
        maxHeight: 100
    },
    inputBarIcon: {
        marginLeft: 5,
    },
    selectionBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        padding: 10,
        position: 'absolute',
        bottom: BOTTOM_TAPBAR_HEIGHT,
        left: 0,
        right: 0,
    },
    selectionBarText: {
        color: 'white',
        fontSize: 16,
    }
});

export default Message;