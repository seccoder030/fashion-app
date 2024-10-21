import Blank from '@/components/Blank';
import CategoryView from '@/components/CategoryView';
import IconButton from '@/components/IconButton';
import Loading from '@/components/Loading';
import { useAuth } from '@/components/navigation/Authentication';
import TextButton from '@/components/TextButton';
import { BACKGROUND_COLOR, ICON_BACK, SCREEN_HEIGHT, SCREEN_WIDTH } from '@/constants/Config';
import Request from '@/utils/request';
import { ResizeMode, Video } from 'expo-av';
import * as FileSystem from 'expo-file-system';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Image, SafeAreaView, StatusBar, StyleSheet, Text, TextInput, ToastAndroid, View } from 'react-native';

type PostScreenParams = {
    type: string;
    uri: string;
};

const PostScreen = () => {
    const { type, uri } = useLocalSearchParams<PostScreenParams>();
    const { token, user } = useAuth();
    const [title, setTitle] = useState<string>('');
    const [content, setContent] = useState<string>('');
    const [categories, setCategories] = useState<ICategory[] | null>(null);
    const [checkedCategories, setCheckedCategories] = useState<Set<string>>(new Set());

    useEffect(() => {
        async function fetchData() {
            if (token) {
                try {
                    Request.setAuthorizationToken(token);
                    const res = await Request.Get('/category');
                    if (res.status) setCategories(res.data);
                } catch (error) {
                    console.error('Error fetching categories:', error);
                }
            }
        }
        fetchData();
    }, []);

    if (!categories) {
        return (
            <SafeAreaView style={styles.container}>
                <StatusBar barStyle="light-content" />
                <View style={styles.viewColor}>
                    <Loading backgroundColor={'transparent'} />
                </View>
            </SafeAreaView>
        );
    }

    if (categories.length === 0) {
        return (
            <SafeAreaView style={styles.container}>
                <StatusBar barStyle="light-content" />
                <View style={styles.viewColor}>
                    <Blank />
                </View>
            </SafeAreaView>
        );
    }

    async function handlePost() {
        try {
            if (categories && token && user) {
                // Create a FormData object
                const formData = new FormData();

                // Append the file
                const fileInfo = await FileSystem.getInfoAsync(uri);
                if (fileInfo.exists) {
                    const fileExtension = uri.split('.').pop();
                    const fileName = `file.${fileExtension}`;

                    formData.append('files', {
                        uri: uri,
                        name: fileName,
                        type: `${type}/${fileExtension}`
                    } as any);

                    // Append other data
                    formData.append('title', title);
                    formData.append('content', content);
                    var data = Array();
                    checkedCategories.forEach(item => {
                        data.push(item);
                    });
                    formData.append('category_id', data.toString());

                    try {
                        Request.setAuthorizationToken(token);
                        const res = await Request.Post(`${process.env.EXPO_PUBLIC_API_URL}/post/create`, formData, {
                            headers: {
                                'Content-Type': 'multipart/form-data',
                            },
                        });

                        ToastAndroid.show(res.msg, ToastAndroid.SHORT);
                        console.log(res.msg)
                        if (res.status === 'success') {
                            router.back();
                        }
                    } catch (error) {
                        console.error('Error fetching categories:', error);
                    }
                }
            }
        } catch (error) {
            console.log(error);
            ToastAndroid.show('认证错误!', ToastAndroid.SHORT);
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="light-content" />
            <View style={styles.viewColor}>
                <View style={styles.topBar}>
                    <IconButton onPress={() => router.back()} size={25} iconSource={ICON_BACK} />
                </View>
                <View style={styles.content}>
                    <View style={styles.mediaContainer}>
                        {type === "video" ?
                            <Video
                                source={{ uri: uri }}
                                useNativeControls={false}
                                shouldPlay
                                isLooping={true}
                                isMuted={true}
                                resizeMode={ResizeMode.CONTAIN}
                                style={{ width: '100%', height: '100%' }}
                                onError={(error) => {
                                    console.error('Video loading error:', error);
                                }}

                            /> :
                            (type == "image" ?
                                <Image
                                    source={{ uri: uri }}
                                    style={{ width: '100%', height: '100%', resizeMode: 'contain' }}
                                    onError={(error) => {
                                        console.error('Video loading error:', error);
                                    }}
                                /> :
                                <Text style={{ color: 'rgba(255, 255, 255, 1)', fontSize: 15 }}>文件无法播放</Text>
                            )
                        }
                    </View>
                    <View style={styles.post}>
                        <View style={styles.postItem}>
                            <Text style={styles.postTitle}>标         题:</Text>
                            <View style={styles.postTextContainer}>
                                <TextInput
                                    value={title}
                                    onChangeText={(value) => setTitle(value)}
                                    style={styles.postText}
                                    placeholder="请输入标题。"
                                    placeholderTextColor="rgba(255, 255, 255, 0.5)"
                                    textAlignVertical='top'
                                />
                            </View>
                        </View>
                    </View>
                    <View style={styles.post}>
                        <View style={styles.postItem}>
                            <Text style={styles.postTitle}>内         容:</Text>
                            <View style={styles.postTextContainer}>
                                <TextInput
                                    value={content}
                                    onChangeText={(value) => setContent(value)}
                                    style={[styles.postText, { height: 100 }]}
                                    placeholder="请输入内容。"
                                    placeholderTextColor="rgba(255, 255, 255, 0.5)"
                                    multiline={true}
                                    numberOfLines={5}
                                    textAlignVertical='top'
                                />
                            </View>
                        </View>
                    </View>
                    <View style={styles.post}>
                        <View style={styles.postItem}>
                            <Text style={styles.postTitle}>内         容:</Text>
                        </View>
                    </View>
                    <CategoryView categories={categories} checkedCategories={checkedCategories} setCheckedCategories={setCheckedCategories} height={150} />
                    <View style={styles.postButton}>
                        <TextButton onPress={handlePost} text='帖       子' backgroundColor={'rgba(255, 0, 153, 1)'} borderRadius={10} paddingHorizontal={35} paddingVertical={5} fontSize={25} />
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    viewColor: {
        flex: 1,
        backgroundColor: BACKGROUND_COLOR
    },
    topBar: {
        flexDirection: 'row',
        marginHorizontal: 20,
        marginTop: 50,
        marginBottom: 20
    },
    content: {
        flex: 1,
        marginHorizontal: 30
    },
    mediaContainer: {
        width: SCREEN_WIDTH - 60,
        height: SCREEN_HEIGHT * 0.25,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10
    },
    post: {
        justifyContent: 'space-between',
        marginVertical: 10
    },
    postItem: {
        justifyContent: 'space-between',
    },
    postTitle: {
        color: 'rgba(255, 255, 255, 1)',
        marginHorizontal: 10,
        marginVertical: 5,
        fontSize: 17,
    },
    postTextContainer: {
        flexDirection: 'row',
        width: SCREEN_WIDTH - 60,
        borderBottomWidth: 1,
        borderColor: 'rgba(255, 255, 255, 1)',
    },
    postText: {
        marginLeft: 10,
        width: SCREEN_WIDTH - 80,
        color: 'rgba(255, 255, 255, 1)',
        fontSize: 15,
    },
    postButton: {
        alignItems: 'center',
        marginVertical: 30
    },
    progressBar: {
        width: '100%',
        height: 10,
        borderRadius: 5,
    },
});

export default PostScreen;