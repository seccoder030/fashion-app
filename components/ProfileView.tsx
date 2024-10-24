import { BOTTOM_TAPBAR_HEIGHT, SCREEN_WIDTH } from '@/constants/Config';
import Request from '@/utils/request';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { FlatList, Pressable, StyleSheet, ToastAndroid, View } from 'react-native';
import Blank from './Blank';
import Loading from './Loading';
import Media from './Media';
import { useAuth } from './navigation/Authentication';

interface IFavorites {
    id: string;
    user_id: string;
    post_id: string;
    user: IUser;
    post: IPost;
}

interface ProfielViewProps {
    mode: boolean;
    visible?: boolean;
}

const ProfileView: React.FC<ProfielViewProps> = ({
    mode = true,
    visible = true
}) => {
    const { token } = useAuth()
    const [medias, setMedias] = useState<IFavorites[] | IPost[] | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            if (token) {
                try {
                    Request.setAuthorizationToken(token);
                    const res = await Request.Get(`/post/get_my_posts`);
                    if (res.status === 'success') {
                        setMedias([]);
                        if (mode) {
                            setMedias(res.me as IPost[]);
                        } else {
                            setMedias(res.favorites as IFavorites[]);
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

    const handleItem = (item: IFavorites | IPost) => {
        if (mode) {
            item = (item as IPost);
            router.push({ pathname: '/DetailScreen', params: { postId: item.id, userId: item.user_id, avatar: item.user.avatar, name: item.user.name, type: item.type ? "video" : "image", uri: item.uri, title: item.title, content: item.content, likesCount: item.likes, commentsCount: item.comments, favoCount: item.favorites } });
        }
        else {
            item = (item as IFavorites);
            router.push({ pathname: '/DetailScreen', params: { postId: item.post_id, userId: item.user_id, avatar: item.user.avatar, name: item.user.name, type: item.post.type ? "video" : "image", uri: item.post.uri, title: item.post.title, content: item.post.content, likesCount: item.post.likes, commentsCount: item.post.comments, favoCount: item.post.favorites } });
        }
    }

    const renderItem = ({ item }: { item: IFavorites | IPost }) => (
        <Pressable onPress={() => handleItem(item)} style={styles.card}>
            {mode ?
                <Media type={(item as IPost).type} source={{ uri: (item as IPost).uri }} backgroundColor={'transparent'} play={true} resizeMode={1} /> :
                <Media type={(item as IFavorites).post.type} source={{ uri: (item as IFavorites).post.uri }} backgroundColor={'transparent'} play={true} resizeMode={1} />
            }
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