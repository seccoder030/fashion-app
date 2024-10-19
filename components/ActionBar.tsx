import { ICON_ADD, ICON_AVATAR, ICON_COMMENT, ICON_HEART, ICON_HEARTFILL, ICON_SHARE } from '@/constants/Config';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import IconButton from './IconButton';
import IconTextButton from './IconTextButton';

interface IActionBarProps {
  username: string;
  likes: number;
  comments: number;
  uri?: string;
}

const ActionBar: React.FC<IActionBarProps> = ({ username, likes, comments, uri = undefined }) => {
  const [heart, setHeart] = useState<boolean>(false);
  const [add, setAdd] = useState<boolean>(false);

  return (
    <View style={styles.container}>
      {/* <BlurView intensity={30} experimentalBlurMethod='dimezisBlurView' style={styles.blur}>
      </BlurView> */}
      <View style={styles.blur}></View>
      <View style={styles.content}>
        <Image
          source={uri ? { uri: uri } : ICON_AVATAR}
          style={[
            { width: 40, height: 40 },
            styles.userImage
          ]}
        />
        {add ?
          <View style={styles.item}></View> :
          <IconButton onPress={() => setAdd(true)} size={20} iconSource={ICON_ADD} iconStyle={styles.item} />
        }
        {heart ?
          <IconTextButton onPress={() => setHeart(false)} size={20} iconSource={ICON_HEARTFILL} iconStyle={styles.item} text={likes > 1000 ? `${Math.floor(likes / 100) / 10}K` : `${likes}`} /> :
          <IconTextButton onPress={() => setHeart(true)} size={20} iconSource={ICON_HEART} iconStyle={styles.item} text={likes > 1000 ? `${Math.floor(likes / 100) / 10}K` : `${likes}`} />
        }
        <IconTextButton onPress={() => router.push('/DetailScreen')} size={20} iconSource={ICON_COMMENT} iconStyle={styles.item} text={comments > 1000 ? `${Math.floor(comments / 100) / 10}K` : `${comments}`} />
        <IconTextButton onPress={() => alert("Share")} size={20} iconSource={ICON_SHARE} iconStyle={styles.item} text='Share' />
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'absolute',
    bottom: 0,
    right: 5,
    zIndex: 6,
  },
  blur: {
    borderRadius: 30,
    width: 50,
    height: 250,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.5)',
    backgroundColor: 'background: rgba(81, 81, 81, 0.5)',
    zIndex: -1
  },
  userImage: {
    marginTop: 10,
    marginBottom: -20,
    borderRadius: 40,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.7)',
  },
  content: {
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 10,
    transform: [{ translateY: -250 }],
  },
  item: {
    paddingHorizontal: 5,
    paddingVertical: 10,
    marginHorizontal: 5,
    marginVertical: 12,
    zIndex: 5
  }
});

export default ActionBar;