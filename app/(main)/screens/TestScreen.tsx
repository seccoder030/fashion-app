import { IMAGE_BG, IMAGE_BG2, IMAGE_BG3, IMAGE_BG4, IMAGE_BG5, IMAGE_BG6, IMAGE_BG7, IMAGE_BG8, IMAGE_BG9, IMAGE_BG10 } from '@/constants/Config';
import { Feather } from '@expo/vector-icons';
import React from 'react';
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const ContentFeedScreen = () => {
    const tabs = ['全部', '视频', '图像', '音效', '建议', '收藏夹'];
    const feedItems = [
        { id: 1, imageUrl: IMAGE_BG2, likes: 878, comments: 1208 },
        { id: 2, imageUrl: IMAGE_BG3, likes: 351, comments: 1335 },
        { id: 3, imageUrl: IMAGE_BG4, likes: 242, comments: 4231 },
        { id: 4, imageUrl: IMAGE_BG5, likes: 313, comments: 3131 },
        { id: 5, imageUrl: IMAGE_BG6, likes: 878, comments: 1208 },
        { id: 6, imageUrl: IMAGE_BG7, likes: 351, comments: 1335 },
        { id: 7, imageUrl: IMAGE_BG8, likes: 242, comments: 4231 },
        { id: 8, imageUrl: IMAGE_BG9, likes: 313, comments: 3131 },
        { id: 9, imageUrl: IMAGE_BG10, likes: 878, comments: 1208 },
        { id: 10, imageUrl: IMAGE_BG, likes: 351, comments: 1335 },
        // Add more items as needed
    ];

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.searchBar}>
                <Feather name="search" size={20} color="#888" />
                <TextInput style={styles.searchInput} placeholder="搜索" placeholderTextColor="#888" />
            </View>

            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tabBar}>
                {tabs.map((tab, index) => (
                    <TouchableOpacity key={index} style={styles.tab}>
                        <Text style={styles.tabText}>{tab}</Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>

            <ScrollView contentContainerStyle={styles.contentContainer}>
                {feedItems.map((item) => (
                    <View key={item.id} style={styles.card}>
                        <Image source={item.imageUrl} style={styles.cardImage} />
                        <View style={styles.cardFooter}>
                            <View style={styles.iconContainer}>
                                <Feather name="heart" size={16} color="#fff" />
                                <Text style={styles.iconText}>{item.likes}</Text>
                            </View>
                            <View style={styles.iconContainer}>
                                <Feather name="message-circle" size={16} color="#fff" />
                                <Text style={styles.iconText}>{item.comments}</Text>
                            </View>
                        </View>
                    </View>
                ))}
            </ScrollView>

            <View style={styles.bottomTabBar}>
                <Feather name="home" size={24} color="#fff" />
                <Feather name="search" size={24} color="#fff" />
                <View style={styles.addButton}>
                    <Feather name="plus" size={24} color="#6B5DF6" />
                </View>
                <Feather name="message-square" size={24} color="#fff" />
                <Feather name="user" size={24} color="#fff" />
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#6B5DF6',
    },
    searchBar: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 20,
        margin: 10,
        paddingHorizontal: 15,
        height: 40,
    },
    searchInput: {
        flex: 1,
        marginLeft: 10,
        fontSize: 16,
    },
    tabBar: {
        backgroundColor: '#6B5DF6',
        paddingVertical: 10,
    },
    tab: {
        paddingHorizontal: 15,
    },
    tabText: {
        color: '#fff',
        fontSize: 16,
    },
    contentContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        padding: 10,
    },
    card: {
        width: '48%',
        aspectRatio: 0.8,
        marginBottom: 10,
        borderRadius: 10,
        overflow: 'hidden',
    },
    cardImage: {
        width: '100%',
        height: '100%',
    },
    cardFooter: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    iconContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconText: {
        color: '#fff',
        marginLeft: 5,
        fontSize: 12,
    },
    bottomTabBar: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#5A4ED1',
        height: 60,
        paddingBottom: 20,
    },
    addButton: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5,
    },
});

export default ContentFeedScreen;