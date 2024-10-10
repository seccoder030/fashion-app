import { Ionicons } from '@expo/vector-icons';
import { CameraType, CameraView, useCameraPermissions } from 'expo-camera';
import React, { useRef, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Modal, Image } from 'react-native';

export default function PostScreen() {
    const [facing, setFacing] = useState<CameraType>('back');
    const [permission, requestPermission] = useCameraPermissions();
    const [capturedImage, setCapturedImage] = useState<string | null>(null);
    const cameraRef = useRef<CameraView>(null);

    if (!permission) {
        // Camera permissions are still loading.
        return <View />;
    }

    if (!permission.granted) {
        // Camera permissions are not granted yet.
        requestPermission();
    }

    function toggleCameraFacing() {
        setFacing(current => (current === 'back' ? 'front' : 'back'));
    }

    async function takePicture() {
        if (cameraRef.current) {
            const photo = await cameraRef.current.takePictureAsync();
            console.log(photo);
            if (photo != undefined) setCapturedImage(photo.uri);
        }
    }

    const closeImagePreview = () => {
        setCapturedImage(null);
    };

    return (
        <View style={styles.container}>
            <CameraView style={styles.camera} facing={facing} ref={cameraRef}>
                <View style={styles.topBar}>
                    <TouchableOpacity style={styles.backButton}>
                        <Ionicons name="arrow-back" size={24} color="white" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.musicButton}>
                        <Ionicons name="musical-note" size={24} color="white" />
                        <Text style={styles.musicButtonText}>选择音乐</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.rightBar}>
                    <TouchableOpacity style={styles.iconButton}>
                        <Ionicons name="eye" size={24} color="white" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.iconButton}>
                        <Ionicons name="timer-outline" size={24} color="white" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.iconButton}>
                        <Ionicons name="star-outline" size={24} color="white" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.iconButton}>
                        <Ionicons name="cloud-upload-outline" size={24} color="white" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.iconButton}>
                        <Ionicons name="settings-outline" size={24} color="white" />
                    </TouchableOpacity>
                </View>
                <View style={styles.bottomBar}>
                    <TouchableOpacity style={styles.bottomButton}>
                        <Text style={styles.bottomButtonText}>文字</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.bottomButton} onPress={toggleCameraFacing}>
                        <Text style={styles.bottomButtonText}>特效</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.captureButton} onPress={takePicture} />
                    <TouchableOpacity style={styles.bottomButton}>
                        <Text style={styles.bottomButtonText}>滤镜</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.bottomButton}>
                        <Text style={styles.bottomButtonText}>开启道具</Text>
                    </TouchableOpacity>
                </View>
            </CameraView>

            <Modal visible={capturedImage !== null} transparent={true} animationType="slide">
                <View style={styles.modalContainer}>
                    <Image source={{ uri: capturedImage ?? undefined }} style={styles.previewImage} />
                    <TouchableOpacity style={styles.closeButton} onPress={closeImagePreview}>
                        <Ionicons name="close" size={32} color="white" />
                    </TouchableOpacity>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center'
    },
    camera: {
        flex: 1,
    },
    topBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 20,
    },
    backButton: {
        padding: 10,
    },
    musicButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 20,
    },
    musicButtonText: {
        color: 'white',
        marginLeft: 5,
    },
    rightBar: {
        position: 'absolute',
        right: 20,
        top: '25%',
    },
    iconButton: {
        marginVertical: 10,
    },
    bottomBar: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        position: 'absolute',
        bottom: 20,
        left: 0,
        right: 0,
    },
    bottomButton: {
        alignItems: 'center',
    },
    bottomButtonText: {
        color: 'white',
    },
    captureButton: {
        width: 70,
        height: 70,
        borderRadius: 35,
        backgroundColor: 'red',
        borderWidth: 5,
        borderColor: 'white',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.9)',
    },
    previewImage: {
        width: '90%',
        height: '90%',
        resizeMode: 'contain',
    },
    closeButton: {
        position: 'absolute',
        top: 40,
        right: 20,
    },
});