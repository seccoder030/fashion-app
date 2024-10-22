import { useAuth } from '@/components/navigation/Authentication';
import { BOTTOM_TAPBAR_HEIGHT, CHINESE_EMOJI_LANG, DETAILTOP_TAPBAR_HEIGHT, ICON_AD, ICON_AVATAR, ICON_CANCEL, ICON_COMMENT, ICON_COMMENTPOST, ICON_DOWN, ICON_EMOJI, ICON_HEARTFILL, ICON_STAR, ICON_UP, SCREEN_HEIGHT, SCREEN_WIDTH } from '@/constants/Config';
import Request from '@/utils/request';
import React, { useEffect, useRef, useState } from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, TextInput, ToastAndroid, TouchableOpacity, View } from 'react-native';
import EmojiPicker from 'rn-emoji-keyboard';
import IconButton from './IconButton';
import Loading from './Loading';
import Media from './Media';
import TextButton from './TextButton';

interface User {
    id: number;
    name: string;
    avatar: string | null;
}

interface Post {
    id: number;
    title: string;
    content: string;
    type: boolean;
    likes: number;
    favorites: number;
    comments: number;
    created_at: string;
    updated_at: string;
}

interface Comment {
    id: number;
    sender_id: number;
    receiver_id: number;
    post_id: number;
    comment_text: string;
    created_at: string;
    updated_at: string;
    sender_friends_count: number;
    received_comments_count: number;
    sender: User;
    receiver: User;
    post: Post;
}

interface CommentNode extends Comment {
    replies: Comment[];
}

interface DetailProps {
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

const Detail: React.FC<DetailProps> = ({ postId, userId, type, uri, title, content, likesCount, commentsCount, favoCount }) => {
    const { token, user } = useAuth();
    const [comments, setComments] = useState<CommentNode[] | null>(null);
    const [viewDetail, setViewDetail] = useState<boolean[]>([]);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [postText, setPostText] = useState<string>('');
    const [commentText, setCommentText] = useState<string>('');
    const scrollViewRef = useRef<ScrollView>(null);
    const [isReply, setIsReply] = useState<{ index: number, replyindex: number | undefined } | undefined>(undefined);

    const shortNumber = (num: number | undefined) => num ? num > 1000 ? `${Math.floor(num / 100) / 10}K` : `${num}` : 0

    function buildCommentTree(comments: Comment[]): CommentNode[] {
        const commentMap = new Map<number, CommentNode>();
        const rootComments: CommentNode[] = [];

        // First pass: Identify root comments and create CommentNode objects
        comments.forEach(comment => {
            if (!comments.some(c => c.sender_id === comment.receiver_id && c.id < comment.id)) {
                const rootComment: CommentNode = {
                    ...comment,
                    replies: []
                };
                rootComments.push(rootComment);
                commentMap.set(comment.id, rootComment);
            }
        });

        // Second pass: Assign non-root comments as replies
        comments.forEach(comment => {
            if (!commentMap.has(comment.id)) {
                const rootComment = rootComments.find(rc =>
                    rc.id < comment.id && (rc.sender_id === comment.receiver_id || hasDescendantConnection(rc, comment, comments))
                );
                if (rootComment) {
                    rootComment.replies.push(comment);
                } else {
                    // If no root comment is found, treat this as a new root comment
                    const newRootComment: CommentNode = {
                        ...comment,
                        replies: []
                    };
                    rootComments.push(newRootComment);
                    commentMap.set(comment.id, newRootComment);
                }
            }
        });

        // Sort root comments and their replies by creation date
        rootComments.sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());
        rootComments.forEach(rc => {
            rc.replies.sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());
        });

        return rootComments;
    }

    function hasDescendantConnection(rootComment: CommentNode, potentialDescendant: Comment, allComments: Comment[]): boolean {
        let currentId = potentialDescendant.receiver_id;
        while (currentId !== rootComment.sender_id) {
            const parent = allComments.find(c => c.sender_id === currentId && c.id < potentialDescendant.id);
            if (!parent) return false;
            currentId = parent.receiver_id;
        }
        return true;
    }

    useEffect(() => {
        async function fetchData() {
            if (token) {
                try {
                    Request.setAuthorizationToken(token);
                    const res = await Request.Get(`/post/comments/get?post_id=${postId}`);
                    if (res.status === 'success') {
                        const commentTree = buildCommentTree(res.comments);
                        setComments(commentTree);
                    }
                } catch (error) {
                    console.log(error);
                    ToastAndroid.show('API 错误！', ToastAndroid.SHORT);
                }

            }
        }
        fetchData();
    }, []);

    if (!comments) {
        return <Loading backgroundColor={'transparent'} />;
    }

    function handleItem() {
    }

    async function handleCommentPost() {
        if (comments && token && user) {
            try {
                Request.setAuthorizationToken(token);
                const formdata = new FormData();
                formdata.append('sender[id]', user.id);
                formdata.append('post_id', postId);
                if (isReply && commentText.length !== 0) {
                    if (isReply.replyindex !== undefined && comments[isReply.index].replies)
                        formdata.append('receiver[id]', comments[isReply.index].replies && comments[isReply.index].replies[isReply.replyindex].sender_id.toString());
                    else formdata.append('receiver[id]', comments[isReply.index].sender_id.toString());
                    formdata.append('content', commentText);
                }
                else if (postText.length !== 0) {
                    formdata.append('receiver[id]', userId);
                    formdata.append('content', postText);
                }
                const res = await Request.Post(`${process.env.EXPO_PUBLIC_API_URL}/post/comments/save`, formdata, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    }
                });
                if (res.status === 'success') {
                    const commentTree = buildCommentTree(res.comment);
                    setComments(commentTree);
                    setPostText('');
                    setCommentText('');
                    setIsReply(undefined);
                    if (!isReply) {
                        scrollViewRef.current?.scrollToEnd();
                    } else {
                        setViewDetail(prev => {
                            const newViewDetail = [...prev];
                            newViewDetail[isReply.index] = true;
                            return newViewDetail;
                        });
                    }
                }
                ToastAndroid.show(res.msg, ToastAndroid.SHORT);
            } catch (error) {
                console.log(error);
                ToastAndroid.show('您的请求失败', ToastAndroid.SHORT);
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
                                        source={item.sender.avatar ? { uri: item.sender.avatar } : ICON_AVATAR}
                                        style={[
                                            { width: 42, height: 42 },
                                            styles.userImage
                                        ]}
                                    />
                                    <View style={styles.commentContent}>
                                        <View style={styles.commentHead}>
                                            <View style={styles.commentInfo}>
                                                <Text style={styles.commentTitle}>{item.sender.name}</Text>
                                                <Text style={styles.commentDate}>{new Date(item.updated_at).toDateString()}</Text>
                                            </View>
                                            {/* <View style={styles.commentFeedback}>
                                                <View style={styles.commentFeedbackItem}>
                                                    <IconButton size={12} iconSource={ICON_COMMENT} enabled={false} />
                                                    <Text style={styles.commentFeedbackText}>{shortNumber(0)}</Text>
                                                </View>
                                                <View style={styles.commentFeedbackItem}>
                                                    <IconButton size={12} iconSource={ICON_HEARTFILL} enabled={false} />
                                                    <Text style={styles.commentFeedbackText}>{shortNumber(0)}</Text>
                                                </View>
                                                <View style={styles.commentFeedbackItem}>
                                                    <IconButton size={12} iconSource={ICON_STAR} enabled={false} />
                                                    <Text style={styles.commentFeedbackText}>{shortNumber(0)}</Text>
                                                </View>
                                            </View> */}
                                        </View>
                                        <Text style={styles.commentText}>{item.comment_text}</Text>
                                        <View style={{ alignItems: 'flex-end', marginTop: 5, marginHorizontal: 10 }}>
                                            <TextButton onPress={() => handleReply(index)} text='回   复' backgroundColor={'rgba(255, 255, 255, 0)'} textColor={'rgba(171, 171, 171, 1)'} fontSize={10} />
                                        </View>
                                        {viewDetail[index] &&
                                            item.replies && item.replies.map((replyitem, replyindex) => (
                                                <View key={replyindex} style={[styles.reply]}>
                                                    <Image
                                                        source={replyitem.sender.avatar ? { uri: replyitem.sender.avatar } : ICON_AVATAR}
                                                        style={[
                                                            { width: 32, height: 32 },
                                                            styles.userImage
                                                        ]}
                                                    />
                                                    <View style={styles.replyContent}>
                                                        <View style={styles.replyHead}>
                                                            <View style={styles.replyInfo}>
                                                                <Text style={styles.replyTitle}>{replyitem.sender.name}{` ▶ ${replyitem.receiver.name}`}</Text>
                                                            </View>
                                                            {/* <View style={styles.replyFeedback}>
                                                                <View style={styles.replyFeedbackItem}>
                                                                    <IconButton size={12} iconSource={ICON_COMMENT} enabled={false} />
                                                                    <Text style={styles.replyFeedbackText}>{shortNumber(0)}</Text>
                                                                </View>
                                                                <View style={styles.replyFeedbackItem}>
                                                                    <IconButton size={12} iconSource={ICON_HEARTFILL} enabled={false} />
                                                                    <Text style={styles.replyFeedbackText}>{shortNumber(0)}</Text>
                                                                </View>
                                                                <View style={styles.replyFeedbackItem}>
                                                                    <IconButton size={12} iconSource={ICON_STAR} enabled={false} />
                                                                    <Text style={styles.replyFeedbackText}>{shortNumber(0)}</Text>
                                                                </View>
                                                            </View> */}
                                                        </View>
                                                        <Text style={styles.replyText}>{replyitem.comment_text}</Text>
                                                        <View style={{ alignItems: 'flex-end', marginTop: 5, marginHorizontal: 10 }}>
                                                            <TextButton onPress={() => handleReply(index, replyindex)} text='回   复' backgroundColor={'rgba(255, 255, 255, 0)'} textColor={'rgba(171, 171, 171, 1)'} fontSize={10} />
                                                        </View>
                                                    </View>
                                                </View>
                                            ))
                                        }
                                        {item.replies.length > 0 &&
                                            <View style={styles.detail}>
                                                <TouchableOpacity onPress={() => toggleViewDetail(index)} style={styles.detailButton}>
                                                    {viewDetail[index] ?
                                                        <>
                                                            <Text style={styles.detailText}>查看回复({item.replies.length})</Text>
                                                            <IconButton size={10} iconSource={ICON_UP} enabled={false} />
                                                        </> :
                                                        <>
                                                            <Text style={styles.detailText}>查看回复({item.replies.length})</Text>
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
                                source={comments[isReply.index].sender.avatar ? { uri: comments[isReply.index].sender.avatar } : ICON_AVATAR}
                                style={[
                                    { width: 42, height: 42 },
                                    styles.userImage
                                ]}
                            />
                            {isReply.replyindex === undefined ?
                                <View style={styles.commentContent}>
                                    <View style={styles.commentHead}>
                                        <View style={styles.commentInfo}>
                                            <Text style={styles.commentTitle}>{comments[isReply.index].sender.name}</Text>
                                            <Text style={styles.commentDate}>{new Date(comments[isReply.index].updated_at).toDateString()}</Text>
                                        </View>
                                    </View>
                                    <Text style={styles.commentText}>{comments[isReply.index].comment_text}</Text>
                                </View> :
                                comments[isReply.index].replies &&
                                <View style={styles.commentContent}>
                                    <View style={styles.commentHead}>
                                        <View style={styles.commentInfo}>
                                            <Text style={styles.commentTitle}>{comments[isReply.index].replies[isReply.replyindex].sender.name}</Text>
                                            <Text style={styles.commentDate}>{new Date(comments[isReply.index].replies[isReply.replyindex].updated_at).toDateString()}</Text>
                                        </View>
                                    </View>
                                    <Text style={styles.commentText}>{comments[isReply.index].replies[isReply.replyindex].comment_text}</Text>
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
        padding: 10,
        minHeight: SCREEN_HEIGHT - DETAILTOP_TAPBAR_HEIGHT - BOTTOM_TAPBAR_HEIGHT - 20
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