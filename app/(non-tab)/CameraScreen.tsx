import IconButton from '@/components/IconButton';
import IconTextButton from '@/components/IconTextButton';
import TextButton from '@/components/TextButton';
import { ICON_ALBUM, ICON_BACK, ICON_BEAUTY, ICON_CANCEL, ICON_CAPTURE, ICON_CONFIRM, ICON_EFFECT, ICON_FILTER, ICON_FLIP, ICON_MUSIC, ICON_PHOTO, ICON_RECORDSTART, ICON_RECORDSTOP, ICON_SAVE, ICON_SPEED, ICON_SPLIT, ICON_TIMER, ICON_UNION, ICON_VIDEO, SCREEN_WIDTH } from '@/constants/Config';
import { Camera, CameraCapturedPicture, CameraType, CameraView, useCameraPermissions } from 'expo-camera';
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';
import { router } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import { Image, SafeAreaView, StatusBar, StyleSheet, Text, ToastAndroid, TouchableOpacity, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { ResizeMode, Video } from 'expo-av';

export default function CameraScreen() {
    const [facing, setFacing] = useState<CameraType>('back');
    const [isRecording, setIsRecording] = useState<boolean>(false);
    const [isCameraReady, setIsCameraReady] = useState<boolean>(false);
    const [mediaUri, setMediaUri] = useState<string | undefined>(undefined);
    const [mediaType, setMediaType] = useState<string>("unknown");
    const [pickMode, setPickMode] = useState<boolean>(false);
    const [tempVideoUri, setTempVideoUri] = useState('');
    const [isVideoMode, setIsVideoMode] = useState<boolean>(false);
    const [recordingDuration, setRecordingDuration] = useState(0);
    const cameraRef = useRef<CameraView>(null);
    const timerRef = useRef<NodeJS.Timeout | null>(null);
    const [hasPermission, setHasPermission] = useState<boolean | null>(null);

    useEffect(() => {
        (async () => {
            const cameraStatus = await Camera.requestCameraPermissionsAsync();
            const audioStatus = await Camera.requestMicrophonePermissionsAsync();
            const mediaLibraryStatus = await MediaLibrary.requestPermissionsAsync();
            setHasPermission(
                cameraStatus.status === 'granted' &&
                audioStatus.status === 'granted' &&
                mediaLibraryStatus.status === 'granted'
            );
        })();

        return () => {
            if (timerRef.current) {
                clearInterval(timerRef.current);
            }
        };
    }, []);

    function toggleCameraFacing() {
        setFacing(current => (current === 'back' ? 'front' : 'back'));
    }

    async function setMedia(uri: string) {
        const customDirectory = `${FileSystem.cacheDirectory}my_custom_folder/`;
        await FileSystem.makeDirectoryAsync(customDirectory, { intermediates: true });
        const fileExtension = uri.split('.').pop();
        const fileName = `photo_${Date.now()}.${fileExtension}`;
        const customUri = `${customDirectory}${fileName}`;
        await FileSystem.moveAsync({
            from: uri,
            to: customUri,
        });
        console.log('Media saved to:', customUri);
        setMediaUri(customUri);
    }

    async function takePicture() {
        if (cameraRef.current && isCameraReady) {
            try {
                const photo: CameraCapturedPicture | undefined = await cameraRef.current.takePictureAsync();
                setMediaType("image");
                setMedia(photo!.uri);
            } catch (error) {
                console.error('Error taking picture:', error);
            }
        }
    };

    async function startRecording() {
        if (cameraRef.current && isCameraReady) {
            try {
                setIsRecording(true);
                setRecordingDuration(0);

                timerRef.current = setInterval(() => {
                    setRecordingDuration((prev) => prev + 1);
                }, 1000);

                const videoRecordPromise = cameraRef.current.recordAsync({ maxDuration: 300 });
                if (videoRecordPromise) {
                    const data = await videoRecordPromise;
                    setTempVideoUri(data!.uri);
                    console.log('Video recorded at', data?.uri);
                }
            } catch (error) {
                console.error('Error recording video:', error);
                setIsRecording(false);
                cameraRef.current.stopRecording();
                if (timerRef.current) {
                    clearInterval(timerRef.current);
                }
            }
        }
    };

    function stopRecording() {
        if (cameraRef.current && isRecording) {
            setIsRecording(false);
            cameraRef.current.stopRecording();
            if (timerRef.current) {
                clearInterval(timerRef.current);
            }
        }
    };

    function toggleRecording() {
        if (isRecording) {
            stopRecording();
        } else {
            startRecording();
        }
    };

    const onCameraReady = (): void => {
        setIsCameraReady(true);
    };

    function setImageMode() {
        if (cameraRef.current && isRecording) {
            setIsRecording(false);
            setTempVideoUri('');
            cameraRef.current.stopRecording();
        }
        setIsVideoMode(false);
    }

    function handleCapture() {
        if (!isCameraReady) {
            ToastAndroid.show('相机尚未准备好。', ToastAndroid.SHORT);
            return;
        }
        if (isVideoMode) {
            toggleRecording();
        }
        else {
            takePicture();
        }
    }

    async function handlePost() {
        if (mediaUri) {
            try {
                setMediaType("unknown");
                setMediaUri(undefined);
                router.push({ pathname: '/PostScreen', params: { type: mediaType, uri: mediaUri } });
            } catch (error) {
                console.log(error);
            }
        }
    }

    async function handleSave() {
        if (mediaUri) {
            try {
                const asset = await MediaLibrary.createAssetAsync(mediaUri);
                ToastAndroid.show(`保存成功。 (${asset.filename})`, ToastAndroid.SHORT);
            } catch (error) {
                console.log(error);
            }
        }
    };

    async function handlePick() {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (status !== 'granted') {
            alert('Sorry, we need camera roll permissions to make this work!');
            return;
        }

        // Launch the image picker
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setMediaType(result.assets[0].type === 'video' ? 'video' : 'image');
            setMedia(result.assets[0].uri);
            setPickMode(true)
        }
    }

    const closePreview = () => {
        setMediaUri(undefined);
    };

    if (hasPermission === false) {
        return (
            <View style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                padding: 20,
            }}>
                <Text>No access to camera</Text>
            </View>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="light-content" />
            <CameraView onCameraReady={onCameraReady} style={[styles.view, { display: mediaUri === undefined ? 'flex' : 'none' }]} facing={facing} ref={cameraRef} >
            </CameraView>
            <View style={[styles.previewContainer, { display: mediaUri === undefined ? 'none' : 'flex' }]}>
                {mediaType === "video" ?
                    <Video
                        source={{ uri: mediaUri as string }}
                        useNativeControls={false}
                        shouldPlay
                        isLooping={true}
                        isMuted={true}
                        resizeMode={ResizeMode.CONTAIN}
                        style={{ width: '100%', height: '100%' }}
                        onError={(error) => {
                            console.error('Video loading error:', error);
                        }}

                    /> :
                    (mediaType == "image" ?
                        <Image
                            source={{ uri: mediaUri }}
                            style={{ width: '100%', height: '100%', resizeMode: 'contain' }}
                            onError={(error) => {
                                console.error('Video loading error:', error);
                            }}
                        /> :
                        <Text style={{ color: 'rgba(255, 255, 255, 1)', fontSize: 15 }}>文件无法播放</Text>
                    )
                }
                <View style={styles.captureContainer}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '50%' }}>
                        <IconButton onPress={handlePost} size={55} iconSource={ICON_CONFIRM} />
                        <IconButton onPress={handleSave} size={55} iconSource={ICON_SAVE} />
                        <IconButton onPress={closePreview} size={55} iconSource={ICON_CANCEL} />
                    </View>
                </View>
            </View>
            <View style={[styles.topBar, { display: mediaUri === undefined ? 'flex' : 'none' }]}>
                <IconButton onPress={() => router.back()} size={25} iconSource={ICON_BACK} />
                <View style={styles.musicContainer}>
                    <TouchableOpacity style={styles.musicButton}>
                        <Image source={ICON_MUSIC} style={{ width: 20, height: 20 }} />
                        <Text style={styles.musicButtonText}>选择音乐</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={[styles.rightBar, { display: mediaUri === undefined ? 'flex' : 'none' }]}>
                <View style={styles.blur}></View>
                <View style={styles.content}>
                    <IconButton onPress={toggleCameraFacing} size={24} iconSource={ICON_FLIP} iconStyle={styles.iconButton} />
                    <IconButton size={24} iconSource={ICON_SPEED} iconStyle={styles.iconButton} />
                    <IconButton size={24} iconSource={ICON_BEAUTY} iconStyle={styles.iconButton} />
                    <IconButton size={24} iconSource={ICON_FILTER} iconStyle={styles.iconButton} />
                    <IconButton size={24} iconSource={ICON_TIMER} iconStyle={styles.iconButton} />
                    <IconButton size={24} iconSource={ICON_UNION} iconStyle={styles.iconButton} />
                </View>
            </View>
            <View style={[styles.contols, { display: mediaUri === undefined ? 'flex' : 'none' }]}>
                <View style={styles.captureContainer}>
                    <IconButton onPress={handleCapture} size={55} iconSource={
                        isVideoMode ?
                            (isRecording ? ICON_RECORDSTOP : ICON_RECORDSTART) :
                            ICON_CAPTURE
                    } />
                </View>
                <View style={styles.itemTopContainer}>
                    <IconTextButton onPress={() => setImageMode()} iconStyle={styles.item} size={26} iconSource={ICON_PHOTO} text={'照片'} />
                </View>
                <View style={styles.itemMediumContainer}>
                    <IconTextButton iconStyle={styles.item} size={26} iconSource={ICON_SPLIT} text={'分段拍'} />
                    <IconTextButton onPress={() => setIsVideoMode(true)} iconStyle={styles.item} size={26} iconSource={ICON_VIDEO} text={'视频'} />
                </View>
                <View style={styles.itemBottomContainer}>
                    <IconTextButton iconStyle={styles.item} size={26} iconSource={ICON_EFFECT} text={'特效'} />
                    <IconTextButton onPress={handlePick} iconStyle={styles.item} size={26} iconSource={ICON_ALBUM} text={'相册'} />
                </View>
                {isRecording && <View style={styles.timeContainer}>
                    <Text style={{ color: 'rgba(255, 255, 255, 1)', fontSize: 20 }}>{`${Math.floor(recordingDuration / 60).toString().padStart(2, '0')}:${(recordingDuration % 60).toString().padStart(2, '0')}`}</Text>
                </View>}
                <View style={styles.bottomBar}>
                    <TextButton text='文字' fontSize={15} />
                    <TextButton text='特效' fontSize={15} />
                    <TextButton text='滤镜' fontSize={15} />
                    <TextButton text='开启道具' fontSize={15} />
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    view: {
        flex: 1,
        width: '100%',
        height: '100%',
        backgroundColor: '#000'
    },
    contols: {
        alignItems: 'center'
    },
    topBar: {
        position: 'absolute',
        flexDirection: 'row',
        marginHorizontal: 20,
        top: 50,
        left: 0,
        right: 0,
    },
    musicContainer: {
        width: SCREEN_WIDTH - 110,
        marginHorizontal: 10,
        alignItems: 'center'
    },
    musicButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 5,
    },
    musicButtonText: {
        color: 'white',
        marginLeft: 5,
    },
    rightBar: {
        position: 'absolute',
        right: 5,
        top: 60,
    },
    blur: {
        borderRadius: 30,
        width: 50,
        height: 320,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: 'rgba(0, 0, 0, 0.5)',
        backgroundColor: 'background: rgba(81, 81, 81, 0.5)',
    },
    content: {
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingVertical: 10,
        transform: [{ translateY: -300 }],
    },
    iconButton: {
        marginVertical: 10,
    },
    bottomBar: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 70,
        paddingBottom: 20,
        borderTopWidth: 1,
        borderTopColor: 'rgba(255, 255, 255, 1)',
        backgroundColor: 'rgba(81, 81, 81, 0.3)',
    },
    bottomButton: {
        alignItems: 'center',
    },
    bottomButtonText: {
        color: 'white',
    },
    captureContainer: {
        position: 'absolute',
        bottom: 100,
        alignItems: 'center',
        width: '100%'
    },
    item: {
        paddingHorizontal: 5,
        paddingVertical: 10,
        marginHorizontal: 5,
        marginVertical: 12,
        zIndex: 5
    },
    itemTopContainer: {
        position: 'absolute',
        bottom: 170,
        width: '100%'
    },
    itemMediumContainer: {
        position: 'absolute',
        bottom: 145,
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: 155
    },
    itemBottomContainer: {
        position: 'absolute',
        bottom: 90,
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: 200
    },
    timeContainer: {
        position: 'absolute',
        bottom: 110,
        flexDirection: 'row',
        width: '90%'
    },
    previewContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.9)',
    },
    previewImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
    },
});