import { BOTTOM_TAPBAR_HEIGHT, CHINESE_EMOJI_LANG, DETAILTOP_TAPBAR_HEIGHT, ICON_AD, ICON_AVATAR, ICON_CANCEL, ICON_COMMENT, ICON_COMMENTPOST, ICON_DOWN, ICON_EMOJI, ICON_HEARTFILL, ICON_STAR, ICON_UP, IMAGE_BG7, SCREEN_HEIGHT, SCREEN_WIDTH } from '@/constants/Config';
import React, { useEffect, useRef, useState } from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import EmojiPicker from 'rn-emoji-keyboard';
import IconButton from './IconButton';
import TextButton from './TextButton';
import Blank from './Blank';
import { useAuth } from '@/context/Authentication';

const item = { id: '1', imageUrl: IMAGE_BG7, caption: '在此输入您的标题。', likes: 578, comments: 1208, star: 1031 };
const jsondata: IComment[] = [
    { id: '1', name: '姓  名111', uri: 'https://johnyanderson-portfolio.onrender.com/assets/images/logo/logo.png', date: '2024. 10. 30', comments: 221, likes: 1141, star: 1249, post: '请输入您的意见。请输入您的意见。请输入您的意见。请输入您的意见。请输入您的意见。请输入您的意见。' },
    { id: '2', name: '姓  名1', uri: 'https://johnyanderson-portfolio.onrender.com/assets/images/logo/logo.png', date: '2024. 10. 30', comments: 221, likes: 1141, star: 1249, post: '请输入您的意见。请输入您的意见。请输入您的意见。请输入您的意见。请输入您的意见。请输入您的意见。', replyTo: '1' },
    { id: '3', name: '姓  名2', uri: 'https://johnyanderson-portfolio.onrender.com/assets/images/logo/logo.png', date: '2024. 10. 30', comments: 221, likes: 1141, star: 1249, post: '请输入您的意见。请输入您的意见。请输入您的意见。请输入您的意见。请输入您的意见。请输入您的意见。', replyTo: '1' },
    { id: '4', name: '姓  名3', uri: 'https://johnyanderson-portfolio.onrender.com/assets/images/logo/logo.png', date: '2024. 10. 30', comments: 221, likes: 1141, star: 1249, post: '请输入您的意见。请输入您的意见。请输入您的意见。请输入您的意见。请输入您的意见。请输入您的意见。', replyTo: '1' },
    { id: '5', name: '姓  名4', uri: 'https://johnyanderson-portfolio.onrender.com/assets/images/logo/logo.png', date: '2024. 10. 30', comments: 221, likes: 1141, star: 1249, post: '请输入您的意见。请输入您的意见。请输入您的意见。请输入您的意见。请输入您的意见。请输入您的意见。', replyTo: '2' },
    { id: '6', name: '姓  名5', uri: 'https://johnyanderson-portfolio.onrender.com/assets/images/logo/logo.png', date: '2024. 10. 30', comments: 221, likes: 1141, star: 1249, post: '请输入您的意见。请输入您的意见。请输入您的意见。请输入您的意见。请输入您的意见。请输入您的意见。', replyTo: '3' },
    { id: '7', name: '姓  名222', uri: 'https://johnyanderson-portfolio.onrender.com/assets/images/logo/logo.png', date: '2024. 10. 30', comments: 221, likes: 1141, star: 1249, post: '请输入您的意见。请输入您的意见。请输入您的意见。请输入您的意见。请输入您的意见。请输入您的意见。', replyTo: '2' },
    { id: '8', name: '姓  名21', uri: 'https://johnyanderson-portfolio.onrender.com/assets/images/logo/logo.png', date: '2024. 10. 30', comments: 221, likes: 1141, star: 1249, post: '请输入您的意见。请输入您的意见。请输入您的意见。请输入您的意见。请输入您的意见。请输入您的意见。' },
    { id: '9', name: '姓  名22', uri: 'https://johnyanderson-portfolio.onrender.com/assets/images/logo/logo.png', date: '2024. 10. 30', comments: 221, likes: 1141, star: 1249, post: '请输入您的意见。请输入您的意见。请输入您的意见。请输入您的意见。请输入您的意见。请输入您的意见。', replyTo: '8' },
    { id: '10', name: '姓  名23', uri: 'https://johnyanderson-portfolio.onrender.com/assets/images/logo/logo.png', date: '2024. 10. 30', comments: 221, likes: 1141, star: 1249, post: '请输入您的意见。请输入您的意见。请输入您的意见。请输入您的意见。请输入您的意见。请输入您的意见。', replyTo: '8' },
    { id: '11', name: '姓  名24', uri: 'https://johnyanderson-portfolio.onrender.com/assets/images/logo/logo.png', date: '2024. 10. 30', comments: 0, likes: 0, star: 0, post: '请输入您的意见。请输入您的意见。请输入您的意见。请输入您的意见。请输入您的意见。请输入您的意见。' },
    { id: '12', name: '姓  名25', uri: 'https://johnyanderson-portfolio.onrender.com/assets/images/logo/logo.png', date: '2024. 10. 30', comments: 0, likes: 0, star: 0, post: '请输入您的意见。请输入您的意见。请输入您的意见。请输入您的意见。请输入您的意见。请输入您的意见。', replyTo: '9' },
];

const Detail = () => {
    const { token, user } = useAuth();
    const [comments, setComments] = useState<IComment[] | null>(null);
    const [viewDetail, setViewDetail] = useState<boolean[]>([]);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [postText, setPostText] = useState<string>('');
    const [commentText, setCommentText] = useState<string>('');
    const scrollViewRef = useRef<ScrollView>(null);
    const [isReply, setIsReply] = useState<{ index: number, replyindex: number | undefined } | undefined>(undefined);

    function processComments(jsondata: IComment[]): IComment[] {
        const commentMap: { [key: string]: IComment } = {};
        const posts: IComment[] = [];

        // First pass: create a map of all comments and identify posts
        jsondata.forEach(item => {
            commentMap[item.id] = { ...item, replys: [] };
            if (!item.replyTo) {
                posts.push(commentMap[item.id]);
            }
        });

        // Function to find the root post of a comment
        function findRootPost(comment: IComment): IComment {
            if (!comment.replyTo) return comment;
            return findRootPost(commentMap[comment.replyTo]);
        }

        // Second pass: organize replies
        jsondata.forEach(item => {
            if (item.replyTo) {
                const rootPost = findRootPost(item);
                if (!rootPost.replys) {
                    rootPost.replys = [];
                }
                rootPost.replys.push(commentMap[item.id]);

                // Also add to direct parent's replys if it exists
                const parent = commentMap[item.replyTo];
                if (parent && parent !== rootPost) {
                    if (!parent.replys) {
                        parent.replys = [];
                    }
                    parent.replys.push(commentMap[item.id]);
                }
            }
        });

        // Function to recursively sort replies
        function sortReplies(comment: IComment) {
            if (comment.replys && comment.replys.length > 0) {
                comment.replys.sort((a, b) => parseInt(a.id) - parseInt(b.id));
                comment.replys.forEach(sortReplies);
            }
        }

        // Sort posts and their replies
        posts.sort((a, b) => parseInt(a.id) - parseInt(b.id));
        posts.forEach(sortReplies);

        return posts;
    }

    useEffect(() => {
        const posts = processComments(jsondata);
        setComments(posts)
    }, []);

    if (!comments) {
        return <Blank />
    }

    // New function to get a comment by ID
    function getCommentById(id: string): IComment | undefined {
        if (comments) {
            // First, check if the ID matches any top-level post
            const post = comments.find(comment => comment.id === id);
            if (post) return post;

            // If not found in top-level posts, search in replies
            for (const comment of comments) {
                if (comment.replys) {
                    const foundInReplies = searchInReplies(comment.replys, id);
                    if (foundInReplies) return foundInReplies;
                }
            }
        }

        return undefined;
    }

    // Helper function to search for a comment in replies
    function searchInReplies(replies: IComment[], id: string): IComment | undefined {
        for (const reply of replies) {
            if (reply.id === id) return reply;
            if (reply.replys) {
                const foundInNestedReplies = searchInReplies(reply.replys, id);
                if (foundInNestedReplies) return foundInNestedReplies;
            }
        }
        return undefined;
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
                                                                    <Text style={styles.replyFeedbackText}>{replyitem.comments}</Text>
                                                                </View>
                                                                <View style={styles.replyFeedbackItem}>
                                                                    <IconButton size={12} iconSource={ICON_HEARTFILL} enabled={false} />
                                                                    <Text style={styles.replyFeedbackText}>{replyitem.likes}</Text>
                                                                </View>
                                                                <View style={styles.replyFeedbackItem}>
                                                                    <IconButton size={12} iconSource={ICON_STAR} enabled={false} />
                                                                    <Text style={styles.replyFeedbackText}>{replyitem.star}</Text>
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
                                                <Text style={styles.commentFeedbackText}>{comments[isReply.index].comments}</Text>
                                            </View>
                                            <View style={styles.commentFeedbackItem}>
                                                <IconButton size={12} iconSource={ICON_HEARTFILL} enabled={false} />
                                                <Text style={styles.commentFeedbackText}>{comments[isReply.index].likes}</Text>
                                            </View>
                                            <View style={styles.commentFeedbackItem}>
                                                <IconButton size={12} iconSource={ICON_STAR} enabled={false} />
                                                <Text style={styles.commentFeedbackText}>{comments[isReply.index].star}</Text>
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
                                                <Text style={styles.commentFeedbackText}>{comments[isReply.index].replys![isReply.replyindex].comments}</Text>
                                            </View>
                                            <View style={styles.commentFeedbackItem}>
                                                <IconButton size={12} iconSource={ICON_HEARTFILL} enabled={false} />
                                                <Text style={styles.commentFeedbackText}>{comments[isReply.index].replys![isReply.replyindex].likes}</Text>
                                            </View>
                                            <View style={styles.commentFeedbackItem}>
                                                <IconButton size={12} iconSource={ICON_STAR} enabled={false} />
                                                <Text style={styles.commentFeedbackText}>{comments[isReply.index].replys![isReply.replyindex].star}</Text>
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