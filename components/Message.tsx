import { BOTTOM_TAPBAR_HEIGHT, CHINESE_EMOJI_LANG, ICON_AD, ICON_EMOJI, ICON_SEND, SCREEN_WIDTH } from '@/constants/Config';
import React, { useEffect, useRef, useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, View, TouchableOpacity, Alert, ToastAndroid } from 'react-native';
import EmojiPicker from 'rn-emoji-keyboard';
import IconButton from './IconButton';
import MessageBox from './MessageBox';
import { useAuth } from '@/components/navigation/Authentication';
import { PinchGestureHandler, State, GestureHandlerRootView } from 'react-native-gesture-handler';
import Request from '@/utils/request';
import Loading from './Loading';
import Blank from './Blank';

interface MessageProps {
    userId: string;
    avatar: string | undefined;
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
    const [date, setDate] = useState(new Date(0))
    const scrollViewRef = useRef<ScrollView>(null);
    const [scale, setScale] = useState(1);
    const [unCheckId, setUnCheckId] = useState(0);
    const baseScale = useRef(1);

    const messageById = (id: string): IMessage | null => {
        const res = messages ? messages.find(item => item.id === id) : null;
        return res ? res : null;
    };

    useEffect(() => {
        async function fetchData() {
            if (token) {
                try {
                    Request.setAuthorizationToken(token);
                    var res = await Request.Get(`/messages/get/${userId}`);
                    setMessages(res);
                    scrollViewRef.current?.scrollToEnd();
                } catch (error) {
                    console.log(error);
                    ToastAndroid.show('API 错误！', ToastAndroid.SHORT);
                }
            }
        }
        fetchData();
    }, [])

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

    if (!messages) {
        return <Loading backgroundColor={'transparent'} />;
    }

    if (messages.length === 0) {
        return <Blank />;
    }

    async function handleSend() {
        if (token && text && user) {
            const tempId = unCheckId - 1;
            try {
                Request.setAuthorizationToken(token);

                // Create temporary message with unique ID
                setUnCheckId(tempId);

                const tempMessage: IMessage = {
                    id: tempId.toString(),
                    sender_id: user.id,
                    receiver_id: userId,
                    updated_at: new Date().toISOString(),
                    message: text
                };

                // Add temporary message to the UI
                const updatedMessages = messages ? [...messages, tempMessage] : [tempMessage];
                setMessages(updatedMessages);
                setText('');
                scrollViewRef.current?.scrollToEnd();

                // Send API request
                const res = await Request.Post(`/messages`, {
                    receiver_id: userId,
                    message: text
                });

                // Update the message with response from server
                if (res.message && messages) {
                    const serverMessage = res.message.message as IMessage;

                    // Create new messages array with the updated message
                    const finalMessages = updatedMessages.map(msg =>
                        msg.id === tempId.toString() ? serverMessage : msg
                    );

                    setMessages(finalMessages);
                    setUnCheckId(tempId + 1);
                    scrollViewRef.current?.scrollToEnd();
                }
            } catch (error) {
                // Optionally: Remove the temporary message if API call fails
                if (messages) {
                    const fallbackMessages = messages.filter(msg =>
                        msg.id !== tempId.toString()
                    );
                    setMessages(fallbackMessages);
                }
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

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <View style={styles.container}>
                <PinchGestureHandler
                    onGestureEvent={onPinchGestureEvent}
                    onHandlerStateChange={onPinchHandlerStateChange}
                >
                    <ScrollView ref={scrollViewRef} contentContainerStyle={styles.contentContainer} showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
                        <View style={styles.messageContainer}>
                            {messages.map((item, index) => (
                                item.id ?
                                    <MessageBox
                                        key={index}
                                        userId={user?.id}
                                        receiverAvatar={avatar}
                                        senderAvatar={user?.avatar}
                                        message={item}
                                        replyMessage={item.reply_id ? messageById(item.reply_id) : null}
                                        fontSize={fontSize}
                                        handlePress={() => item.id && handlePress(item.id)}
                                        handleLongPress={() => item.id && handleLongPress(item.id)}
                                        handleReplyPress={() => item.id && handleReplyPress(item.id)}
                                        selected={selectedMessages.includes(item.id)}
                                    /> :
                                    <View key={index} style={styles.titleContainer}>
                                        <Text style={[styles.titleText, { fontSize: fontSize + 2 }]}>{item.updated_at && (new Date(item.updated_at).toDateString() === new Date().toDateString() ? '今   天' : new Date(item.updated_at).toDateString())}</Text>
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
                                <IconButton onPress={handleAd} size={15} iconSource={ICON_AD} style={styles.inputBarIcon} />
                                <IconButton onPress={handleEmoji} size={15} iconSource={ICON_EMOJI} style={styles.inputBarIcon} />
                            </View>
                        </View>
                    </View>
                    <View style={{ justifyContent: 'flex-end', paddingBottom: 7 }}>
                        <IconButton onPress={handleSend} size={20} iconSource={ICON_SEND} />
                    </View>
                </View>
                <EmojiPicker onEmojiSelected={handlePick} open={isOpen} onClose={() => setIsOpen(false)} translation={CHINESE_EMOJI_LANG} />
                <View style={{ margin: BOTTOM_TAPBAR_HEIGHT / 2 }}></View>
                {isSelectionMode && (
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
                )}
            </View>
        </GestureHandlerRootView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: 20,
        marginTop: 10
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
        flexDirection: 'row',
        marginVertical: 10,
        backgroundColor: 'rgba(255, 255, 255, 1)',
        borderRadius: 5
    },
    inputBar: {
        flexDirection: 'row',
        width: SCREEN_WIDTH - 80,
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