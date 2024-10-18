import React, { useState } from 'react';
import {
    ColorValue,
    Pressable,
    StyleSheet,
    Text,
    TouchableOpacityProps
} from 'react-native';

interface CategoryTagProps extends TouchableOpacityProps {
    text: string;
    checked?: boolean;
}

const CategoryTag: React.FC<CategoryTagProps> = ({
    onPress,
    text,
    checked = false,
    ...props
}) => {
    const styles = StyleSheet.create({
        button: {
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: checked ? 'rgba(255, 0, 153, 1)' : 'rgba(255, 255, 255, 1)',
            borderRadius: 10,
            paddingHorizontal: 15,
            paddingVertical: 5,
            margin: 5

        },
        buttontext: {
            color: 'rgba(0, 0, 0, 1)',
            fontSize: 15
        }
    });

    return (
        <Pressable onPress={onPress} style={styles.button} {...props}>
            <Text style={styles.buttontext}>{text}</Text>
        </Pressable>
    );
};

export default CategoryTag;