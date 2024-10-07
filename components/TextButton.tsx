import { TEXT_FONT_SIZE } from '@/constants/Config';
import React from 'react';
import {
    TouchableOpacity,
    Text,
    StyleSheet,
    TouchableOpacityProps,
    View,
    ColorValue,
} from 'react-native';

interface TextButtonProps extends TouchableOpacityProps {
    text: string;
    backgroundColor: ColorValue;
    borderRadius?: number;
    paddingHorizontal?: number;
    paddingVertical?: number;
}

const TextButton: React.FC<TextButtonProps> = ({
    onPress,
    text,
    backgroundColor,
    borderRadius = 0,
    paddingHorizontal = 0,
    paddingVertical = 0,
    ...props
}) => {
    const styles = StyleSheet.create({
        button: {
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: backgroundColor,
            borderRadius: borderRadius,
            paddingHorizontal: paddingHorizontal,
            paddingVertical: paddingVertical
        },
        buttontext: {
            color: 'white',
            fontSize: TEXT_FONT_SIZE,
        }
    });

    return (
        <TouchableOpacity onPress={onPress} style={styles.button} {...props}>
            <Text style={styles.buttontext}>{text}</Text>
        </TouchableOpacity>
    );
};

export default TextButton;