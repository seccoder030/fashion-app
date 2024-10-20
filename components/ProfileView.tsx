import { BOTTOM_TAPBAR_HEIGHT, IMAGE_BG, IMAGE_BG10, IMAGE_BG2, IMAGE_BG3, IMAGE_BG4, IMAGE_BG5, IMAGE_BG6, IMAGE_BG7, IMAGE_BG8, IMAGE_BG9, SCREEN_WIDTH } from '@/constants/Config';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { FlatList, Image, ImageSourcePropType, Pressable, ScrollView, StyleSheet, ToastAndroid, View } from 'react-native';
import { useAuth } from './navigation/Authentication';
import Request from '@/utils/request';
import Loading from './Loading';
import Blank from './Blank';
import Media from './Media';

interface Item {
    id: string;
    imageUrl: ImageSourcePropType;
    caption: string;
    likes: number;
    comments: number;
}

interface ProfielViewProps {
    mode: boolean;
    visible?: boolean;
}

const ProfileView: React.FC<ProfielViewProps> = ({
    mode = true,
    visible = true
}) => {
    const feedItems: Item[] = [
        { id: '1', imageUrl: IMAGE_BG2, caption: '在此输入您的标题。', likes: 878, comments: 1208 },
        { id: '2', imageUrl: IMAGE_BG3, caption: '在此输入您的标题。', likes: 351, comments: 1335 },
        { id: '3', imageUrl: IMAGE_BG4, caption: '在此输入您的标题。', likes: 242, comments: 4231 },
        { id: '4', imageUrl: IMAGE_BG5, caption: '在此输入您的标题。', likes: 313, comments: 3131 },
        { id: '5', imageUrl: IMAGE_BG6, caption: '在此输入您的标题。', likes: 878, comments: 1208 },
        { id: '6', imageUrl: IMAGE_BG7, caption: '在此输入您的标题。', likes: 351, comments: 1335 },
        { id: '7', imageUrl: IMAGE_BG8, caption: '在此输入您的标题。', likes: 242, comments: 4231 },
        { id: '8', imageUrl: IMAGE_BG9, caption: '在此输入您的标题。', likes: 313, comments: 3131 },
        { id: '9', imageUrl: IMAGE_BG10, caption: '在此输入您的标题。', likes: 878, comments: 1208 },
        { id: '10', imageUrl: IMAGE_BG, caption: '在此输入您的标题。', likes: 351, comments: 1335 },
    ];

    const { token } = useAuth()
    const [medias, setMedias] = useState<IPost[] | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            if (token) {
                try {
                    Request.setAuthorizationToken(token);
                    const res = await Request.Get(`/profile/posts`);
                    if (res.status === 'success') {
                        setMedias([]);
                        if (mode) {
                            res.me.map((item: { post: IPost }) => {
                                setMedias(prev => [...(prev || []), item.post]);
                            })
                        } else {
                            res.favorites.map((item: { post: IPost }) => {
                                setMedias(prev => [...(prev || []), item.post]);
                            })
                        }
                    }
                } catch (error) {
                    ToastAndroid.show('API 错误！', ToastAndroid.SHORT);
                }
            }
        }
        fetchData();
    }, [mode]);

    if (!medias) {
        return <Loading backgroundColor={'transparent'} />
    }

    if (medias.length == 0) {
        return <Blank />
    }

    const handleItem = (item: IPost) => {
        router.push({ pathname: '/DetailScreen', params: { postId: item.id, userId: item.user_id, type: item.type ? "video" : "image", uri: item.uri, title: item.title, content: item.content, likesCount: item.likes, commentsCount: item.comments, favoCount: item.favorites } });
    }

    const renderItem = ({ item }: { item: IPost }) => (
        <Pressable onPress={() => handleItem(item)} style={styles.card}>
            <Media type={item.type} source={{ uri: item.uri }} backgroundColor={'transparent'} play={true} resizeMode={1} />
        </Pressable >

    );

    return (
        <View style={[styles.container, { display: visible ? 'flex' : 'none' }]}>
            <FlatList
                data={medias}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                numColumns={3}
                contentContainerStyle={styles.contentContainer}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        marginHorizontal: 10,
        marginTop: 10
    },
    contentContainer: {
        paddingBottom: BOTTOM_TAPBAR_HEIGHT + 5,
        zIndex: 50
    },
    card: {
        width: (SCREEN_WIDTH - 35) / 3,
        aspectRatio: 0.7,
        marginHorizontal: 2.5,
        marginBottom: 5,
        overflow: 'hidden',
        borderColor: 'rgba(255, 255, 255, 1)',
        borderWidth: 1,
        backgroundColor: 'rgba(1, 1, 1, 0.15)'
    },
    cardImage: {
        width: '100%',
        height: '100%',
    },
});

export default ProfileView;