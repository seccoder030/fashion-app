import { ResizeMode, Video } from 'expo-av';
import React from 'react';
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
    handlePress?: (e: any) => void | null;
    handleLongPress?: (e: any) => void | null;
    selected?: boolean;
}

const MessageBox: React.FC<MessageBoxProps> = ({
    avatar,
    message,
    handlePress = null,
    handleLongPress = null,
    selected = false,
}) => {

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
                            <Pressable onLongPress={handleLongPress} onPress={handlePress} style={[styles.content, { backgroundColor: selected ? 'rgba(252, 252, 252, 0.5)' : 'rgba(252, 252, 252, 1)' }]}>
                                {message.replyMessage && <View style={[styles.content, { backgroundColor: selected ? 'rgba(193, 237, 255, 0.5)' : 'rgba(193, 237, 255, 1)', borderColor: selected ? 'rgba(0, 0, 0, 0.5)' : 'rgba(0, 0, 0, 1)', borderLeftWidth: 5, marginBottom: 10 }]}>
                                    <Text style={styles.text}>{message.replyMessage.text}</Text>
                                    <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                                        <Text style={styles.date}>{new Date(message.replyMessage.date).toDateString()}</Text>
                                    </View>
                                    {message.replyMessage.medias && message.replyMessage.medias.map((item) => (
                                        item.type === "video" ?
                                            <Video
                                                source={{ uri: item.uri }}
                                                useNativeControls={false}
                                                shouldPlay
                                                isLooping={true}
                                                isMuted={true}
                                                resizeMode={ResizeMode.CONTAIN}
                                                style={{ width: '100%', height: 150, marginBottom: 10, opacity: selected ? 0.5 : 1 }}
                                                onError={(error) => {
                                                    console.error('Video loading error:', error);
                                                }}

                                            /> :
                                            (item.type == "image" ?
                                                <Image
                                                    source={{ uri: item.uri }}
                                                    style={{ width: '100%', height: 150, resizeMode: 'contain', marginBottom: 10, opacity: selected ? 0.5 : 1 }}
                                                    onError={(error) => {
                                                        console.error('Video loading error:', error);
                                                    }}
                                                /> :
                                                <Text style={{ color: 'rgba(255, 255, 255, 1)', fontSize: 15 }}>文件无法播放</Text>
                                            )
                                    ))}
                                </View>}
                                {message.medias && message.medias.map((item) => (
                                    item.type === "video" ?
                                        <Video
                                            source={{ uri: item.uri }}
                                            useNativeControls={false}
                                            shouldPlay
                                            isLooping={true}
                                            isMuted={true}
                                            resizeMode={ResizeMode.CONTAIN}
                                            style={{ width: '100%', height: 150, marginBottom: 10, opacity: selected ? 0.5 : 1 }}
                                            onError={(error) => {
                                                console.error('Video loading error:', error);
                                            }}

                                        /> :
                                        (item.type == "image" ?
                                            <Image
                                                source={{ uri: item.uri }}
                                                style={{ width: '100%', height: 150, resizeMode: 'contain', marginBottom: 10, opacity: selected ? 0.5 : 1 }}
                                                onError={(error) => {
                                                    console.error('Video loading error:', error);
                                                }}
                                            /> :
                                            <Text style={{ color: 'rgba(255, 255, 255, 1)', fontSize: 15 }}>文件无法播放</Text>
                                        )
                                ))}
                                <Text style={styles.text}>{message.text}</Text>
                                <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                                    <Text style={styles.date}>{new Date(message.date).toDateString()}</Text>
                                </View>
                            </Pressable>
                        </View>
                    </View >
                    :
                    <View style={styles.send}>
                        <View style={{ width: '70%', flexDirection: 'row', justifyContent: 'flex-end' }}>
                            <Pressable onLongPress={handleLongPress} onPress={handlePress} style={[styles.content, { backgroundColor: selected ? 'rgba(193, 237, 255, 0.5)' : 'rgba(193, 237, 255, 1)' }]}>
                                {message.replyMessage && <View style={[styles.content, { backgroundColor: selected ? 'rgba(252, 252, 252, 0.5)' : 'rgba(252, 252, 252, 1)', borderColor: selected ? 'rgba(0, 0, 0, 0.5)' : 'rgba(0, 0, 0, 1)', borderLeftWidth: 5, marginBottom: 10 }]}>
                                    <Text style={styles.text}>{message.replyMessage.text}</Text>
                                    <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                                        <Text style={styles.date}>{new Date(message.replyMessage.date).toDateString()}</Text>
                                    </View>
                                    {message.replyMessage.medias && message.replyMessage.medias.map((item) => (
                                        item.type === "video" ?
                                            <Video
                                                source={{ uri: item.uri }}
                                                useNativeControls={false}
                                                shouldPlay
                                                isLooping={true}
                                                isMuted={true}
                                                resizeMode={ResizeMode.CONTAIN}
                                                style={{ width: '100%', height: 150, marginBottom: 10, opacity: selected ? 0.5 : 1 }}
                                                onError={(error) => {
                                                    console.error('Video loading error:', error);
                                                }}
                                            /> :
                                            (item.type == "image" ?
                                                <Image
                                                    source={{ uri: item.uri }}
                                                    style={{ width: '100%', height: 150, resizeMode: 'contain', marginBottom: 10, opacity: selected ? 0.5 : 1 }}
                                                    onError={(error) => {
                                                        console.error('Video loading error:', error);
                                                    }}
                                                /> :
                                                <Text style={{ color: 'rgba(255, 255, 255, 1)', fontSize: 15 }}>文件无法播放</Text>
                                            )
                                    ))}
                                </View>}
                                {message.medias && message.medias.map((item) => (
                                    item.type === "video" ?
                                        <Video
                                            source={{ uri: item.uri }}
                                            useNativeControls={false}
                                            shouldPlay
                                            isLooping={true}
                                            isMuted={true}
                                            resizeMode={ResizeMode.CONTAIN}
                                            style={{ width: '100%', height: 150, marginBottom: 10, opacity: selected ? 0.5 : 1 }}
                                            onError={(error) => {
                                                console.error('Video loading error:', error);
                                            }}

                                        /> :
                                        (item.type == "image" ?
                                            <Image
                                                source={{ uri: item.uri }}
                                                style={{ width: '100%', height: 150, resizeMode: 'contain', marginBottom: 10, opacity: selected ? 0.5 : 1 }}
                                                onError={(error) => {
                                                    console.error('Video loading error:', error);
                                                }}
                                            /> :
                                            <Text style={{ color: 'rgba(255, 255, 255, 1)', fontSize: 15 }}>文件无法播放</Text>
                                        )
                                ))}
                                <Text style={styles.text}>{message.text}</Text>
                                <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                                    <Text style={styles.date}>{new Date(message.date).toDateString()}</Text>
                                </View>
                            </Pressable>
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
        fontSize: 10,
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