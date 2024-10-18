import { ColorValue, Text, View } from "react-native";

interface BlankProps {
    backgroundColor?: ColorValue;
}

const Blank: React.FC<BlankProps> = ({
    backgroundColor = 'rgba(255, 255, 255, 0)'
}) => {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: backgroundColor }}>
            <Text style={{ color: 'rgba(255, 255, 255, 1)', fontSize: 15 }}>没有数据可显示。</Text>
        </View>
    )
}

export default Blank;