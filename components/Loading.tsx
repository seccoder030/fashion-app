import { ActivityIndicator, ColorValue, View } from "react-native";

interface LoadingProps {
    color?: ColorValue;
    backgroundColor?: ColorValue;
}

const Loading: React.FC<LoadingProps> = ({
    color = '#2e78b7',
    backgroundColor = 'white'
}) => {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: backgroundColor }}>
            <ActivityIndicator size={'large'} color={color} />
        </View>
    )
}

export default Loading;