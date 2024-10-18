import { useAuth } from '@/context/Authentication';
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ImageSourcePropType, StyleSheet, Text, TextInput, View } from 'react-native';
import TextButton from './TextButton';

interface Item {
    id: string;
    imageUrl: ImageSourcePropType;
    caption: string;
    likes: number;
    comments: number;
}

interface EditProfileProps {
    visible?: boolean;
    profileBg?: string | undefined;
    avatar?: string | undefined;
}

const EditProfile: React.FC<EditProfileProps> = ({
    visible = true,
    profileBg = undefined,
    avatar = undefined
}) => {
    const { user, setUser } = useAuth();
    const [name, setName] = useState('');
    const [username, setUserName] = useState('');
    const [birthday, setBirthDay] = useState<Date | null>(null);
    const [school, setSchool] = useState('');
    const [level, setLevel] = useState('');

    useEffect(() => {
        if (user) {
            if (user.name) setName(user.name);
            if (user.username) setUserName(user.username);
            if (user.birthday) setBirthDay(new Date(user.birthday));
        }
    }, [user]);

    const showMode = () => {
        DateTimePickerAndroid.open({
            value: birthday || new Date(),
            onChange: (event, date) => { if (event.type === 'set') setBirthDay(date!) },
            mode: 'date',
            is24Hour: true,
        });
    };

    const handleSave = () => {
        // setUser({})
    }

    return (
        <View style={[styles.container, { display: visible ? 'flex' : 'none' }]}>
            <View style={styles.info}>
                <View style={styles.infoItem}>
                    <Text style={styles.infoTitle}>姓       名</Text>
                    <TextInput
                        value={name}
                        onChangeText={value => setName(value)}
                        style={styles.infoText}
                        placeholder="请输入您的姓名"
                        placeholderTextColor="rgba(255, 255, 255, 0.5)"
                    />
                </View>
            </View>
            <View style={styles.info}>
                <View style={styles.infoItem}>
                    <Text style={styles.infoTitle}>用户名称</Text>
                    <TextInput
                        value={username}
                        onChangeText={value => setUserName(value)}
                        style={styles.infoText}
                        placeholder="请输入您的用户名"
                        placeholderTextColor="rgba(255, 255, 255, 0.5)"
                    />
                </View>
            </View>
            <View style={styles.info}>
                <View style={styles.infoItem}>
                    <Text style={styles.infoTitle}>性       别</Text>
                    <Text
                        onPress={() => showMode()}
                        style={[styles.infoText, { padding: 5, color: birthday ? 'rgba(255, 255, 255, 1)' : 'rgba(255, 255, 255, 0.5)' }]}
                    >
                        {birthday ? birthday.toLocaleDateString() : "请输入您的姓氏"}
                    </Text>
                </View>
            </View>
            <View style={styles.info}>
                <View style={styles.infoItem}>
                    <Text style={styles.infoTitle}>出生日期</Text>
                    <TextInput
                        style={styles.infoText}
                        placeholder="请输入出生日期"
                        placeholderTextColor="rgba(255, 255, 255, 0.5)"
                    />
                </View>
            </View>
            <View style={styles.info}>
                <View style={styles.infoItem}>
                    <Text style={styles.infoTitle}>学校名称</Text>
                    <TextInput
                        style={styles.infoText}
                        placeholder="请输入学校名称"
                        placeholderTextColor="rgba(255, 255, 255, 0.5)"
                    />
                </View>
            </View>
            <View style={styles.info}>
                <View style={styles.infoItem}>
                    <Text style={styles.infoTitle}>年       级</Text>
                    <TextInput
                        style={styles.infoText}
                        placeholder="请输入您的年级"
                        placeholderTextColor="rgba(255, 255, 255, 0.5)"
                    />
                </View>
            </View>
            <View style={styles.profileButtonContainer}>
                <View style={styles.profileButton}>
                    <TextButton onPress={() => router.back()} text='取   消' backgroundColor={'rgba(255, 255, 255, 1)'} borderRadius={5} paddingHorizontal={15} paddingVertical={3} textColor={'rgba(1, 1, 1, 1)'} />
                </View>
                <View style={styles.profileButton}>
                    <TextButton onPress={handleSave} text='保   存' backgroundColor={'rgba(255, 0, 153, 1)'} borderRadius={5} paddingHorizontal={15} paddingVertical={3} />
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginVertical: 30
    },
    info: {
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 10
    },
    infoItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 30
    },
    infoTitle: {
        color: 'rgba(255, 255, 255, 1)',
        fontSize: 13,
    },
    infoText: {
        width: '50%',
        color: 'rgba(255, 255, 255, 1)',
        fontSize: 10,
        borderBottomWidth: 1,
        borderColor: 'rgba(255, 255, 255, 1)',
        marginLeft: 50,
        paddingHorizontal: 10,
    },
    profileButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        marginVertical: 30
    },
    profileButton: {
        marginHorizontal: 10
    },
});

export default EditProfile;