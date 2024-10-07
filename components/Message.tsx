import { BOTTOM_TAPBAR_HEIGHT, ICON_AD, ICON_EMOJI, ICON_SEND, ICON_USER1, IMAGE_BG7, SCREEN_WIDTH } from '@/constants/Config';
import { useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import ImageButton from './ImageButton';

const Message = () => {
    const router = useRouter();

    const item = { id: '1', imageUrl: IMAGE_BG7, caption: '在此输入您的标题。', likes: 578, messages: 1208, star: 1031 };
    const messages = [
        { id: '1', name: '姓  名', birthday: '2024. 10. 30', messages: 221, likes: 1141, star: 1249, post: '请输入您的意见。请输入您的意见。请输入您的意见。请输入您的意见。请输入您的意见。请输入您的意见。' }
    ]

    function handleItem() {
        // router.push('/(main)/screens/HomeScreen');
    }

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.contentContainer} showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
                <View style={styles.messageContainer}>
                    <View style={styles.titleContainer}>
                        <Text style={styles.titleText}>今   天   8:00 AM</Text>
                    </View>
                    <View style={styles.receive}>
                        <ImageButton size={20} iconSource={ICON_USER1} enabled={false} style={styles.top} />
                        <View style={styles.receiveContent}>
                            <Text style={styles.text}>你好。</Text>
                            <Text style={styles.text}>你怎么样?</Text>
                        </View>
                    </View>
                    <View style={styles.receive}>
                        <ImageButton size={20} iconSource={ICON_USER1} enabled={false} style={styles.top} />
                        <View style={styles.receiveContent}>
                            <Text style={styles.text}>你好。</Text>
                            <Text style={styles.text}>你怎么样?</Text>
                        </View>
                    </View>
                    <View style={styles.send}>
                        <View style={styles.sendContent}>
                            <Text style={styles.text}>你好。</Text>
                            <Text style={styles.text}>你怎么样?</Text>
                        </View>
                        <ImageButton size={20} iconSource={ICON_USER1} enabled={false} style={styles.top} />
                    </View>
                    <View style={styles.receive}>
                        <ImageButton size={20} iconSource={ICON_USER1} enabled={false} style={styles.top} />
                        <View style={styles.receiveContent}>
                            <Text style={styles.text}>你好。</Text>
                            <Text style={styles.text}>你怎么样?</Text>
                        </View>
                    </View>
                    <View style={styles.send}>
                        <View style={styles.sendContent}>
                            <Text style={styles.text}>你好。</Text>
                            <Text style={styles.text}>你怎么样?</Text>
                        </View>
                        <ImageButton size={20} iconSource={ICON_USER1} enabled={false} style={styles.top} />
                    </View>
                    <View style={styles.receive}>
                        <ImageButton size={20} iconSource={ICON_USER1} enabled={false} style={styles.top} />
                        <View style={styles.receiveContent}>
                            <Text style={styles.text}>你好。</Text>
                            <Text style={styles.text}>你怎么样?</Text>
                        </View>
                    </View>
                    <View style={styles.send}>
                        <View style={styles.sendContent}>
                            <Text style={styles.text}>你好。</Text>
                            <Text style={styles.text}>你怎么样?</Text>
                        </View>
                        <ImageButton size={20} iconSource={ICON_USER1} enabled={false} style={styles.top} />
                    </View>
                    <View style={styles.receive}>
                        <ImageButton size={20} iconSource={ICON_USER1} enabled={false} style={styles.top} />
                        <View style={styles.receiveContent}>
                            <Text style={styles.text}>你好。</Text>
                            <Text style={styles.text}>你怎么样?</Text>
                        </View>
                    </View>
                    <View style={styles.send}>
                        <View style={styles.sendContent}>
                            <Text style={styles.text}>你好。</Text>
                            <Text style={styles.text}>你怎么样?</Text>
                        </View>
                        <ImageButton size={20} iconSource={ICON_USER1} enabled={false} style={styles.top} />
                    </View>
                    <View style={styles.receive}>
                        <ImageButton size={20} iconSource={ICON_USER1} enabled={false} style={styles.top} />
                        <View style={styles.receiveContent}>
                            <Text style={styles.text}>你好。</Text>
                            <Text style={styles.text}>你怎么样?</Text>
                        </View>
                    </View>
                    <View style={styles.send}>
                        <View style={styles.sendContent}>
                            <Text style={styles.text}>你好。</Text>
                            <Text style={styles.text}>你怎么样?</Text>
                        </View>
                        <ImageButton size={20} iconSource={ICON_USER1} enabled={false} style={styles.top} />
                    </View>
                    <View style={styles.receive}>
                        <ImageButton size={20} iconSource={ICON_USER1} enabled={false} style={styles.top} />
                        <View style={styles.receiveContent}>
                            <Text style={styles.text}>你好。</Text>
                            <Text style={styles.text}>你怎么样?</Text>
                        </View>
                    </View>
                    <View style={styles.send}>
                        <View style={styles.sendContent}>
                            <Text style={styles.text}>你好。</Text>
                            <Text style={styles.text}>你怎么样?</Text>
                        </View>
                        <ImageButton size={20} iconSource={ICON_USER1} enabled={false} style={styles.top} />
                    </View>
                    <View style={styles.receive}>
                        <ImageButton size={20} iconSource={ICON_USER1} enabled={false} style={styles.top} />
                        <View style={styles.receiveContent}>
                            <Text style={styles.text}>你好。</Text>
                            <Text style={styles.text}>你怎么样?</Text>
                        </View>
                    </View>
                    <View style={styles.send}>
                        <View style={styles.sendContent}>
                            <Text style={styles.text}>你好。</Text>
                            <Text style={styles.text}>你怎么样?</Text>
                        </View>
                        <ImageButton size={20} iconSource={ICON_USER1} enabled={false} style={styles.top} />
                    </View>
                </View>
            </ScrollView>
            <View style={styles.inputBarContainer}>
                <View style={styles.inputBar}>
                    <TextInput
                        style={styles.input}
                        placeholder="请输入您的意见。"
                        placeholderTextColor="#888"
                    />
                    <ImageButton size={15} iconSource={ICON_AD} style={styles.inputBarIcon} />
                    <ImageButton size={15} iconSource={ICON_EMOJI} style={styles.inputBarIcon} />
                </View>
                <ImageButton size={20} iconSource={ICON_SEND} />
            </View>
            <View style={styles.space}></View>
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
    space: {
        margin: BOTTOM_TAPBAR_HEIGHT / 2
    },
    receive: {
        flexDirection: 'row',
        marginHorizontal: 10,
        paddingVertical: 10
    },
    top: {
        top: 0
    },
    receiveContent: {
        justifyContent: 'center',
        marginLeft: 10,
        padding: 10,
        backgroundColor: 'rgba(252, 252, 252, 1)',
        borderRadius: 5
    },
    text: {
        color: 'rgba(38, 38, 38, 1)',
        fontSize: 10,
    },
    titleContainer: {
        alignItems: 'center'
    },
    titleText: {
        color: 'rgba(255, 255, 255, 0.5)',
        fontSize: 12,
    },
    send: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginHorizontal: 10,
        paddingVertical: 10
    },
    sendContent: {
        justifyContent: 'center',
        marginRight: 10,
        padding: 10,
        backgroundColor: 'rgba(193, 237, 255, 1)',
        borderRadius: 5
    },
    inputBarContainer: {
        flexDirection: 'row',
        marginVertical: 10,
        backgroundColor: 'rgba(255, 255, 255, 1)',
        borderRadius: 5
    },
    inputBar: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: 25,
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
    },
    inputBarIcon: {
        marginLeft: 5
    }
});

export default Message;