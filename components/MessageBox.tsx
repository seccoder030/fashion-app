import { SCREEN_WIDTH } from '@/constants/Config';
import { ResizeMode, Video } from 'expo-av';
import React, { useState } from 'react';
import {
    Image,
    Pressable,
    StyleSheet,
    Text,
    View
} from 'react-native';

interface MessageBoxProps {
    avatar: string;
    message: IMessage;
    fontSize?: number;
    handlePress?: ((e: any) => void) | null;
    handleLongPress?: ((e: any) => void) | null;
    handleReplyPress?: ((e: any) => void) | null;
    selected?: boolean;
}

const MessageBox: React.FC<MessageBoxProps> = ({
    avatar,
    message,
    fontSize = 10,
    handlePress = null,
    handleLongPress = null,
    handleReplyPress = null,
    selected = false,
}) => {
    const [aspectRatio, setAspectRatio] = useState(16 / 9);

    const handleImageLoad = (event: any) => {
        const { width, height } = event.nativeEvent.source;
        if (width && height) {
            setAspectRatio(width / height);
        }
    };

    const handleVideoLoad = (status: any) => {
        if (status.naturalSize) {
            const { width, height } = status.naturalSize;
            setAspectRatio(width / height);
        }
    };

    return (
        <>
            {
                message.receive ?
                    <View style={styles.receive}>
                        <Image
                            source={{ uri: avatar }}
                            style={[
                                { width: 30, height: 30 },
                                styles.userImage
                            ]}
                        />
                        <View style={{ width: '70%', flexDirection: 'row', justifyContent: 'flex-start' }}>
                            <View style={[styles.content, { backgroundColor: selected ? 'rgba(252, 252, 252, 0.5)' : 'rgba(252, 252, 252, 1)' }]}>
                                {message.replyMessage && <View style={[styles.content, { backgroundColor: selected ? 'rgba(193, 237, 255, 0.5)' : 'rgba(193, 237, 255, 1)', borderColor: selected ? 'rgba(0, 0, 0, 0.5)' : 'rgba(0, 0, 0, 1)', borderLeftWidth: 5, marginBottom: 10, marginHorizontal: 0 }]}>
                                    <Pressable onPress={handleReplyPress} onLongPress={handleLongPress}>
                                        {message.replyMessage.medias && message.replyMessage.medias.map((item, index) => (
                                            item.type === "video" ?
                                                <Video
                                                    key={index}
                                                    source={{ uri: item.uri }}
                                                    useNativeControls={false}
                                                    shouldPlay
                                                    isLooping={true}
                                                    isMuted={true}
                                                    resizeMode={ResizeMode.CONTAIN}
                                                    style={{ width: (SCREEN_WIDTH - 100) * 0.7 - 25, aspectRatio: aspectRatio, marginBottom: 10, opacity: selected ? 0.5 : 1 }}
                                                    onError={(error) => {
                                                        console.error('Video loading error:', error);
                                                    }}
                                                    onReadyForDisplay={(event) => handleVideoLoad(event)}
                                                /> :
                                                (item.type == "image" ?
                                                    <Image
                                                        key={index}
                                                        source={{ uri: item.uri }}
                                                        style={{ width: (SCREEN_WIDTH - 100) * 0.7 - 25, aspectRatio: aspectRatio, resizeMode: 'contain', marginBottom: 10, opacity: selected ? 0.5 : 1 }}
                                                        onError={(error) => {
                                                            console.error('Video loading error:', error);
                                                        }}
                                                        onLoad={(event) => handleImageLoad(event)}
                                                    /> :
                                                    <Text style={{ color: 'rgba(255, 255, 255, 1)', fontSize: 15 }}>文件无法播放</Text>
                                                )
                                        ))}
                                        <Text style={[styles.text, { fontSize: fontSize }]}>{message.replyMessage.text}</Text>
                                        <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                                            <Text style={styles.date}>{new Date(message.replyMessage.date).toDateString()}</Text>
                                        </View>
                                    </Pressable>
                                </View>}
                                <Pressable onPress={handlePress} onLongPress={handleLongPress}>
                                    {message.medias && message.medias.map((item, index) => (
                                        item.type === "video" ?
                                            <Video
                                                key={index}
                                                source={{ uri: item.uri }}
                                                useNativeControls={false}
                                                shouldPlay
                                                isLooping={true}
                                                isMuted={true}
                                                resizeMode={ResizeMode.CONTAIN}
                                                style={{ width: (SCREEN_WIDTH - 100) * 0.7, aspectRatio: aspectRatio, marginBottom: 10, opacity: selected ? 0.5 : 1 }}
                                                onError={(error) => {
                                                    console.error('Video loading error:', error);
                                                }}
                                                onReadyForDisplay={(event) => handleVideoLoad(event)}
                                            /> :
                                            (item.type == "image" ?
                                                <Image
                                                    key={index}
                                                    source={{ uri: item.uri }}
                                                    style={{ width: (SCREEN_WIDTH - 100) * 0.7, aspectRatio: aspectRatio, resizeMode: 'contain', marginBottom: 10, opacity: selected ? 0.5 : 1 }}
                                                    onError={(error) => {
                                                        console.error('Video loading error:', error);
                                                    }}
                                                    onLoad={(event) => handleImageLoad(event)}
                                                /> :
                                                <Text style={{ color: 'rgba(255, 255, 255, 1)', fontSize: 15 }}>文件无法播放</Text>
                                            )
                                    ))}
                                    <Text style={[styles.text, { fontSize: fontSize }]}>{message.text}</Text>
                                    <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                                        <Text style={styles.date}>{new Date(message.date).toDateString()}</Text>
                                    </View>
                                </Pressable>
                            </View>
                        </View >
                    </View >
                    :
                    <View style={styles.send}>
                        <View style={{ width: '70%', flexDirection: 'row', justifyContent: 'flex-end' }}>
                            <View style={[styles.content, { backgroundColor: selected ? 'rgba(193, 237, 255, 0.5)' : 'rgba(193, 237, 255, 1)' }]}>
                                {message.replyMessage && <View style={[styles.content, { backgroundColor: selected ? 'rgba(252, 252, 252, 0.5)' : 'rgba(252, 252, 252, 1)', borderColor: selected ? 'rgba(0, 0, 0, 0.5)' : 'rgba(0, 0, 0, 1)', borderLeftWidth: 5, marginBottom: 10, marginHorizontal: 0 }]}>
                                    <Pressable onPress={handleReplyPress} onLongPress={handleLongPress}>
                                        {message.replyMessage.medias && message.replyMessage.medias.map((item, index) => (
                                            item.type === "video" ?
                                                <Video
                                                    key={index}
                                                    source={{ uri: item.uri }}
                                                    useNativeControls={false}
                                                    shouldPlay
                                                    isLooping={true}
                                                    isMuted={true}
                                                    resizeMode={ResizeMode.CONTAIN}
                                                    style={{ width: (SCREEN_WIDTH - 100) * 0.7 - 25, aspectRatio: aspectRatio, marginBottom: 10, opacity: selected ? 0.5 : 1 }}
                                                    onError={(error) => {
                                                        console.error('Video loading error:', error);
                                                    }}
                                                    onReadyForDisplay={(event) => handleVideoLoad(event)}
                                                /> :
                                                (item.type == "image" ?
                                                    <Image
                                                        key={index}
                                                        source={{ uri: item.uri }}
                                                        style={{ width: (SCREEN_WIDTH - 100) * 0.7 - 25, aspectRatio: aspectRatio, resizeMode: 'contain', marginBottom: 10, opacity: selected ? 0.5 : 1 }}
                                                        onError={(error) => {
                                                            console.error('Video loading error:', error);
                                                        }}
                                                        onLoad={(event) => handleImageLoad(event)}
                                                    /> :
                                                    <Text style={{ color: 'rgba(255, 255, 255, 1)', fontSize: 15 }}>文件无法播放</Text>
                                                )
                                        ))}
                                        <Text style={[styles.text, { fontSize: fontSize }]}>{[message.replyMessage.text]}</Text>
                                        <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                                            <Text style={styles.date}>{new Date(message.replyMessage.date).toDateString()}</Text>
                                        </View>
                                    </Pressable>
                                </View>}
                                <Pressable onPress={handlePress} onLongPress={handleLongPress}>
                                    {message.medias && message.medias.map((item, index) => (
                                        item.type === "video" ?
                                            <Video
                                                key={index}
                                                source={{ uri: item.uri }}
                                                useNativeControls={false}
                                                shouldPlay
                                                isLooping={true}
                                                isMuted={true}
                                                resizeMode={ResizeMode.CONTAIN}
                                                style={{ width: (SCREEN_WIDTH - 100) * 0.7, aspectRatio: aspectRatio, marginBottom: 10, opacity: selected ? 0.5 : 1 }}
                                                onError={(error) => {
                                                    console.error('Video loading error:', error);
                                                }}
                                                onReadyForDisplay={(event) => handleVideoLoad(event)}
                                            /> :
                                            (item.type == "image" ?
                                                <Image
                                                    key={index}
                                                    source={{ uri: item.uri }}
                                                    style={{ width: (SCREEN_WIDTH - 100) * 0.7, aspectRatio: aspectRatio, resizeMode: 'contain', marginBottom: 10, opacity: selected ? 0.5 : 1 }}
                                                    onError={(error) => {
                                                        console.error('Video loading error:', error);
                                                    }}
                                                    onLoad={(event) => handleImageLoad(event)}
                                                /> :
                                                <Text style={{ color: 'rgba(255, 255, 255, 1)', fontSize: 15 }}>文件无法播放</Text>
                                            )
                                    ))}
                                    <Text style={[styles.text, { fontSize: fontSize }]}>{message.text}</Text>
                                    <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                                        <Text style={styles.date}>{new Date(message.date).toDateString()}</Text>
                                    </View>
                                </Pressable>
                            </View>
                        </View>
                        <Image
                            source={{ uri: avatar }}
                            style={[
                                { width: 30, height: 30 },
                                styles.userImage
                            ]}
                        />
                    </View>
            }
        </>
    );
};

const styles = StyleSheet.create({
    userImage: {
        top: 0,
        borderRadius: 30,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.7)',
    },
    receive: {
        flexDirection: 'row',
        paddingVertical: 10,
    },
    content: {
        justifyContent: 'center',
        marginHorizontal: 10,
        paddingHorizontal: 10,
        paddingTop: 10,
        paddingBottom: 3,
        borderRadius: 5
    },
    text: {
        color: 'rgba(38, 38, 38, 1)',
    },
    date: {
        paddingTop: 5,
        color: 'rgba(38, 38, 38, 0.7)',
        fontSize: 10,
    },
    send: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        paddingVertical: 10,
    },
});

export default MessageBox;