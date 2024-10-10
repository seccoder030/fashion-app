import { ICON_BACK, ICON_SEARCH, SEARCHDETAILTOP_TAPBAR_HEIGHT, STATUSBAR_HEIGHT } from '@/constants/Config';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import IconButton from './IconButton';

const MessageListToptabBar = () => {
  function handleTab() {
  }

  return (
    <View style={styles.container}>
      <View style={styles.tabBar}>
        <View style={styles.space}></View>
        <Text style={styles.text}>留   言</Text>
        <IconButton size={20} iconSource={ICON_SEARCH} />
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
  text: {
    color: 'white',
    fontSize: 20,
  },
  space: {
    width: 20
  },
  searchButton: {
    height: 0,
    position: 'absolute',
    right: 20,
    top: 18,
  },
});

export default MessageListToptabBar;