import { BOTTOM_TAPBAR_HEIGHT, ICON_HOME, ICON_MESSEAGE, ICON_POST, ICON_PROFILE, ICON_SEARCH } from '@/constants/Config';
import { BlurView } from 'expo-blur';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { StyleSheet, TouchableOpacityProps, View } from 'react-native';
import ImageButton from './ImageButton';

interface BottomTabBarProps extends TouchableOpacityProps {
  thisId?: number;
}

const BottomTabBar: React.FC<BottomTabBarProps> = ({
  thisId = 0
}) => {
  const router = useRouter();
  const [activePageID, setActivePageID] = useState(thisId);
  function goto(pageID: number) {
    if(activePageID == pageID) return;
    setActivePageID(pageID);
    if(pageID == 0) router.push('/(main)/screens/HomeScreen');
    else if(pageID == 1) router.push('/(main)/screens/SearchScreen');
  }

  return (
    <View style={styles.container}>
      <BlurView intensity={30} experimentalBlurMethod='dimezisBlurView' style={styles.blur}>
      </BlurView>
      <View style={styles.content}>
        <ImageButton onPress={() => goto(0)} size={30} iconSource={ICON_HOME} enabled={thisId == 0? false: true} />
        <ImageButton onPress={() => goto(1)} size={30} iconSource={ICON_SEARCH} enabled={thisId == 1? false: true} />
        <ImageButton onPress={() => alert("Post")} size={40} iconSource={ICON_POST} />
        <ImageButton onPress={() => alert("Message")} size={30} iconSource={ICON_MESSEAGE} enabled={thisId == 2? false: true} />
        <ImageButton onPress={() => alert("Profile")} size={30} iconSource={ICON_PROFILE} enabled={thisId == 3? false: true} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 10
  },
  blur: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: BOTTOM_TAPBAR_HEIGHT,
    borderTopLeftRadius: 45,
    borderTopRightRadius: 45,
    borderRadius: 1,
    overflow: 'hidden',
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.5)',
    backgroundColor: 'rgba(33, 38, 55, 0.5)',
    elevation: 10,
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginLeft: 20,
    marginRight: 20,
    transform: [{ translateY:  (40  - BOTTOM_TAPBAR_HEIGHT) / 2 }],
  },
});

export default BottomTabBar;