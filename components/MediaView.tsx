import { BOTTOM_TAPBAR_HEIGHT, SCREEN_WIDTH } from '@/constants/Config';
import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    Text,
    View
} from 'react-native';
import ActionBar from './ActionBar';
import Media from './Media';

interface MediaViewProps {
    item: IPost;
    play?: boolean;
    active?: boolean;
}

const MediaView: React.FC<MediaViewProps> = ({
    item,
    play = false,
    active = true
}) => {
    const [reset, setReset] = useState(false);

    useEffect(() => {
        setReset(active);
    }, [active])

    return (
        <>
            {/* {active ?
                <> */}
            <Media type={item.type} source={{ uri: item.uri, cache: 'reload' }} play={play} reset={reset} enableControls={true} />
            <View style={styles.mediaInfo}>
                <Text style={{ color: 'rgba(255, 255, 255, 1)', fontSize: 17 }}>{item.title.length > 20 ? item.title.slice(0, 20) + '...' : item.title}</Text>
                <Text style={{ color: 'rgba(255, 255, 255, 1)', fontSize: 13 }}>{item.content.length > 25 ? item.content.slice(0, 25) + '...' : item.content}</Text>
            </View>
            <View style={styles.detailInfo}>
                <Text style={{ color: 'rgba(255, 255, 255, 1)', fontSize: 17 }}>{item.user.name.length > 20 ? item.user.name.slice(0, 20) + '...' : item.user.name}</Text>
            </View>
            <ActionBar userId={item.user_id} postId={item.id} avatar={item.user.avatar} name={item.user.name} type={item.type} uri={item.uri} title={item.title} content={item.content} preLikesCount={item.likes || 0} commentsCount={item.comments || 0} favoritesCount={item.favorites || 0} />
            {/* </> :
                <View style={{ width: '100%', height: '100%', backgroundColor: 'black' }}></View>
            } */}
        </>
    );
};

const styles = StyleSheet.create({
    mediaInfo: {
        width: SCREEN_WIDTH - 40,
        position: 'absolute',
        marginHorizontal: 20,
        top: 30,
        zIndex: 1
    },
    detailInfo: {
        width: SCREEN_WIDTH - 40,
        position: 'absolute',
        alignItems: 'flex-end',
        marginHorizontal: 20,
        bottom: BOTTOM_TAPBAR_HEIGHT + 20,
        zIndex: 1
    }
});

export default MediaView;