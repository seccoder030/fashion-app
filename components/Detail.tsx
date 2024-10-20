import { BOTTOM_TAPBAR_HEIGHT, CHINESE_EMOJI_LANG, DETAILTOP_TAPBAR_HEIGHT, ICON_AD, ICON_AVATAR, ICON_CANCEL, ICON_COMMENT, ICON_COMMENTPOST, ICON_DOWN, ICON_EMOJI, ICON_HEARTFILL, ICON_STAR, ICON_UP, IMAGE_BG7, SCREEN_HEIGHT, SCREEN_WIDTH } from '@/constants/Config';
import React, { useEffect, useRef, useState } from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, TextInput, ToastAndroid, TouchableOpacity, View } from 'react-native';
import EmojiPicker from 'rn-emoji-keyboard';
import IconButton from './IconButton';
import TextButton from './TextButton';
import Blank from './Blank';
import { useAuth } from '@/components/navigation/Authentication';
import Media from './Media';
import Request from '@/utils/request';

interface DetailParams {
    postId: string;
    userId: string;
    type: boolean;
    uri: string | undefined;
    title: string;
    content: string;
    likesCount?: number;
    commentsCount?: number;
    favoCount?: number;
};

const Detail: React.FC<DetailParams> = ({ postId, userId, type, uri, title, content, likesCount, commentsCount, favoCount }) => {
    const { token, user } = useAuth();
    const [comments, setComments] = useState<IComment[] | null>(null);
    const [viewDetail, setViewDetail] = useState<boolean[]>([]);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [postText, setPostText] = useState<string>('');
    const [commentText, setCommentText] = useState<string>('');
    const scrollViewRef = useRef<ScrollView>(null);
    const [isReply, setIsReply] = useState<{ index: number, replyindex: number | undefined } | undefined>(undefined);

    const shortNumber = (num: number | undefined) => num ? num > 1000 ? `${Math.floor(num / 100) / 10}K` : `${num}` : 0

    useEffect(() => {
        async function fetchData() {
            if (token) {
                try {
                    Request.setAuthorizationToken(token);
                    const res = await Request.Get(`/post/comments/get?post_id=${postId}`);
                    if (res.status === 'success') { }
                } catch (error) {
                    console.log(error);
                    ToastAndroid.show('API 错误！', ToastAndroid.SHORT);
                }

            }
        }
        fetchData();
    }, []);

    if (!comments) {
        return <Blank />
    }

    function handleItem() {
    }

    function handleCommentPost() {
        if (comments && token && user) {
            var post: IComment;
            if (isReply) {
                if (commentText.length === 0) return;
                var id = "0";
                post = { id: id, name: user.name, uri: user.avatar, date: new Date().toISOString(), comments: 0, likes: 0, star: 0, post: commentText, replyTo: isReply.replyindex && comments[isReply.index]?.replys?.[isReply.replyindex]?.id || undefined };
                setViewDetail(prev => {
                    const newViewDetail = [...prev];
                    newViewDetail[isReply.index] = true;
                    return newViewDetail;
                });
                const updatedComments = comments.map((comment, index) => {
                    if (index === isReply.index) {
                        return {
                            ...comment,
                            replys: [...(comment.replys || []), post]
                        };
                    }
                    return comment;
                });
                setComments(updatedComments);
                setIsReply(undefined);
            } else {
                if (postText.length === 0) return;
                var id = "0";
                post = { id: id, name: user.name, uri: user.avatar, date: new Date().toISOString(), comments: 0, likes: 0, star: 0, post: postText, replyTo: undefined };
                setComments([...comments, post]);
                setPostText('');
                scrollViewRef.current?.scrollToEnd();
            }
        }
    }

    function handleAd() {
        if (isReply) setCommentText(commentText + '@');
        else setPostText(postText + '@');
    }

    function handleEmoji() {
        if (isOpen) setIsOpen(false);
        else setIsOpen(true);
    }

    function handlePick(emoji: any) {
        if (isReply) setCommentText(commentText + emoji.emoji);
        else setPostText(postText + emoji.emoji);
    }

    const toggleViewDetail = (index: number) => {
        setViewDetail(prev => {
            const newViewDetail = [...prev];
            newViewDetail[index] = !newViewDetail[index];
            return newViewDetail;
        });
    };

    const handleReply = (index: number, replyindex?: number) => {
        setCommentText('');
        setIsReply({ index: index, replyindex: replyindex });
    };

    return (
        <>
            <View style={styles.container}>
                <View>
                    <ScrollView ref={scrollViewRef} contentContainerStyle={styles.contentContainer} showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
                        <View style={styles.border}>
                            <View style={styles.cardLayout}>
                                <Pressable onPress={handleItem} style={styles.card}>
                                    <View style={styles.cardImage}>
                                        <Media type={type} source={{ uri: uri }} backgroundColor={'transparent'} play={true} resizeMode={1} />
                                    </View>
                                    <View style={styles.cardFooter}>
                                        <View style={styles.info}>
                                            <View style={styles.infoItem}>
                                                <IconButton size={15} iconSource={ICON_COMMENT} enabled={false} />
                                                <Text style={styles.infoText}>{shortNumber(commentsCount)}</Text>
                                            </View>
                                            <View style={styles.infoItem}>
                                                <IconButton size={15} iconSource={ICON_HEARTFILL} enabled={false} />
                                                <Text style={styles.infoText}>{shortNumber(likesCount)}</Text>
                                            </View>
                                            <View style={styles.infoItem}>
                                                <IconButton size={15} iconSource={ICON_STAR} enabled={false} />
                                                <Text style={styles.infoText}>{shortNumber(favoCount)}</Text>
                                            </View>
                                        </View>
                                    </View>
                                </Pressable >
                            </View>
                            <View style={styles.contentLayout}>
                                <Text style={styles.title}>{title}</Text>
                                <Text style={styles.text}>{content}</Text>
                                <View style={styles.inputBar}>
                                    <TextInput
                                        value={postText}
                                        onChangeText={(value) => setPostText(value)}
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
                                    <View style={{ justifyContent: 'flex-end', paddingBottom: 5 }}>
                                        <IconButton onPress={handleCommentPost} size={15} iconSource={ICON_COMMENTPOST} style={styles.inputBarIcon} />
                                    </View>
                                </View>
                            </View>
                            {comments.map((item, index) => (
                                <View key={index} style={index == 0 ? styles.comment : [styles.comment, styles.commentLine]}>
                                    <Image
                                        source={item.uri ? { uri: item.uri } : ICON_AVATAR}
                                        style={[
                                            { width: 42, height: 42 },
                                            styles.userImage
                                        ]}
                                    />
                                    <View style={styles.commentContent}>
                                        <View style={styles.commentHead}>
                                            <View style={styles.commentInfo}>
                                                <Text style={styles.commentTitle}>{item.name}</Text>
                                                <Text style={styles.commentDate}>{item.date}</Text>
                                            </View>
                                            <View style={styles.commentFeedback}>
                                                <View style={styles.commentFeedbackItem}>
                                                    <IconButton size={12} iconSource={ICON_COMMENT} enabled={false} />
                                                    <Text style={styles.commentFeedbackText}>{shortNumber(item.comments)}</Text>
                                                </View>
                                                <View style={styles.commentFeedbackItem}>
                                                    <IconButton size={12} iconSource={ICON_HEARTFILL} enabled={false} />
                                                    <Text style={styles.commentFeedbackText}>{shortNumber(item.likes)}</Text>
                                                </View>
                                                <View style={styles.commentFeedbackItem}>
                                                    <IconButton size={12} iconSource={ICON_STAR} enabled={false} />
                                                    <Text style={styles.commentFeedbackText}>{shortNumber(item.star)}</Text>
                                                </View>
                                            </View>
                                        </View>
                                        <Text style={styles.commentText}>{item.post}</Text>
                                        <View style={{ alignItems: 'flex-end', marginTop: 5, marginHorizontal: 10 }}>
                                            <TextButton onPress={() => handleReply(index)} text='回   复' backgroundColor={'rgba(255, 255, 255, 0)'} textColor={'rgba(171, 171, 171, 1)'} fontSize={10} />
                                        </View>
                                        {viewDetail[index] &&
                                            item.replys && item.replys.map((replyitem, replyindex) => (
                                                <View key={replyindex} style={[styles.reply]}>
                                                    <Image
                                                        source={replyitem.uri ? { uri: replyitem.uri } : ICON_AVATAR}
                                                        style={[
                                                            { width: 32, height: 32 },
                                                            styles.userImage
                                                        ]}
                                                    />
                                                    <View style={styles.replyContent}>
                                                        <View style={styles.replyHead}>
                                                            <View style={styles.replyInfo}>
                                                                <Text style={styles.replyTitle}>{replyitem.name}{replyitem.replyTo && ` ▶ ${getCommentById(replyitem.replyTo)?.name}`}</Text>
                                                            </View>
                                                            <View style={styles.replyFeedback}>
                                                                <View style={styles.replyFeedbackItem}>
                                                                    <IconButton size={12} iconSource={ICON_COMMENT} enabled={false} />
                                                                    <Text style={styles.replyFeedbackText}>{shortNumber(replyitem.comments)}</Text>
                                                                </View>
                                                                <View style={styles.replyFeedbackItem}>
                                                                    <IconButton size={12} iconSource={ICON_HEARTFILL} enabled={false} />
                                                                    <Text style={styles.replyFeedbackText}>{shortNumber(replyitem.likes)}</Text>
                                                                </View>
                                                                <View style={styles.replyFeedbackItem}>
                                                                    <IconButton size={12} iconSource={ICON_STAR} enabled={false} />
                                                                    <Text style={styles.replyFeedbackText}>{shortNumber(replyitem.star)}</Text>
                                                                </View>
                                                            </View>
                                                        </View>
                                                        <Text style={styles.replyText}>{replyitem.post}</Text>
                                                        <View style={{ alignItems: 'flex-end', marginTop: 5, marginHorizontal: 10 }}>
                                                            <TextButton onPress={() => handleReply(index, replyindex)} text='回   复' backgroundColor={'rgba(255, 255, 255, 0)'} textColor={'rgba(171, 171, 171, 1)'} fontSize={10} />
                                                        </View>
                                                    </View>
                                                </View>
                                            ))
                                        }
                                        {item.replys && item.replys.length > 0 &&
                                            <View style={styles.detail}>
                                                <TouchableOpacity onPress={() => toggleViewDetail(index)} style={styles.detailButton}>
                                                    {viewDetail[index] ?
                                                        <>
                                                            <Text style={styles.detailText}>查看回复({item.replys.length})</Text>
                                                            <IconButton size={10} iconSource={ICON_UP} enabled={false} />
                                                        </> :
                                                        <>
                                                            <Text style={styles.detailText}>查看回复({item.replys.length})</Text>
                                                            <IconButton size={10} iconSource={ICON_DOWN} enabled={false} />
                                                        </>
                                                    }
                                                </TouchableOpacity>
                                            </View>}
                                    </View>
                                </View>
                            ))}
                        </View>
                    </ScrollView >
                </View>
            </View >
            {isReply &&
                (<View style={styles.replyInputContainer}>
                    <View style={styles.replyBorder}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 20 }}>
                            <View style={{ width: 25 }}></View>
                            <View style={{ alignItems: 'center' }}>
                                <Text style={styles.title}>邮           政</Text>
                            </View>
                            <IconButton onPress={() => setIsReply(undefined)} size={25} iconSource={ICON_CANCEL} />
                        </View>
                        <View style={styles.comment}>
                            <Image
                                source={comments[isReply.index].uri ? { uri: comments[isReply.index].uri } : ICON_AVATAR}
                                style={[
                                    { width: 42, height: 42 },
                                    styles.userImage
                                ]}
                            />
                            {isReply.replyindex === undefined ?
                                <View style={styles.commentContent}>
                                    <View style={styles.commentHead}>
                                        <View style={styles.commentInfo}>
                                            <Text style={styles.commentTitle}>{comments[isReply.index].name}</Text>
                                            <Text style={styles.commentDate}>{comments[isReply.index].date}</Text>
                                        </View>
                                        <View style={styles.commentFeedback}>
                                            <View style={styles.commentFeedbackItem}>
                                                <IconButton size={12} iconSource={ICON_COMMENT} enabled={false} />
                                                <Text style={styles.commentFeedbackText}>{shortNumber(comments[isReply.index].comments)}</Text>
                                            </View>
                                            <View style={styles.commentFeedbackItem}>
                                                <IconButton size={12} iconSource={ICON_HEARTFILL} enabled={false} />
                                                <Text style={styles.commentFeedbackText}>{shortNumber(comments[isReply.index].likes)}</Text>
                                            </View>
                                            <View style={styles.commentFeedbackItem}>
                                                <IconButton size={12} iconSource={ICON_STAR} enabled={false} />
                                                <Text style={styles.commentFeedbackText}>{shortNumber(comments[isReply.index].star)}</Text>
                                            </View>
                                        </View>
                                    </View>
                                    <Text style={styles.commentText}>{comments[isReply.index].post}</Text>
                                </View> :
                                comments[isReply.index].replys &&
                                <View style={styles.commentContent}>
                                    <View style={styles.commentHead}>
                                        <View style={styles.commentInfo}>
                                            <Text style={styles.commentTitle}>{comments[isReply.index].replys![isReply.replyindex].name}</Text>
                                            <Text style={styles.commentDate}>{comments[isReply.index].replys![isReply.replyindex].date}</Text>
                                        </View>
                                        <View style={styles.commentFeedback}>
                                            <View style={styles.commentFeedbackItem}>
                                                <IconButton size={12} iconSource={ICON_COMMENT} enabled={false} />
                                                <Text style={styles.commentFeedbackText}>{shortNumber(comments[isReply.index].replys![isReply.replyindex].comments)}</Text>
                                            </View>
                                            <View style={styles.commentFeedbackItem}>
                                                <IconButton size={12} iconSource={ICON_HEARTFILL} enabled={false} />
                                                <Text style={styles.commentFeedbackText}>{shortNumber(comments[isReply.index].replys![isReply.replyindex].likes)}</Text>
                                            </View>
                                            <View style={styles.commentFeedbackItem}>
                                                <IconButton size={12} iconSource={ICON_STAR} enabled={false} />
                                                <Text style={styles.commentFeedbackText}>{shortNumber(comments[isReply.index].replys![isReply.replyindex].star)}</Text>
                                            </View>
                                        </View>
                                    </View>
                                    <Text style={styles.commentText}>{comments[isReply.index].replys![isReply.replyindex].post}</Text>
                                </View>
                            }
                        </View>
                        <View style={styles.contentLayout}>
                            <View style={styles.inputBar}>
                                <TextInput
                                    value={commentText}
                                    onChangeText={(value) => setCommentText(value)}
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
                                <View style={{ justifyContent: 'flex-end', paddingBottom: 5 }}>
                                    <IconButton onPress={handleCommentPost} size={15} iconSource={ICON_COMMENTPOST} style={styles.inputBarIcon} />
                                </View>
                            </View>
                        </View>
                    </View>
                </View>)
            }
            <EmojiPicker onEmojiSelected={handlePick} open={isOpen} onClose={() => setIsOpen(false)} translation={CHINESE_EMOJI_LANG} />
        </>
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
    cardLayout: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: -20
    },
    card: {
        width: '70%',
        aspectRatio: 0.63,
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
        backgroundColor: 'white',
        width: SCREEN_WIDTH - 120,
        borderRadius: 10,
        paddingHorizontal: 15,
        marginHorizontal: 20,
        marginTop: 15,
        marginBottom: 5
    },
    input: {
        flex: 1,
        fontSize: 13,
        color: '#333',
        maxHeight: 100
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
        borderTopWidth: 1,
        borderTopColor: 'rgba(79, 158, 191, 1)',
    },
    userImage: {
        top: 0,
        borderRadius: 42,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.7)',
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
    },
    reply: {
        flexDirection: 'row',
        paddingVertical: 10
    },
    replyContent: {
        marginLeft: 10,
        width: SCREEN_WIDTH - 135 - 42
    },
    replyHead: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: 32,
    },
    replyInfo: {
        paddingVertical: 10,
    },
    replyTitle: {
        color: 'rgba(255, 255, 255, 1)',
        fontSize: 10,
    },
    replyDate: {
        color: 'rgba(186, 186, 186, 1)',
        fontSize: 9,
    },
    replyFeedback: {
        flexDirection: 'row',
        paddingTop: 5
    },
    replyFeedbackItem: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 5
    },
    replyFeedbackText: {
        color: 'rgba(255, 255, 255, 0.8)',
        fontSize: 10,
        paddingLeft: 5
    },
    replyText: {
        color: 'rgba(255, 255, 255, 1)',
        fontSize: 9,
    },
    replyInputContainer: {
        position: 'absolute',
        justifyContent: 'flex-end',
        alignItems: 'center',
        top: DETAILTOP_TAPBAR_HEIGHT,
        width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT - DETAILTOP_TAPBAR_HEIGHT - BOTTOM_TAPBAR_HEIGHT - 10
    },
    replyBorder: {
        backgroundColor: 'rgba(64, 39, 117, 1)',
        borderRadius: 20,
        borderColor: 'rgba(255, 255, 255, 1)',
        borderWidth: 1,
        paddingVertical: 20,
        marginBottom: 10
    }
});

export default Detail;