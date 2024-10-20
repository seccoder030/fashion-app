import HomeTopTabBar from '@/components/HomeTopTabBar';
import MediaPage from '@/components/MediaPage';
import { BACKGROUND_GRADIENT_COLOR, HOMETOP_TAPBAR_HEIGHT } from '@/constants/Config';
import { LinearGradient } from 'expo-linear-gradient';
import { useEffect, useRef, useState } from 'react';
import { StyleSheet } from 'react-native';

const tabs = ['精选', '推荐', '校友圈'];

export default function HomeScreen() {
    const [currentPage, setCurrentPage] = useState(2);

    return (
        <LinearGradient
            colors={BACKGROUND_GRADIENT_COLOR}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.gradient}
        >
            <HomeTopTabBar tabs={tabs} currentPage={currentPage} setCurrentPage={setCurrentPage} />
            {tabs.map((item, index) => (
                currentPage === index && <MediaPage key={index} page={index} />
            ))}
        </LinearGradient >
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    gradient: {
        flex: 1,
        paddingTop: HOMETOP_TAPBAR_HEIGHT,
    },
    view: {
        width: '100%',
        height: '100%',
    }
});