import Detail from '@/components/Detail';
import DetailTopTabBar from '@/components/DetailTopTabBar';
import { BACKGROUND_COLOR, SEARCHDETAILTOP_TAPBAR_HEIGHT } from '@/constants/Config';
import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { StyleSheet, View } from 'react-native';

type DetailParams = {
    postId: string;
    userId: string;
    type: string;
    uri: string;
    title: string;
    content: string;
    likesCount: string;
    commentsCount: string;
    favoCount: string;
};

const DetailScreen = () => {
    const { postId, userId, type, uri, title, content, likesCount, commentsCount, favoCount } = useLocalSearchParams<DetailParams>();

    return (
        <View style={styles.container} >
            <DetailTopTabBar />
            <Detail postId={postId} userId={userId} type={type === 'video' ? true : false} uri={uri} title={title} content={content} likesCount={parseInt(likesCount)} commentsCount={parseInt(commentsCount)} favoCount={parseInt(favoCount)} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: SEARCHDETAILTOP_TAPBAR_HEIGHT,
        backgroundColor: BACKGROUND_COLOR
    },
});

export default DetailScreen;