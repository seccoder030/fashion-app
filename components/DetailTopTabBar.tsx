import { ICON_BACK, SEARCHDETAILTOP_TAPBAR_HEIGHT, STATUSBAR_HEIGHT } from '@/constants/Config';
import { router } from 'expo-router';
import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import IconButton from './IconButton';
import TextButton from './TextButton';

const DetailToptabBar = () => {
  const uri = 'https://johnyanderson-portfolio.onrender.com/assets/images/logo/logo.png';

  function handleTab() {
  }

  function handleBack() {
    router.back();
  }

  return (
    <View style={styles.container}>
      <View style={styles.tabBar}>
        <View style={styles.leftView}>
          <IconButton onPress={handleBack} size={25} iconSource={ICON_BACK} />
          <View style={styles.user}>
            <Image
              source={{ uri: uri }}
              style={[
                { width: 42, height: 42 },
                styles.userImage
              ]}
            />
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
  }
});

export default DetailToptabBar;