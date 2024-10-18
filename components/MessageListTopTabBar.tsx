import { ICON_CLOSE, ICON_SEARCH, SEARCHDETAILTOP_TAPBAR_HEIGHT, STATUSBAR_HEIGHT } from '@/constants/Config';
import { Feather } from '@expo/vector-icons';
import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import IconButton from './IconButton';


const MessageListToptabBar = () => {
  const [search, setSearch] = useState<boolean>(false);

  return (
    <View style={styles.container}>
      {search ?
        <View style={styles.tabBar}>
          <View style={styles.searchBar}>
            <Feather name="search" size={24} color='rgba(0, 0, 0, 0.7)' style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="検  索"
              placeholderTextColor="#888"
            />
            <IconButton onPress={() => setSearch(false)} size={20} iconSource={ICON_CLOSE} iconStyle={{ opacity: 0.7 }} />
          </View>
        </View> :
        <View style={styles.tabBar}>
          <View style={{ width: 20 }}></View>
          <Text style={styles.text}>留   言</Text>
          <IconButton onPress={() => setSearch(true)} size={20} iconSource={ICON_SEARCH} />
        </View>
      }
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
  searchButton: {
    height: 0,
    position: 'absolute',
    right: 20,
    top: 18,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 30,
    paddingHorizontal: 10,
    marginHorizontal: 50,
  },
  icon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 13,
    color: '#333',
  },
});

export default MessageListToptabBar;