import { BOTTOM_TAPBAR_HEIGHT, ICON_AD, ICON_EMOJI, ICON_SEND, SCREEN_WIDTH } from '@/constants/Config';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, View, TouchableOpacity, Alert } from 'react-native';
import EmojiPicker from 'rn-emoji-keyboard';
import IconButton from './IconButton';
import MessageBox from './MessageBox';
import { useAuth } from '@/context/Authentication';

const Message = () => {
    const ch = {
        recently_used: '最近使用',
        smileys_emotion: '笑脸与情感',
        people_body: '人物与身体',
        animals_nature: '动物与自然',
        food_drink: '食物与饮料',
        travel_places: '旅行与地点',
        activities: '活动',
        objects: '物体',
        symbols: '符号',
        flags: '旗帜',
        search: '搜索',
    }

    const avatar = 'https://johnyanderson-portfolio.onrender.com/assets/images/logo/logo.png';

    const messagesProps: IMessage[] = [
        { id: '1', userid: '姓  名', date: '2024-10-13T13:15:30.000Z', receive: false, text: '请输入您的意见。\n请输入您的意见。\n请输入您的意见。请输入您的意见。请输入您的意见。请输入您的意见。', medias: [{ type: "image", uri: 'https://johnyanderson-portfolio.onrender.com/assets/images/logo/logo.png' }] },
        { id: '2', userid: '姓  名', date: '2024-10-13T13:15:30.000Z', receive: true, text: '请输入您的意见。\n请输入您的意见。\n请输入您的意见。请输入您的意见。请输入您的意见。请输入您的意见。', medias: [{ type: "image", uri: 'https://johnyanderson-portfolio.onrender.com/assets/images/logo/logo.png' }] },
        { id: '3', userid: '姓  名', date: '2024-10-13T13:15:30.000Z', receive: true, text: '请输入您的意见。' },
        { id: '4', userid: '姓  名', date: '2024-10-13T13:15:30.000Z', receive: false, text: '请输入您的意见。', replyMessage: { id: '3', userid: '姓  名', date: '2024-10-13T13:15:30.000Z', receive: true, text: '请输入您的意见。' } },
        { id: '5', userid: '姓  名', date: '2024-10-13T13:15:30.000Z', receive: false, text: '请输入您的意见。', replyMessage: { id: '3', userid: '姓  名', date: '2024-10-13T13:15:30.000Z', receive: true, text: '请输入您的意见。', medias: [{ type: "image", uri: 'https://johnyanderson-portfolio.onrender.com/assets/images/logo/logo.png' }] } },
        { id: '6', userid: '姓  名', date: '2024-10-13T13:15:30.000Z', receive: false, text: '请输入您的意见。' },
        { id: '7', userid: '姓  名', date: '2024-10-13T13:15:30.000Z', receive: false, text: '请输入您的意见。' },
        { id: '8', userid: '姓  名', date: '2024-10-13T13:15:30.000Z', receive: false, text: '请输入您的意见。' },
        { id: '9', userid: '姓  名', date: '2024-10-13T13:15:30.000Z', receive: false, text: '请输入您的意见。' },
        { id: '10', userid: '姓  名', date: '2024-10-13T13:15:30.000Z', receive: false, text: '请输入您的意见。' },
        { id: '11', userid: '姓  名', date: '2024-10-13T13:15:30.000Z', receive: true, text: '请输入您的意见。' },
    ]

    const { token, user } = useAuth();
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [text, setText] = useState<string>('');
    const [selectedMessages, setSelectedMessages] = useState<string[]>([]);
    const [isSelectionMode, setIsSelectionMode] = useState<boolean>(false);
    const [messages, setMessages] = useState<IMessage[]>(messagesProps);
    const [date, setDate] = useState(new Date());

    function handleSend() {
        // Implement send logic here
        if (user) {
            const message: IMessage = {
                id: messages[messages.length - 1].id.toString(),
                userid: user.id,
                date: new Date().toISOString(),
                receive: false,
                text: text
            }
            console.log(message.date)
            setMessages([...messages, message]);
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
            // Show pop-up menu for single message
            showPopupMenu([id]);
        }
    }

    function handleLongPress(id: string) {
        console.log(id)
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
        // Implement copy logic
        console.log("Copying messages:", messageIds);
    }

    function handleReply(messageIds: string[]) {
        // Implement reply logic
        console.log("Replying to messages:", messageIds);
    }

    function handleDelete(messageIds: string[]) {
        // Implement delete logic
        console.log("Deleting messages:", messageIds);
    }

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.contentContainer} showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
                <View style={styles.messageContainer}>
                    {messages.map((item, index) => (
                        <MessageBox
                            key={index}
                            avatar={avatar}
                            message={item}
                            handlePress={() => handlePress(item.id)}
                            handleLongPress={() => handleLongPress(item.id)}
                            selected={selectedMessages.includes(item.id)}
                        />
                    ))}
                    <View style={styles.titleContainer}>
                        <Text style={styles.titleText}>今   天   8:00 AM</Text>
                    </View>
                </View>
            </ScrollView>
            <View style={styles.inputBarContainer}>
                <View style={styles.inputBar}>
                    <TextInput
                        value={text}
                        onChangeText={(value) => setText(value)}
                        style={styles.input}
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
            <EmojiPicker onEmojiSelected={handlePick} open={isOpen} onClose={() => setIsOpen(false)} translation={ch} />
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
        fontSize: 12,
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
        fontSize: 13,
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