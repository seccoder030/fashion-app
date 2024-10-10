import { ICON_COMMENTPOST, BOTTOM_TAPBAR_HEIGHT, ICON_AD, ICON_COMMENT, ICON_DOWN, ICON_EMOJI, ICON_HEARTFILL, ICON_STAR, ICON_USER1, IMAGE_BG7, SCREEN_WIDTH } from '@/constants/Config';
import { router } from 'expo-router';
import React from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import IconButton from './IconButton';
import EmojiPicker from 'rn-emoji-keyboard';

const SearchDetail = () => {
    const [isOpen, setIsOpen] = React.useState<boolean>(false);
    const [text, setText] = React.useState<string>('');

    const item = { id: '1', imageUrl: IMAGE_BG7, caption: '在此输入您的标题。', likes: 578, comments: 1208, star: 1031 };
    const comments = [
        { id: '1', name: '姓  名', birthday: '2024. 10. 30', comments: 221, likes: 1141, star: 1249, post: '请输入您的意见。请输入您的意见。请输入您的意见。请输入您的意见。请输入您的意见。请输入您的意见。' }
    ]

    function handleItem() {
    }

    function handleEmoji() {
        if (isOpen) setIsOpen(false);
        else setIsOpen(true);
    }

    function handlePick(emoji: any) {
        setText(text + emoji.emoji);
    }

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.contentContainer} showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
                <View style={styles.border}>
                    <View style={styles.cardLayout}>
                        <Pressable onPress={handleItem} key={item.id} style={styles.card}>
                            <Image source={item.imageUrl} style={styles.cardImage} />
                            <View style={styles.cardFooter}>
                                <View style={styles.info}>
                                    <View style={styles.infoItem}>
                                        <IconButton size={15} iconSource={ICON_COMMENT} enabled={false} />
                                        <Text style={styles.infoText}>{item.comments}</Text>
                                    </View>
                                    <View style={styles.infoItem}>
                                        <IconButton size={15} iconSource={ICON_HEARTFILL} enabled={false} />
                                        <Text style={styles.infoText}>{item.likes}</Text>
                                    </View>
                                    <View style={styles.infoItem}>
                                        <IconButton size={15} iconSource={ICON_STAR} enabled={false} />
                                        <Text style={styles.infoText}>{item.star}</Text>
                                    </View>
                                </View>
                            </View>
                        </Pressable >
                    </View>
                    <View style={styles.contentLayout}>
                        <Text style={styles.title}>在此输入您的标题。</Text>
                        <Text style={styles.text}>在此处输入您的描述。在此处输入您的描述。在此处输入您的描述。在此处输入您的描述。在此处输入您的描述。在此处输入您的描述。在此处输入您的描述。在此处输入您的描述。在此处输入您的描述。在此处输入您的描述。</Text>
                        <View style={styles.inputBar}>
                            <TextInput
                                value={text}
                                onChangeText={(value) => setText(value)}
                                style={styles.input}
                                placeholder="请输入您的意见。"
                                placeholderTextColor="#888"
                            />
                            <IconButton size={15} iconSource={ICON_AD} style={styles.inputBarIcon} />
                            <IconButton onPress={handleEmoji} size={15} iconSource={ICON_EMOJI} style={styles.inputBarIcon} />
                            <IconButton size={15} iconSource={ICON_COMMENTPOST} style={styles.inputBarIcon} />
                        </View>
                    </View>
                    <View style={[styles.comment, styles.commentLine]}>
                        <IconButton size={42} iconSource={ICON_USER1} enabled={false} style={styles.top} />
                        <View style={styles.commentContent}>
                            <View style={styles.commentHead}>
                                <View style={styles.commentInfo}>
                                    <Text style={styles.commentTitle}>姓  名</Text>
                                    <Text style={styles.commentDate}>2024. 10. 30</Text>
                                </View>
                                <View style={styles.commentFeedback}>
                                    <View style={styles.commentFeedbackItem}>
                                        <IconButton size={12} iconSource={ICON_COMMENT} enabled={false} />
                                        <Text style={styles.commentFeedbackText}>{item.comments}</Text>
                                    </View>
                                    <View style={styles.commentFeedbackItem}>
                                        <IconButton size={12} iconSource={ICON_HEARTFILL} enabled={false} />
                                        <Text style={styles.commentFeedbackText}>{item.likes}</Text>
                                    </View>
                                    <View style={styles.commentFeedbackItem}>
                                        <IconButton size={12} iconSource={ICON_STAR} enabled={false} />
                                        <Text style={styles.commentFeedbackText}>{item.star}</Text>
                                    </View>
                                </View>
                            </View>
                            <Text style={styles.commentText}>请输入您的意见。请输入您的意见。请输入您的意见。请输入您的意见。请输入您的意见。请输入您的意见。</Text>
                            <View style={styles.detail}>
                                <TouchableOpacity style={styles.detailButton}>
                                    <Text style={styles.detailText}>查看回复(95)</Text>
                                    <IconButton size={10} iconSource={ICON_DOWN} enabled={false} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    <View style={[styles.comment, styles.commentLine]}>
                        <IconButton size={42} iconSource={ICON_USER1} enabled={false} style={styles.top} />
                        <View style={styles.commentContent}>
                            <View style={styles.commentHead}>
                                <View style={styles.commentInfo}>
                                    <Text style={styles.commentTitle}>姓  名</Text>
                                    <Text style={styles.commentDate}>2024. 10. 30</Text>
                                </View>
                                <View style={styles.commentFeedback}>
                                    <View style={styles.commentFeedbackItem}>
                                        <IconButton size={12} iconSource={ICON_COMMENT} enabled={false} />
                                        <Text style={styles.commentFeedbackText}>{item.comments}</Text>
                                    </View>
                                    <View style={styles.commentFeedbackItem}>
                                        <IconButton size={12} iconSource={ICON_HEARTFILL} enabled={false} />
                                        <Text style={styles.commentFeedbackText}>{item.likes}</Text>
                                    </View>
                                    <View style={styles.commentFeedbackItem}>
                                        <IconButton size={12} iconSource={ICON_STAR} enabled={false} />
                                        <Text style={styles.commentFeedbackText}>{item.star}</Text>
                                    </View>
                                </View>
                            </View>
                            <Text style={styles.commentText}>请输入您的意见。请输入您的意见。请输入您的意见。请输入您的意见。请输入您的意见。请输入您的意见。</Text>
                            <View style={styles.detail}>
                                <TouchableOpacity style={styles.detailButton}>
                                    <Text style={styles.detailText}>查看回复(95)</Text>
                                    <IconButton size={10} iconSource={ICON_DOWN} enabled={false} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    <View style={[styles.comment]}>
                        <IconButton size={42} iconSource={ICON_USER1} enabled={false} style={styles.top} />
                        <View style={styles.commentContent}>
                            <View style={styles.commentHead}>
                                <View style={styles.commentInfo}>
                                    <Text style={styles.commentTitle}>姓  名</Text>
                                    <Text style={styles.commentDate}>2024. 10. 30</Text>
                                </View>
                                <View style={styles.commentFeedback}>
                                    <View style={styles.commentFeedbackItem}>
                                        <IconButton size={12} iconSource={ICON_COMMENT} enabled={false} />
                                        <Text style={styles.commentFeedbackText}>{item.comments}</Text>
                                    </View>
                                    <View style={styles.commentFeedbackItem}>
                                        <IconButton size={12} iconSource={ICON_HEARTFILL} enabled={false} />
                                        <Text style={styles.commentFeedbackText}>{item.likes}</Text>
                                    </View>
                                    <View style={styles.commentFeedbackItem}>
                                        <IconButton size={12} iconSource={ICON_STAR} enabled={false} />
                                        <Text style={styles.commentFeedbackText}>{item.star}</Text>
                                    </View>
                                </View>
                            </View>
                            <Text style={styles.commentText}>请输入您的意见。请输入您的意见。请输入您的意见。请输入您的意见。请输入您的意见。请输入您的意见。</Text>
                            <View style={styles.detail}>
                                <TouchableOpacity style={styles.detailButton}>
                                    <Text style={styles.detailText}>查看回复(95)</Text>
                                    <IconButton size={10} iconSource={ICON_DOWN} enabled={false} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
                <EmojiPicker onEmojiSelected={handlePick} open={isOpen} onClose={() => setIsOpen(false)} />
                <View style={styles.space}></View>
            </ScrollView>
        </View>
    );
};



const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: 20,
        marginVertical: 10,
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
        margin: BOTTOM_TAPBAR_HEIGHT / 2
    },
    cardLayout: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: -20
    },
    card: {
        width: '70%',
        aspectRatio: 0.63,
        borderRadius: 5,
        overflow: 'hidden',
        marginBottom: 10
    },
    cardImage: {
        width: '100%',
        height: '90%',
        borderRadius: 5,
        marginBottom: 10
    },
    cardFooter: {
        paddingHorizontal: 20,
    },
    info: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    infoItem: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    infoText: {
        color: 'rgba(255, 255, 255, 0.8)',
        fontSize: 13,
        paddingLeft: 10
    },
    contentLayout: {
        marginHorizontal: 10,
        marginTop: 10
    },
    inputBar: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 25,
        backgroundColor: 'white',
        borderRadius: 30,
        paddingHorizontal: 15,
        marginHorizontal: 20,
        marginTop: 15,
        marginBottom: 5
    },
    input: {
        flex: 1,
        fontSize: 13,
        color: '#333',
    },
    inputBarIcon: {
        marginLeft: 5
    },
    title: {
        color: 'rgba(255, 255, 255, 1)',
        fontSize: 15,
        marginBottom: 5
    },
    text: {
        color: 'rgba(255, 255, 255, 0.8)',
        fontSize: 10,
    },
    comment: {
        flexDirection: 'row',
        marginHorizontal: 10,
        paddingVertical: 10
    },
    commentContent: {
        marginLeft: 10,
        width: SCREEN_WIDTH - 135
    },
    commentHead: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: 42,
    },
    commentInfo: {
        paddingVertical: 10,
    },
    commentTitle: {
        color: 'rgba(255, 255, 255, 1)',
        fontSize: 10,
    },
    commentDate: {
        color: 'rgba(186, 186, 186, 1)',
        fontSize: 9,
    },
    commentFeedback: {
        flexDirection: 'row',
        paddingTop: 20
    },
    commentFeedbackItem: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 5
    },
    commentFeedbackText: {
        color: 'rgba(255, 255, 255, 0.8)',
        fontSize: 10,
        paddingLeft: 5
    },
    commentText: {
        color: 'rgba(255, 255, 255, 1)',
        fontSize: 9,
    },
    commentLine: {
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(79, 158, 191, 1)',
    },
    top: {
        top: 0
    },
    detail: {
        flexDirection: 'row',
        marginTop: 5
    },
    detailText: {
        color: 'rgba(171, 171, 171, 1)',
        fontSize: 10,
    },
    detailButton: {
        flexDirection: 'row',
    }
});

export default SearchDetail;