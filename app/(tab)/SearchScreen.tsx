import ImageList from '@/components/ImageList';
import Loading from '@/components/Loading';
import { useAuth } from '@/components/navigation/Authentication';
import SearchTopTabBar from '@/components/SearchTopTabBar';
import { BACKGROUND_COLOR, SEARCHTOP_TAPBAR_HEIGHT } from '@/constants/Config';
import Request from '@/utils/request';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';

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
            <View style={styles.container}>
                <Loading backgroundColor={'transparent'} />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <SearchTopTabBar tabs={categories} currentPage={currentPage} setCurrentPage={setCurrentPage} search={search} setSearch={setSearch} />
            {search ?
                <ImageList search={search} /> :
                currentPage == -1 ?
                    <ImageList /> :
                    <ImageList search={categories[currentPage]} />
            }
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: SEARCHTOP_TAPBAR_HEIGHT,
        backgroundColor: BACKGROUND_COLOR
    },
});