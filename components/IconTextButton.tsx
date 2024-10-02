import { TEXT_FONT_SIZE } from '@/constants/Config';
import React from 'react';
import {
    Image,
    ImageSourcePropType,
    ImageStyle,
    StyleSheet,
    Text,
    TouchableOpacity,
    TouchableOpacityProps,
    View
} from 'react-native';

interface IconButtonProps extends TouchableOpacityProps {
    size?: number;
    iconStyle?: ImageStyle;
    enabled?: boolean;
    iconSource: ImageSourcePropType;
    text: string;
}

const IconTextButton: React.FC<IconButtonProps> = ({
    onPress,
    size = 24,
    enabled = true,
    iconStyle,
    iconSource,
    text,
    ...props
}) => {
    return (
        enabled ?
            <View style={styles.container} {...props}>
                <TouchableOpacity onPress={onPress} style={styles.button}>
                    <Image
                        source={iconSource}
                        style={[
                            styles.icon,
                            { width: size, height: size },
                            iconStyle
                        ]}
                    />
                </TouchableOpacity>
                <Text style={styles.text}>{text}</Text>
            </View> :
            <View style={styles.container} {...props}>
                <View style={styles.button}>
                    <Image
                        source={iconSource}
                        style={[
                            styles.icon,
                            { width: size, height: size },
                            iconStyle
                        ]}
                    />
                </View>
                <Text style={styles.text}>{text}</Text>
            </View>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    icon: {
        resizeMode: 'contain',
    },
    button: {
        marginBottom: -10
    },
    text: {
        color: "white",
        fontSize: TEXT_FONT_SIZE,
    },
});

export default IconTextButton;