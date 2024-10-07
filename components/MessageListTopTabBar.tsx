import { ICON_BACK, ICON_SEARCH, ICON_USER2, LINE_COLOR, SEARCHDETAILTOP_TAPBAR_HEIGHT, STATUSBAR_HEIGHT, TRANSPARENT_BACKGROUND_COLOR } from '@/constants/Config';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ImageButton from './ImageButton';

const MessageListToptabBar = () => {
  function handleTab() {
  }

  return (
    <View style={styles.container}>
      <View style={styles.tabBar}>
        <ImageButton size={25} iconSource={ICON_BACK} />
        <Text style={styles.text}>留   言</Text>
        <ImageButton size={20} iconSource={ICON_SEARCH} />
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
  text: {
    color: 'white',
    fontSize: 20,
  }
});

export default MessageListToptabBar;