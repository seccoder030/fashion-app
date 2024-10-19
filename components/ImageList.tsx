import { BOTTOM_TAPBAR_HEIGHT, ICON_COMMENT, ICON_HEARTFILL, SCREEN_HEIGHT, SCREEN_WIDTH, SEARCHTOP_TAPBAR_HEIGHT } from '@/constants/Config';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, ToastAndroid, View } from 'react-native';
import IconButton from './IconButton';
import Loading from './Loading';
import Media from './Media';
import Blank from './Blank';
import Request from '@/utils/request';
import { useAuth } from '@/context/Authentication';

const ImageList = () => {
    const { token } = useAuth();
    const [medias, setMedias] = useState<IPost[] | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (token) {
                    Request.setAuthorizationToken(token);
                    const res = await Request.Get('/post/get');
                    setMedias(res.posts);
                }
            } catch (error) {
                ToastAndroid.show('API 错误！', ToastAndroid.SHORT);
            }
        }
        fetchData();
    }, []);

    if (!medias) {
        return <Loading backgroundColor={'transparent'} />
    }

    if (medias.length == 0) {
        return <Blank />
    }

    const handleItem = () => {
        router.push('/DetailScreen');
    };

    const renderItem = ({ item }: { item: IPost }) => (
        <Pressable onPress={handleItem} style={styles.card}>
            <View style={styles.cardImage}>
                <Media type={item.type} source={{ uri: item.uri }} backgroundColor={'transparent'} play={true} resizeMode={1} />
            </View>
            <View style={styles.cardFooter}>
                <Text style={styles.text}>{item.title.length > 20 ? item.title.slice(0, 20) + '...' : item.title}</Text>
                <View style={styles.info}>
                    <View style={styles.infoItem}>
                        <IconButton size={15} iconSource={ICON_COMMENT} enabled={false} />
                        <Text style={styles.infoText}>{item.comments ? (item.comments > 1000 ? `${Math.floor(item.comments / 100) / 10}K` : `${item.comments}`) : '0'}</Text>
                    </View>
                    <View style={styles.infoItem}>
                        <IconButton size={15} iconSource={ICON_HEARTFILL} enabled={false} />
                        <Text style={styles.infoText}>{item.likes ? (item.likes > 1000 ? `${Math.floor(item.likes / 100) / 10}K` : `${item.likes}`) : '0'}</Text>
                    </View>
                </View>
            </View>
        </Pressable >

    );

    return (
        <View style={styles.container}>
            <FlatList
                data={medias}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                numColumns={2}
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
        marginHorizontal: 10
    },
    contentContainer: {
        paddingBottom: BOTTOM_TAPBAR_HEIGHT - 10,
    },
    card: {
        width: (SCREEN_WIDTH - 60) / 2,
        aspectRatio: 0.63,
        marginHorizontal: 10,
        marginBottom: 20,
        borderRadius: 5,
        overflow: 'hidden',
        padding: 10,
        borderColor: 'rgba(255, 255, 255, 0.2)',
        borderWidth: 1,
        backgroundColor: 'rgba(1, 1, 1, 0.15)'
    },
    cardImage: {
        width: '100%',
        height: '87%',
        borderRadius: 5,
        marginBottom: 5
    },
    cardFooter: {
        marginTop: 10,
        bottom: 12,
    },
    text: {
        color: 'rgba(255, 255, 255, 0.8)',
        fontSize: 10,
        marginBottom: 5
    },
    info: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        color: 'rgba(255, 255, 255, 0.8)',
        left: 0,
        right: 0
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
});

export default ImageList;