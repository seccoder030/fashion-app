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
            <View style={styles.info}>
                <Text style={{ color: 'rgba(255, 255, 255, 1)', fontSize: 13 }}>{item.title.length > 20 ? item.title.slice(0, 20) + '...' : item.title}</Text>
                <Text style={{ color: 'rgba(255, 255, 255, 1)', fontSize: 11 }}>{item.content.length > 20 ? item.content.slice(0, 20) + '...' : item.content}</Text>
            </View>
            <ActionBar userId={item.user_id} postId={item.id} type={item.type} avatar={item.user.avatar} uri={item.uri} title={item.title} content={item.content} preLikesCount={item.likes || 0} commentsCount={item.comments || 0} favoritesCount={item.favorites || 0} />
            {/* </> :
                <View style={{ width: '100%', height: '100%', backgroundColor: 'black' }}></View>
            } */}
        </>
    );
};

const styles = StyleSheet.create({
    info: {
        width: SCREEN_WIDTH - 40,
        alignItems: 'flex-end',
        position: 'absolute',
        marginHorizontal: 20,
        bottom: BOTTOM_TAPBAR_HEIGHT + 55,
        zIndex: 1
    }
});

export default MediaView;