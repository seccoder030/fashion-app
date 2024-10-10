import { ICON_ADD, ICON_COMMENT, ICON_HEART, ICON_SHARE, ICON_USER1 } from '@/constants/Config';
import { BlurView } from 'expo-blur';
import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import IconButton from './IconButton';
import IconTextButton from './IconTextButton';

const ActionBar = () => {
  return (
    <View style={styles.container}>
        <BlurView intensity={30} experimentalBlurMethod='dimezisBlurView' style={styles.blur}>
        </BlurView>
      <View style={styles.content}>
        <Image
          source={ICON_USER1}
          style={[
            { width: 35, height: 35 },
            styles.userImage
          ]}
        />
        <IconButton onPress={() => alert("Add")} size={20} iconSource={ICON_ADD} iconStyle={styles.item} />
        <IconTextButton onPress={() => alert("Heart")} size={20} iconSource={ICON_HEART} iconStyle={styles.item} text='328.7K' />
        <IconTextButton onPress={() => alert("Comments")} size={20} iconSource={ICON_COMMENT} iconStyle={styles.item} text='578' />
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
    backgroundColor: 'background: rgba(0, 0, 0, 0.7)',
    zIndex: -1
  },
  userImage: {
    marginTop: 10,
    marginBottom: -20
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