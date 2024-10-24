import { ICON_AVATAR, ICON_BACK, SEARCHDETAILTOP_TAPBAR_HEIGHT, STATUSBAR_HEIGHT } from '@/constants/Config';
import { router } from 'expo-router';
import React from 'react';
import { Alert, Image, StyleSheet, Text, ToastAndroid, View } from 'react-native';
import IconButton from './IconButton';
import TextButton from './TextButton';
import { useAuth } from './navigation/Authentication';
import Request from '@/utils/request';

interface DetailToptabBarProps {
  postId: string;
  userId: string;
  avatar: string;
  name: string;
};

const DetailToptabBar: React.FC<DetailToptabBarProps> = ({
  postId,
  userId,
  avatar,
  name
}) => {
  const { token, user } = useAuth();

  const deleteItem = async () => {
    if (token) {
      try {
        Request.setAuthorizationToken(token);
        const res = await Request.Post(`/post/delete_my_post`, { id: postId });
        if (res.status === 'success') {
          if (router.canDismiss()) router.dismissAll();
          router.replace('/HomeScreen');
        }
        ToastAndroid.show(res.msg, ToastAndroid.SHORT);
      } catch (error) {
        console.error(error);
        ToastAndroid.show('API 错误！', ToastAndroid.SHORT);
      }
    }
  };

  function handleDelete() {
    return Alert.alert(
      "Confirm Deletion",
      "Are you want to delete this item?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "Delete",
          onPress: () => deleteItem(),
          style: "destructive"
        }
      ]
    );
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
              source={avatar ? { uri: avatar } : ICON_AVATAR}
              style={[
                { width: 42, height: 42 },
                styles.userImage
              ]}
            />
            <Text style={styles.userName}>{name}</Text>
          </View>
        </View>
        {user?.id == userId && <TextButton onPress={handleDelete} text='删除帖子' backgroundColor={'#FF1493'} borderRadius={20} paddingHorizontal={15} paddingVertical={3} />}
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