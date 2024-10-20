import Blank from '@/components/Blank';
import CategoryView from '@/components/CategoryView';
import Loading from '@/components/Loading';
import { useAuth } from '@/components/navigation/Authentication';
import TextButton from '@/components/TextButton';
import { BACKGROUND_COLOR, SCREEN_HEIGHT } from '@/constants/Config';
import Request from '@/utils/request';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { SafeAreaView, StatusBar, StyleSheet, Text, View } from 'react-native';

export default function CategoryScreen() {
    const { token, user, updateUserCategories } = useAuth();
    const [categories, setCategories] = useState<ICategory[] | null>(null);
    const [checkedCategories, setCheckedCategories] = useState<Set<string>>(new Set());

    useEffect(() => {
        async function fetchData() {
            if (token) {
                try {
                    Request.setAuthorizationToken(token);
                    const res = await Request.Get(`/category`);
                    if (res.status) {
                        setCategories(res.data);
                        if (user?.categories) {
                            user.categories.forEach((item: string) => {
                                setCheckedCategories(prevChecked => {
                                    const newChecked = new Set(prevChecked);
                                    newChecked.add(item);
                                    return newChecked;
                                });
                            });
                        }
                    }
                } catch (error) {
                    console.error('Error fetching categories:', error);
                }
            }
        }
        fetchData();
    }, [token]);

    if (!categories) {
        return (
            <SafeAreaView style={styles.container}>
                <StatusBar barStyle="light-content" />
                <View style={styles.viewColor}>
                    <Loading backgroundColor={'transparent'} />
                </View>
            </SafeAreaView>
        );
    }

    if (categories.length === 0) {
        return (
            <SafeAreaView style={styles.container}>
                <StatusBar barStyle="light-content" />
                <View style={styles.viewColor}>
                    <Blank />
                </View>
            </SafeAreaView>
        );
    }

    const handleNext = async () => {
        if (categories && token) {
            var data = Array();
            checkedCategories.forEach(item => {
                data.push(item);
            });
            const status = await updateUserCategories(data);
            if (status) router.replace('/HomeScreen');
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="light-content" />
            <View style={styles.viewColor}>
                <View style={styles.contentCategories}>
                    <View style={styles.titleContainer}>
                        <Text style={styles.title}>请选择您关注的类别</Text>
                    </View>
                    <CategoryView categories={categories} checkedCategories={checkedCategories} setCheckedCategories={setCheckedCategories} />
                    <View style={styles.nextButton}>
                        <TextButton onPress={handleNext} text='选       择' backgroundColor={'rgba(255, 0, 153, 1)'} borderRadius={10} paddingHorizontal={35} paddingVertical={5} fontSize={25} />
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    viewColor: {
        flex: 1,
        backgroundColor: BACKGROUND_COLOR
    },
    contentCategories: {
        marginHorizontal: 20
    },
    contentContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        zIndex: 50
    },
    titleContainer: {
        height: SCREEN_HEIGHT * 0.25,
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    title: {
        marginBottom: 30,
        color: 'rgba(255, 255, 255, 1)',
        fontSize: 25
    },
    content: {
        alignItems: 'center',
        height: SCREEN_HEIGHT * 0.5,
        paddingHorizontal: 20,
        paddingVertical: 20,
        borderWidth: 1,
        borderRadius: 20,
        borderColor: 'rgba(255, 255, 255, 1)',
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
    },
    nextButton: {
        alignItems: 'center',
        marginVertical: 25
    }
});