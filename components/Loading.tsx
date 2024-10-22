import { BACKGROUND_COLOR, ICON_LOADING1, ICON_LOADING2 } from "@/constants/Config";
import { ActivityIndicator, ColorValue, View, Image } from "react-native";

interface LoadingProps {
    mode?: number;
    size?: number;
    color?: ColorValue;
    backgroundColor?: ColorValue;
}

const Loading: React.FC<LoadingProps> = ({
    mode = 1,
    size = 30,
    color = '#2e78b7',
    backgroundColor = BACKGROUND_COLOR
}) => {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: backgroundColor }}>
            {/* <ActivityIndicator size={'large'} color={color} /> */}
            <Image source={mode === 0 ? ICON_LOADING1 : ICON_LOADING2} style={{ width: size, height: size }} />
        </View>
    )
}

export default Loading;