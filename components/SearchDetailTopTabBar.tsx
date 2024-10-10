import { ICON_BACK, ICON_USER2, SEARCHDETAILTOP_TAPBAR_HEIGHT, STATUSBAR_HEIGHT } from '@/constants/Config';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import IconButton from './IconButton';
import TextButton from './TextButton';
import { router } from 'expo-router';

const SearchDetailToptabBar = () => {
  function handleTab() {
  }

  function handleBack() {
    router.back();
  }

  return (
    <View style={styles.container}>
      <View style={styles.tabBar}>
        <View style={styles.leftView}>
          <IconButton size={25} iconSource={ICON_BACK} />
          <View style={styles.user}>
            <IconButton onPress={handleBack} size={42} iconSource={ICON_USER2} enabled={false} style={styles.userIcon} />
            <Text style={styles.userName}>昵   称</Text>
          </View>
        </View>
        <TextButton onPress={handleTab} text='立即关注' backgroundColor={'#FF1493'} borderRadius={20} paddingHorizontal={15} paddingVertical={3} />
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
    backgroundColor: 'rgba(255, 255, 255, 0)',
    zIndex: 5
  },
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0)',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(88, 119, 234, 1)',
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