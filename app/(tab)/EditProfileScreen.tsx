import EditCategory from '@/components/EditCategory';
import EditProfile from '@/components/EditProfile';
import IconButton from '@/components/IconButton';
import { useAuth } from '@/components/navigation/Authentication';
import { BACKGROUND_COLOR, ICON_AVATAR, ICON_CAMERA, ICON_CAMERAFILL, ICON_HEARTLINE, ICON_LISTLINE, IMAGE_PROFILEBG, SCREEN_HEIGHT, SCREEN_WIDTH } from '@/constants/Config';
import * as ImagePicker from 'expo-image-picker';
import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, View } from 'react-native';

export default function EditProfileScreen() {
    const { user } = useAuth();
    const [activeTab, setActiveTab] = useState(true);
    const [profileBg, setProfileBg] = useState<string | undefined>(undefined);
    const [avatar, setAvatar] = useState<string | undefined>(undefined);

    useEffect(() => {
        if (user) {
            setAvatar(user.avatar);
        }
    }, [user])

    const handleTab = (mode: boolean) => {
        setActiveTab(mode)
    }

    const getAsset = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (status !== 'granted') {
            alert('Sorry, we need camera roll permissions to make this work!');
            return;
        }

        // Launch the image picker
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            return result.assets[0].uri;
        } else return null;
    }

    const handleProfileBg = async () => {
        const uri = await getAsset();
        if (uri) setProfileBg(uri);
    }

    const handleAvatar = async () => {
        const uri = await getAsset();
        if (uri) setAvatar(uri);
    }

    return (
        <View style={styles.container}>
            <View style={styles.topContainer}>
                <Image source={profileBg ? { uri: profileBg } : IMAGE_PROFILEBG} style={styles.profileBg} />
                <View style={styles.changeProfileBg}>
                    <IconButton onPress={handleProfileBg} size={52} iconSource={ICON_CAMERAFILL} />
                </View>
                <Image source={avatar ? { uri: avatar } : ICON_AVATAR} style={styles.profileUser} />
                <View style={styles.changeProfileUser}>
                    <IconButton onPress={handleAvatar} size={27} iconSource={ICON_CAMERA} />
                </View>
            </View>
            <View style={styles.tabContainer}>
                <IconButton onPress={() => handleTab(true)} size={20} iconSource={ICON_LISTLINE} style={[styles.tabButton, activeTab && styles.activeTab]} />
                <IconButton onPress={() => handleTab(false)} size={20} iconSource={ICON_HEARTLINE} style={[styles.tabButton, !activeTab && styles.activeTab]} />
            </View>
            <EditProfile visible={activeTab} profileBg={profileBg} avatar={avatar} />
            <EditCategory visible={!activeTab} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: BACKGROUND_COLOR
    },
    topContainer: {
        alignItems: 'center',
        marginBottom: 20,
    },
    profileBg: {
        width: '100%',
        height: SCREEN_HEIGHT * 0.3,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
    },
    changeProfileBg: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: SCREEN_HEIGHT * 0.3,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        backgroundColor: 'rgba(0, 0, 0, 0.3)'
    },
    profileUser: {
        alignItems: 'center',
        width: SCREEN_WIDTH * 0.25,
        height: SCREEN_WIDTH * 0.25,
        borderRadius: SCREEN_WIDTH * 0.25,
        marginTop: -(SCREEN_WIDTH * 0.125)
    },
    changeProfileUser: {
        justifyContent: 'center',
        alignItems: 'center',
        width: SCREEN_WIDTH * 0.25,
        height: SCREEN_WIDTH * 0.25,
        borderRadius: SCREEN_WIDTH * 0.25,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        borderWidth: 2,
        borderColor: 'rgba(255, 255, 255, 1)',
        marginTop: -(SCREEN_WIDTH * 0.25)
    },
    tabContainer: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderColor: 'rgba(79, 158, 191, 1)',
    },
    tabButton: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 5,
        width: SCREEN_WIDTH / 2,
        height: SCREEN_WIDTH / 10,
    },
    activeTab: {
        borderBottomWidth: 2,
        borderColor: 'rgba(79, 158, 191, 1)',
    }
});