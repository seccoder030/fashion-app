import Blank from '@/components/Blank';
import CategoryView from '@/components/CategoryView';
import Loading from '@/components/Loading';
import TextButton from '@/components/TextButton';
import { SCREEN_HEIGHT } from '@/constants/Config';
import { useAuth } from '@/components/navigation/Authentication';
import Request from '@/utils/request';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface EditCategoryProps {
    visible?: boolean;
}

const EditCategory: React.FC<EditCategoryProps> = ({
    visible = true
}) => {
    const { token, user, updateUserCategories } = useAuth();
    const [categories, setCategories] = useState<ICategory[] | null>(null);
    const [checkedCategories, setCheckedCategories] = useState<Set<string>>(new Set());

    useEffect(() => {
        async function fetchData() {
            if (token) {
                try {
                    Request.setAuthorizationToken(token);
                    const res = await Request.Get(`/category/get_categories`);
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
                } catch (error) {
                    console.error('Error fetching categories:', error);
                }
            }
        }
        fetchData();
    }, []);

    if (!categories) {
        if (!visible) return null;
        return <Loading backgroundColor={'transparent'} />
    }

    if (categories.length === 0) {
        if (!visible) return null;
        return <Blank />
    }

    const handleSave = async () => {
        if (categories && token) {
            var data = Array();
            checkedCategories.forEach(item => {
                data.push(item);
            });
            await updateUserCategories(data);
        }
    };

    return (
        <View style={[styles.contentCategories, { display: visible ? 'flex' : 'none' }]}>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>请选择您关注的类别</Text>
            </View>
            <CategoryView categories={categories} checkedCategories={checkedCategories} setCheckedCategories={setCheckedCategories} height={250} />
            <View style={styles.saveButton}>
                <TextButton onPress={handleSave} text='保       管' backgroundColor={'rgba(255, 0, 153, 1)'} borderRadius={10} paddingHorizontal={35} paddingVertical={5} fontSize={15} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    gradient: {
        flex: 1,
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
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginTop: 35,
        marginBottom: 10
    },
    title: {
        color: 'rgba(255, 255, 255, 1)',
        fontSize: 17
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
    saveButton: {
        alignItems: 'center',
        marginVertical: 25
    }
});

export default EditCategory;