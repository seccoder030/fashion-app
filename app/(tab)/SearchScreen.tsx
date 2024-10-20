import ImageList from '@/components/ImageList';
import Loading from '@/components/Loading';
import SearchTopTabBar from '@/components/SearchTopTabBar';
import { BACKGROUND_GRADIENT_COLOR, SEARCHTOP_TAPBAR_HEIGHT } from '@/constants/Config';
import { useAuth } from '@/context/Authentication';
import Request from '@/utils/request';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useState } from 'react';
import { SafeAreaView, StatusBar, StyleSheet } from 'react-native';

export default function SearchScreen() {
    const { token, user } = useAuth();
    const [currentPage, setCurrentPage] = useState(-1);
    const [search, setSearch] = useState('');
    const [categories, setCategories] = useState<string[] | null>(null);

    useEffect(() => {
        async function fetchData() {
            if (token) {
                try {
                    Request.setAuthorizationToken(token);
                    const res = await Request.Get(`/category`);
                    if (res.status) {
                        setCategories(res.data.map((item: { name: string }) => item.name));
                    }
                } catch (error) {
                    console.error('Error fetching categories:', error);
                }
            }
        }
        fetchData();
    }, [])

    if (!categories) {
        return (
            <SafeAreaView style={styles.container}>
                <StatusBar barStyle="light-content" />
                <LinearGradient
                    colors={BACKGROUND_GRADIENT_COLOR}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.gradient}
                >
                    <Loading backgroundColor={'transparent'} />
                </LinearGradient>
            </SafeAreaView>
        );
    }

    return (
        <LinearGradient
            colors={BACKGROUND_GRADIENT_COLOR}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.gradient}
        >
            <SearchTopTabBar tabs={categories} currentPage={currentPage} setCurrentPage={setCurrentPage} search={search} setSearch={setSearch} />
            {search ?
                <ImageList search={search} /> :
                currentPage == -1 ?
                    <ImageList /> :
                    <ImageList search={categories[currentPage]} />
            }
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    gradient: {
        flex: 1,
        paddingTop: SEARCHTOP_TAPBAR_HEIGHT,
    },
});