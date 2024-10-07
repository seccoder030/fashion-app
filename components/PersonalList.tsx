import { BOTTOM_TAPBAR_HEIGHT, ICON_COMMENT, ICON_HEARTFILL, IMAGE_BG, IMAGE_BG10, IMAGE_BG2, IMAGE_BG3, IMAGE_BG4, IMAGE_BG5, IMAGE_BG6, IMAGE_BG7, IMAGE_BG8, IMAGE_BG9 } from '@/constants/Config';
import { useRouter } from 'expo-router';
import React from 'react';
import { FlatList, Image, ImageSourcePropType, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import ImageButton from './ImageButton';

interface Item {
    id: string;
    imageUrl: ImageSourcePropType;
    caption: string;
    likes: number;
    comments: number;
}


const PersonalList  = () => {
    const router = useRouter();

    const feedItems: Item[] = [
        { id: '1', imageUrl: IMAGE_BG2, caption: '在此输入您的标题。', likes: 878, comments: 1208 },
        { id: '2', imageUrl: IMAGE_BG3, caption: '在此输入您的标题。', likes: 351, comments: 1335 },
        { id: '3', imageUrl: IMAGE_BG4, caption: '在此输入您的标题。', likes: 242, comments: 4231 },
        { id: '4', imageUrl: IMAGE_BG5, caption: '在此输入您的标题。', likes: 313, comments: 3131 },
        { id: '5', imageUrl: IMAGE_BG6, caption: '在此输入您的标题。', likes: 878, comments: 1208 },
        { id: '6', imageUrl: IMAGE_BG7, caption: '在此输入您的标题。', likes: 351, comments: 1335 },
        { id: '7', imageUrl: IMAGE_BG8, caption: '在此输入您的标题。', likes: 242, comments: 4231 },
        { id: '8', imageUrl: IMAGE_BG9, caption: '在此输入您的标题。', likes: 313, comments: 3131 },
        { id: '9', imageUrl: IMAGE_BG10, caption: '在此输入您的标题。', likes: 878, comments: 1208 },
        { id: '10', imageUrl: IMAGE_BG, caption: '在此输入您的标题。', likes: 351, comments: 1335 },
        // Add more items as needed
    ];

    function handleItem() {
        router.push('/(main)/screens/SearchDetailScreen');
    }

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.contentContainer} showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
                {feedItems.map((item) => (
                    <Pressable onPress={handleItem} key={item.id} style={styles.card}>
                        <Image source={item.imageUrl} style={styles.cardImage} />
                    </Pressable >
                ))}
                <View style={styles.space}></View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: 10,
        marginTop: 10
    },
    contentContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        padding: 10,
        zIndex: 50
    },
    space: {
        width: '100%',
        height: BOTTOM_TAPBAR_HEIGHT,
    },
    card: {
        width: '32.5%',
        aspectRatio: 0.7,
        marginBottom: 5,
        overflow: 'hidden',
        borderColor: 'rgba(255, 255, 255, 1)',
        borderWidth: 1,
        backgroundColor: 'rgba(1, 1, 1, 0.15)'
    },
    cardImage: {
        width: '100%',
        height: '100%',
    },
});

export default PersonalList ;