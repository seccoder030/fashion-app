import CategoryTag from '@/components/CategoryTag';
import { SCREEN_HEIGHT } from '@/constants/Config';
import React, { Dispatch, SetStateAction } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

type CheckedCategoriesState = Set<string>;
type SetCheckedCategoriesFunction = Dispatch<SetStateAction<CheckedCategoriesState>>;

interface CategoryViewProps {
    categories: ICategory[];
    checkedCategories: CheckedCategoriesState;
    setCheckedCategories: SetCheckedCategoriesFunction;
    height?: number;
}

const CategoryView: React.FC<CategoryViewProps> = ({
    categories,
    checkedCategories,
    setCheckedCategories,
    height = SCREEN_HEIGHT * 0.5,
}) => {
    const handlePress = (id: string) => {
        setCheckedCategories(prevChecked => {
            const newChecked = new Set(prevChecked);
            if (newChecked.has(id)) {
                newChecked.delete(id);
            } else {
                newChecked.add(id);
            }
            return newChecked;
        });
    };

    return (
        <View style={[styles.content, { height: height }]}>
            <ScrollView contentContainerStyle={styles.contentContainer}>
                {categories.map((item, index) => (
                    <CategoryTag
                        key={index}
                        onPress={() => handlePress(item.id)}
                        text={item.name}
                        checked={checkedCategories.has(item.id)}
                    />
                ))}
                <View></View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    contentContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        zIndex: 50
    },
    content: {
        alignItems: 'center',
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

export default CategoryView;