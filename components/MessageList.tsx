import { BOTTOM_TAPBAR_HEIGHT, ICON_USER1, IMAGE_BG7, SCREEN_WIDTH } from '@/constants/Config';
import { useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import ImageButton from './ImageButton';

const MessageList = () => {
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
                <View style={styles.border}>
                        <TouchableOpacity style={styles.message}>
                            <ImageButton size={42} iconSource={ICON_USER1} enabled={false} />
                            <View style={styles.messageContent}>
                                <View style={styles.messageItem}>
                                    <Text style={styles.messageTitle}>昵  称</Text>
                                    <View style={styles.borderUnread}>
                                        <Text style={styles.messageUnread}>3</Text>
                                    </View>
                                </View>
                                <View style={styles.messageItem}>
                                    <Text style={styles.messageText}>消息的内容显示在这里。</Text>
                                    <Text style={styles.messageText}>2024. 10. 06</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    <View style={styles.messageLine}></View>
                    <TouchableOpacity style={styles.message}>
                            <ImageButton size={42} iconSource={ICON_USER1} enabled={false} />
                            <View style={styles.messageContent}>
                                <View style={styles.messageItem}>
                                    <Text style={styles.messageTitle}>昵  称</Text>
                                    <View style={styles.borderUnread}>
                                        <Text style={styles.messageUnread}>3</Text>
                                    </View>
                                </View>
                                <View style={styles.messageItem}>
                                    <Text style={styles.messageText}>消息的内容显示在这里。</Text>
                                    <Text style={styles.messageText}>2024. 10. 06</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    <View style={styles.messageLine}></View>
                    <TouchableOpacity style={styles.message}>
                            <ImageButton size={42} iconSource={ICON_USER1} enabled={false} />
                            <View style={styles.messageContent}>
                                <View style={styles.messageItem}>
                                    <Text style={styles.messageTitle}>昵  称</Text>
                                    <View style={styles.borderUnread}>
                                        <Text style={styles.messageUnread}>3</Text>
                                    </View>
                                </View>
                                <View style={styles.messageItem}>
                                    <Text style={styles.messageText}>消息的内容显示在这里。</Text>
                                    <Text style={styles.messageText}>2024. 10. 06</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    <View style={styles.messageLine}></View>
                    <TouchableOpacity style={styles.message}>
                            <ImageButton size={42} iconSource={ICON_USER1} enabled={false} />
                            <View style={styles.messageContent}>
                                <View style={styles.messageItem}>
                                    <Text style={styles.messageTitle}>昵  称</Text>
                                    <View style={styles.borderUnread}>
                                        <Text style={styles.messageUnread}>3</Text>
                                    </View>
                                </View>
                                <View style={styles.messageItem}>
                                    <Text style={styles.messageText}>消息的内容显示在这里。</Text>
                                    <Text style={styles.messageText}>2024. 10. 06</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    <View style={styles.messageLine}></View>
                    <TouchableOpacity style={styles.message}>
                            <ImageButton size={42} iconSource={ICON_USER1} enabled={false} />
                            <View style={styles.messageContent}>
                                <View style={styles.messageItem}>
                                    <Text style={styles.messageTitle}>昵  称</Text>
                                    <View style={styles.borderUnread}>
                                        <Text style={styles.messageUnread}>3</Text>
                                    </View>
                                </View>
                                <View style={styles.messageItem}>
                                    <Text style={styles.messageText}>消息的内容显示在这里。</Text>
                                    <Text style={styles.messageText}>2024. 10. 06</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    <View style={styles.messageLine}></View>
                    <TouchableOpacity style={styles.message}>
                            <ImageButton size={42} iconSource={ICON_USER1} enabled={false} />
                            <View style={styles.messageContent}>
                                <View style={styles.messageItem}>
                                    <Text style={styles.messageTitle}>昵  称</Text>
                                    <View style={styles.borderUnread}>
                                        <Text style={styles.messageUnread}>3</Text>
                                    </View>
                                </View>
                                <View style={styles.messageItem}>
                                    <Text style={styles.messageText}>消息的内容显示在这里。</Text>
                                    <Text style={styles.messageText}>2024. 10. 06</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    <View style={styles.messageLine}></View>
                    <TouchableOpacity style={styles.message}>
                            <ImageButton size={42} iconSource={ICON_USER1} enabled={false} />
                            <View style={styles.messageContent}>
                                <View style={styles.messageItem}>
                                    <Text style={styles.messageTitle}>昵  称</Text>
                                    <View style={styles.borderUnread}>
                                        <Text style={styles.messageUnread}>3</Text>
                                    </View>
                                </View>
                                <View style={styles.messageItem}>
                                    <Text style={styles.messageText}>消息的内容显示在这里。</Text>
                                    <Text style={styles.messageText}>2024. 10. 06</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    <View style={styles.messageLine}></View>
                    <TouchableOpacity style={styles.message}>
                            <ImageButton size={42} iconSource={ICON_USER1} enabled={false} />
                            <View style={styles.messageContent}>
                                <View style={styles.messageItem}>
                                    <Text style={styles.messageTitle}>昵  称</Text>
                                    <View style={styles.borderUnread}>
                                        <Text style={styles.messageUnread}>3</Text>
                                    </View>
                                </View>
                                <View style={styles.messageItem}>
                                    <Text style={styles.messageText}>消息的内容显示在这里。</Text>
                                    <Text style={styles.messageText}>2024. 10. 06</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    <View style={styles.messageLine}></View>
                    <TouchableOpacity style={styles.message}>
                            <ImageButton size={42} iconSource={ICON_USER1} enabled={false} />
                            <View style={styles.messageContent}>
                                <View style={styles.messageItem}>
                                    <Text style={styles.messageTitle}>昵  称</Text>
                                    <View style={styles.borderUnread}>
                                        <Text style={styles.messageUnread}>3</Text>
                                    </View>
                                </View>
                                <View style={styles.messageItem}>
                                    <Text style={styles.messageText}>消息的内容显示在这里。</Text>
                                    <Text style={styles.messageText}>2024. 10. 06</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    <View style={styles.messageLine}></View>
                    <TouchableOpacity style={styles.message}>
                            <ImageButton size={42} iconSource={ICON_USER1} enabled={false} />
                            <View style={styles.messageContent}>
                                <View style={styles.messageItem}>
                                    <Text style={styles.messageTitle}>昵  称</Text>
                                    <View style={styles.borderUnread}>
                                        <Text style={styles.messageUnread}>3</Text>
                                    </View>
                                </View>
                                <View style={styles.messageItem}>
                                    <Text style={styles.messageText}>消息的内容显示在这里。</Text>
                                    <Text style={styles.messageText}>2024. 10. 06</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    <View style={styles.messageLine}></View>
                    <TouchableOpacity style={styles.message}>
                            <ImageButton size={42} iconSource={ICON_USER1} enabled={false} />
                            <View style={styles.messageContent}>
                                <View style={styles.messageItem}>
                                    <Text style={styles.messageTitle}>昵  称</Text>
                                    <View style={styles.borderUnread}>
                                        <Text style={styles.messageUnread}>3</Text>
                                    </View>
                                </View>
                                <View style={styles.messageItem}>
                                    <Text style={styles.messageText}>消息的内容显示在这里。</Text>
                                    <Text style={styles.messageText}>2024. 10. 06</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    <View style={styles.messageLine}></View>
                    <TouchableOpacity style={styles.message}>
                            <ImageButton size={42} iconSource={ICON_USER1} enabled={false} />
                            <View style={styles.messageContent}>
                                <View style={styles.messageItem}>
                                    <Text style={styles.messageTitle}>昵  称</Text>
                                    <View style={styles.borderUnread}>
                                        <Text style={styles.messageUnread}>3</Text>
                                    </View>
                                </View>
                                <View style={styles.messageItem}>
                                    <Text style={styles.messageText}>消息的内容显示在这里。</Text>
                                    <Text style={styles.messageText}>2024. 10. 06</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                </View>
                <View style={styles.space}></View>
            </ScrollView>
        </View>
    );
};



const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: 20,
        // marginVertical: 10,
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
    space: {
        margin: BOTTOM_TAPBAR_HEIGHT / 2 + 10
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