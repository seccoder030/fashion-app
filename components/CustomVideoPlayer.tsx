import React, { useState, useRef, useCallback, useEffect } from 'react';
import { View, TouchableOpacity, StyleSheet, Image, Text, ToastAndroid, ColorValue } from 'react-native';
import { Video, AVPlaybackStatus, ResizeMode, AVPlaybackStatusSuccess, AVPlaybackSource } from 'expo-av';
import Slider from '@react-native-community/slider';
import { BOTTOM_TAPBAR_HEIGHT, ICON_PAUSE, ICON_PLAY } from '@/constants/Config';
import Loading from './Loading';

interface CustomVideoPlayerProps {
    source: AVPlaybackSource;
    backgroundColor?: ColorValue;
    play?: boolean;
    reset?: boolean;
    enableControls?: boolean;
    resizeMode?: ResizeMode;
    isMuted?: boolean;
}

const CustomVideoPlayer: React.FC<CustomVideoPlayerProps> = ({ source, resizeMode = ResizeMode.STRETCH, backgroundColor = '#000', play = false, reset = false, enableControls = false, isMuted = true }) => {
    const videoRef = useRef<Video | null>(null);
    const [status, setStatus] = useState<AVPlaybackStatus>({} as AVPlaybackStatus);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (play) videoRef.current?.playAsync();
        else videoRef.current?.pauseAsync();
        if (reset) {
            videoRef.current?.playAsync();
        } else {
            videoRef.current?.setPositionAsync(0);
        }
        if (error) ToastAndroid.show(error, ToastAndroid.SHORT);
    }, [play, reset, error]);

    const handlePlayPause = useCallback(async () => {
        if (!videoRef.current) return;

        if (status.isLoaded && status.isPlaying) {
            await videoRef.current.pauseAsync();
        } else {
            await videoRef.current.playAsync();
        }
    }, [status]);

    const handleSliderChange = useCallback(async (value: number) => {
        if (!videoRef.current || !status.isLoaded) return;

        if (status.durationMillis !== undefined) {
            const newPosition = value * status.durationMillis;
            await videoRef.current.setPositionAsync(newPosition);
        } else {
            console.warn('Video duration is not available');
        }
    }, [status]);

    const onPlaybackStatusUpdate = useCallback((newStatus: AVPlaybackStatus) => {
        setStatus(newStatus);
    }, []);

    return (
        <>
            <View style={[styles.container, { backgroundColor: backgroundColor, display: isLoading ? 'none' : 'flex' }]} >
                <Video
                    ref={videoRef}
                    source={source}
                    useNativeControls={false}
                    shouldPlay
                    isLooping={true}
                    isMuted={isMuted}
                    resizeMode={resizeMode}
                    onPlaybackStatusUpdate={onPlaybackStatusUpdate}
                    style={[styles.video, { display: isLoading ? 'none' : 'flex' }]}
                    onLoadStart={() => setIsLoading(true)}
                    onLoad={() => setIsLoading(false)}
                    onError={(error) => {
                        setIsLoading(false);
                        setError('Failed to load video');
                        console.error('Video loading error:', error);
                    }}
                />
                <View style={[styles.controls, { display: isLoading || !enableControls ? 'none' : 'flex' }]}>
                    <TouchableOpacity onPress={handlePlayPause} style={styles.playPauseButton}>
                        {status.isLoaded && status.isPlaying ? (
                            <Image
                                source={ICON_PAUSE}
                                style={{ width: 20, height: 20 }}
                            />
                        ) : (
                            <Image
                                source={ICON_PLAY}
                                style={{ width: 20, height: 20 }}
                            />
                        )}
                    </TouchableOpacity>
                    <Slider
                        style={styles.slider}
                        minimumValue={0}
                        maximumValue={1}
                        value={
                            status.isLoaded && status.durationMillis
                                ? status.positionMillis / status.durationMillis
                                : 0
                        }
                        onSlidingComplete={handleSliderChange}
                        minimumTrackTintColor="#FFFFFF"
                        maximumTrackTintColor="#000000"
                    />
                </View>
            </View >
            {isLoading && <Loading backgroundColor={backgroundColor} />}
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        zIndex: 1
    },
    video: {
        width: '100%',
        height: '100%',
    },
    controls: {
        position: 'absolute',
        bottom: BOTTOM_TAPBAR_HEIGHT + 10,
        left: 0,
        right: 0,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        padding: 10,
    },
    playPauseButton: {
        marginRight: 10,
    },
    slider: {
        flex: 1,
    },
    loadingText: {
        marginTop: 10,
        fontSize: 16,
    },
    errorText: {
        marginTop: 10,
        color: 'red',
        fontSize: 16,
    },
});

export default CustomVideoPlayer;