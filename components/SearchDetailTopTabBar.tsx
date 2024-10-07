import { STATUSBAR_HEIGHT, SEARCHDETAILTOP_TAPBAR_HEIGHT, LINE_COLOR, TRANSPARENT_BACKGROUND_COLOR, ICON_BACK, ICON_USER2 } from '@/constants/Config';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ImageButton from './ImageButton';
import TextButton from './TextButton';

const SearchDetailToptabBar = () => {
  function handleTab() {
  }

  return (
    <View style={styles.container}>
      <View style={styles.tabBar}>
        <View style={styles.leftView}>
          <ImageButton size={25} iconSource={ICON_BACK} />
          <View style={styles.user}>
            <ImageButton size={42} iconSource={ICON_USER2} enabled={false} style={styles.userIcon} />
            <Text style={styles.userName}>昵   称</Text>
          </View>
        </View>
        <TextButton text='立即关注' backgroundColor={'#FF1493'} borderRadius={20} paddingHorizontal={15} paddingVertical={3} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: STATUSBAR_HEIGHT,
    height: SEARCHDETAILTOP_TAPBAR_HEIGHT,
    paddingVertical: 15,
    paddingHorizontal: 20,
    backgroundColor: TRANSPARENT_BACKGROUND_COLOR,
    zIndex: 5
  },
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: TRANSPARENT_BACKGROUND_COLOR,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: LINE_COLOR,
  },
  leftView: {
    flexDirection: 'row',
  },
  user: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userIcon: {
    marginLeft: 10
  },
  userName: {
    color: 'white',
    fontSize: 13,
    marginLeft: 10
  }
});

export default SearchDetailToptabBar;