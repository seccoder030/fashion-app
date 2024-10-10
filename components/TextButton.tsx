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
    textColor?: ColorValue;
    borderRadius?: number;
    paddingHorizontal?: number;
    paddingVertical?: number;
    fontSize?: number;
}

const TextButton: React.FC<TextButtonProps> = ({
    onPress,
    text,
    backgroundColor,
    textColor = 'rgba(255, 255, 255, 1)',
    borderRadius = 0,
    paddingHorizontal = 0,
    paddingVertical = 0,
    fontSize = 13,
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
            color: textColor,
            fontSize: fontSize,
        }
    });

    return (
        <TouchableOpacity onPress={onPress} style={styles.button} {...props}>
            <Text style={styles.buttontext}>{text}</Text>
        </TouchableOpacity>
    );
};

export default TextButton;