import React from 'react';
import {
    TouchableOpacity,
    Image,
    StyleSheet,
    TouchableOpacityProps,
    ImageStyle,
    View,
    ImageSourcePropType
} from 'react-native';

interface IconButtonProps extends TouchableOpacityProps {
    size?: number;
    iconStyle?: ImageStyle;
    enabled?: boolean;
    iconSource: ImageSourcePropType;
}

const IconButton: React.FC<IconButtonProps> = ({
    onPress,
    size = 24,
    enabled = true,
    iconStyle,
    iconSource,
    ...props
}) => {
    return (
        enabled ?
            <TouchableOpacity onPress={onPress} style={styles.button} {...props}>
                <Image
                    source={iconSource}
                    style={[
                        styles.icon,
                        { width: size, height: size },
                        iconStyle
                    ]}
                />
            </TouchableOpacity> :
            <View style={styles.button} {...props}>
                <Image
                    source={iconSource}
                    style={[
                        styles.icon,
                        { width: size, height: size },
                        iconStyle
                    ]}
                />
            </View>
    );
};

const styles = StyleSheet.create({
    button: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    icon: {
        resizeMode: 'contain',
    },
});

export default IconButton;