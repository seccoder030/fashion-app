import { IMAGE_BG, IMAGE_BG10, IMAGE_BG2, IMAGE_BG3, IMAGE_BG4, IMAGE_BG5, IMAGE_BG6, IMAGE_BG7, IMAGE_BG8, IMAGE_BG9 } from '@/constants/Config';
import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import ImageCard from './ImageCard';

const ImageList = () => {
    const feedItems = [
        { id: 2, imageUrl: IMAGE_BG3, caption: 'images', likes: 351, comments: 1335 },
        { id: 1, imageUrl: IMAGE_BG2, caption: 'images', likes: 878, comments: 1208 },
        { id: 3, imageUrl: IMAGE_BG4, caption: 'images', likes: 242, comments: 4231 },
        { id: 4, imageUrl: IMAGE_BG5, caption: 'images', likes: 313, comments: 3131 },
        { id: 5, imageUrl: IMAGE_BG6, caption: 'images', likes: 878, comments: 1208 },
        { id: 6, imageUrl: IMAGE_BG7, caption: 'images', likes: 351, comments: 1335 },
        { id: 7, imageUrl: IMAGE_BG8, caption: 'images', likes: 242, comments: 4231 },
        { id: 8, imageUrl: IMAGE_BG9, caption: 'images', likes: 313, comments: 3131 },
        { id: 9, imageUrl: IMAGE_BG10, caption: 'images', likes: 878, comments: 1208 },
        { id: 10, imageUrl: IMAGE_BG, caption: 'images', likes: 351, comments: 1335 },
        // Add more items as needed
    ];

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.contentContainer}>
                {feedItems.map((item) => (
                    <ImageCard key={item.id} imageUrl={item.imageUrl} caption={item.caption} comments={item.comments} likes={item.likes} />
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
    },
    contentContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        padding: 10,
        zIndex: 50
    },
    space: {
        margin: 30
    }
});

export default ImageList;