import React from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    TouchableOpacityProps
} from 'react-native';

interface DetailButtonProps extends TouchableOpacityProps {
    text: string;
    borderRadius?: number;
    paddingHorizontal?: number;
    paddingVertical?: number;
}

const DetailButton: React.FC<DetailButtonProps> = ({
    onPress,
    text,
    borderRadius = 0,
    paddingHorizontal = 0,
    paddingVertical = 0,
    ...props
}) => {
    const styles = StyleSheet.create({
        button: {
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0)',
            borderRadius: borderRadius,
            paddingHorizontal: paddingHorizontal,
            paddingVertical: paddingVertical
        },
        buttontext: {
            color: 'white',
            fontSize: 10,
        }
    });

    return (
        <TouchableOpacity onPress={onPress} style={styles.button} {...props}>
            <Text style={styles.buttontext}>{text}</Text>
        </TouchableOpacity>
    );
};

export default DetailButton;