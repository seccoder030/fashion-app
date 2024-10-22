import { ICON_AVATAR, ICON_BACK, ICON_DELETE, ICON_MORE, ICON_SELECTALL, ICON_SELECTALLOFF, SEARCHDETAILTOP_TAPBAR_HEIGHT, STATUSBAR_HEIGHT } from '@/constants/Config';
import { router } from 'expo-router';
import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import IconButton from './IconButton';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';

interface MessageToptabBarProps {
  userId: string;
  name: string;
  avatar: string | undefined;
}

const MessageToptabBar: React.FC<MessageToptabBarProps> = ({
  userId,
  name,
  avatar
}) => {
  function handleBack() {
    router.back();
  }

  function handleMore() {
  }

  return (
    <View style={styles.container}>
      <View style={styles.tabBar}>
        <View style={styles.leftView}>
          <IconButton onPress={handleBack} size={25} iconSource={ICON_BACK} />
          <View style={styles.user}>
            <Image
              source={avatar ? { uri: avatar } : ICON_AVATAR}
              style={[
                { width: 42, height: 42 },
                styles.userImage
              ]}
            />
            <Text style={styles.userName}>{name}</Text>
            {/* <Text style={styles.text}>(正在打字...)</Text> */}
          </View>
        </View>
        <Menu>
          <MenuTrigger>
            <Image source={ICON_MORE} style={{ width: 20, height: 20 }} />
          </MenuTrigger>
          <MenuOptions optionsContainerStyle={{ borderRadius: 5 }}>
            <MenuOption onSelect={() => alert(`select all`)} >
              <View style={{ flexDirection: 'row', height: 30, alignItems: 'center' }}>
                <Image source={ICON_SELECTALL} style={{ width: 20, height: 20, marginRight: 10, opacity: 0.9 }} />
                <Text>Select All</Text>
              </View>
            </MenuOption>
            <MenuOption onSelect={() => alert(`deselect all`)} disabled={true} >
              <View style={{ flexDirection: 'row', height: 30, alignItems: 'center', opacity: 0.3 }}>
                <Image source={ICON_SELECTALLOFF} style={{ width: 20, height: 20, marginRight: 10, opacity: 0.9 }} />
                <Text>Deselect All</Text>
              </View>
            </MenuOption>
            <MenuOption onSelect={() => alert(`delete`)} disabled={true} >
              <View style={{ flexDirection: 'row', height: 30, alignItems: 'center', opacity: 0.3 }}>
                <Image source={ICON_DELETE} style={{ width: 20, height: 20, marginRight: 10, opacity: 0.9 }} />
                <Text>Deselect All</Text>
              </View>
            </MenuOption>
          </MenuOptions>
        </Menu>
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
  userImage: {
    marginLeft: 10,
    borderRadius: 42,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.7)',
  },
  userName: {
    color: 'white',
    fontSize: 13,
    marginLeft: 10
  },
  text: {
    color: 'white',
    fontSize: 10,
    marginLeft: 10
  }
});

export default MessageToptabBar;