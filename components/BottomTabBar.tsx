import { BOTTOM_TAPBAR_HEIGHT, ICON_HOME, ICON_MESSEAGE, ICON_POST, ICON_PROFILE, ICON_SEARCH } from '@/constants/Config';
import { BlurView } from 'expo-blur';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { StyleSheet, TouchableOpacityProps, View } from 'react-native';
import IconButton from './IconButton';

interface BottomTabBarProps extends TouchableOpacityProps {
  thisId?: number;
}

const BottomTabBar: React.FC<BottomTabBarProps> = ({
  thisId = 0,
}) => {
  const [activePageID, setActivePageID] = useState(thisId);
  function goto(pageID: number) {
    if (activePageID == pageID) return;
    setActivePageID(pageID);
    if (router.canDismiss()) router.dismissAll();
    if (pageID == 0) router.replace('/HomeScreen');
    else if (pageID == 1) router.replace('/SearchScreen');
    else if (pageID == 2) router.replace('/MessageListScreen');
    else if (pageID == 3) router.replace('/ProfileScreen');
  }

  return (
    <View style={styles.container}>
      <BlurView intensity={30} experimentalBlurMethod='dimezisBlurView' style={styles.blur}>
      </BlurView>
      <View style={styles.content}>
        <IconButton onPress={() => goto(0)} size={30} iconSource={ICON_HOME} enabled={activePageID == 0 ? false : true} />
        <IconButton onPress={() => goto(1)} size={30} iconSource={ICON_SEARCH} enabled={activePageID == 1 ? false : true} />
        <IconButton onPress={() => router.push('/CameraScreen')} size={40} iconSource={ICON_POST} />
        <IconButton onPress={() => goto(2)} size={30} iconSource={ICON_MESSEAGE} enabled={activePageID == 2 ? false : true} />
        <IconButton onPress={() => goto(3)} size={30} iconSource={ICON_PROFILE} enabled={activePageID == 3 ? false : true} />
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
    transform: [{ translateY: (40 - BOTTOM_TAPBAR_HEIGHT) / 2 }],
  },
});

export default BottomTabBar;