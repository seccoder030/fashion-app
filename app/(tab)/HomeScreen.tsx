import HomeTopTabBar from '@/components/HomeTopTabBar';
import MediaPage from '@/components/MediaPage';
import { BACKGROUND_COLOR, HOMETOP_TAPBAR_HEIGHT } from '@/constants/Config';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';

const tabs = ['精选', '推荐', '校友圈'];

export default function HomeScreen() {
    const [currentPage, setCurrentPage] = useState(1);

    return (
        <View style={styles.container}>
            <HomeTopTabBar tabs={tabs} currentPage={currentPage} setCurrentPage={setCurrentPage} />
            {tabs.map((item, index) => (
                currentPage === index && <MediaPage key={index} page={index} />
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: HOMETOP_TAPBAR_HEIGHT,
        backgroundColor: BACKGROUND_COLOR
    },
    view: {
        width: '100%',
        height: '100%',
    }
});