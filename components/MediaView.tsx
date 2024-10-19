import { BOTTOM_TAPBAR_HEIGHT, SCREEN_WIDTH } from '@/constants/Config';
import React from 'react';
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
    reset?: boolean;
}

const MediaView: React.FC<MediaViewProps> = ({
    item,
    play = false,
    reset = false
}) => {
    return (
        <>
            <Media type={item.type} source={{ uri: item.uri, cache: 'reload' }} play={play} reset={reset} enableControls={true} />
            <View style={styles.info}>
                <Text style={{ color: 'rgba(255, 255, 255, 1)', fontSize: 13 }}>{item.title.length > 20 ? item.title.slice(0, 20) + '...' : item.title}</Text>
                <Text style={{ color: 'rgba(255, 255, 255, 1)', fontSize: 11 }}>{item.content.length > 20 ? item.content.slice(0, 20) + '...' : item.content}</Text>
            </View>
            <ActionBar username={item.user.name} likes={item.likes || 0} comments={item.comments || 0} uri={item.user.avatar} />
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