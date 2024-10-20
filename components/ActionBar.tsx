import { useAuth } from '@/components/navigation/Authentication';
import { ICON_ADD, ICON_AVATAR, ICON_COMMENT, ICON_HEART, ICON_HEARTFILL, ICON_SHARE } from '@/constants/Config';
import Request from '@/utils/request';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, ToastAndroid, View } from 'react-native';
import IconButton from './IconButton';
import IconTextButton from './IconTextButton';

interface IActionBarProps {
  postId: string;
  userId: string;
  type: boolean;
  avatar: string | undefined;
  uri: string | undefined;
  title: string;
  content: string;
  preLikesCount: number;
  commentsCount: number;
  favoritesCount: number;
}

const ActionBar: React.FC<IActionBarProps> = ({ postId, userId, type, avatar, uri, title, content, preLikesCount, commentsCount, favoritesCount }) => {
  const { friends, favorites, updateFriends, updateFavorites } = useAuth();
  const [heart, setHeart] = useState<boolean>(false);
  const [add, setAdd] = useState<boolean>(false);
  const [likesCount, setLikeCount] = useState<number>(preLikesCount);

  const shortNumber = (num: number) => num ? num > 1000 ? `${Math.floor(num / 100) / 10}K` : `${num}` : 0

  useEffect(() => {
    if (friends) setAdd(friends.has(userId));
    if (favorites) setHeart(favorites.has(postId));
  }, [friends, favorites])

  const addFriend = async () => {
    const status = await updateFriends(userId);
    if (status) setAdd(true);
  }

  const addLikes = async () => {
    const status = await updateFavorites(postId);
    if (status) {
      setLikeCount(heart ? likesCount - 1 : likesCount + 1);
      setHeart(!heart);
    }
  }

  const handleItem = () => {
    router.push({ pathname: '/DetailScreen', params: { postId: postId, userId: userId, type: type ? "video" : "image", uri: uri, title: title, content: content, likesCount: likesCount, commentsCount: commentsCount, favoCount: favoritesCount } });
  }
  return (
    <View style={styles.container}>
      <View style={styles.blur}></View>
      <View style={styles.content}>
        <Image
          source={avatar ? { uri: avatar } : ICON_AVATAR}
          style={[
            { width: 40, height: 40 },
            styles.userImage
          ]}
        />
        {add ?
          <View style={styles.item}></View> :
          <View style={styles.item}>
            <IconButton onPress={() => addFriend()} size={20} iconSource={ICON_ADD} />
          </View>
        }
        <IconTextButton onPress={() => addLikes()} size={20} iconSource={heart ? ICON_HEARTFILL : ICON_HEART} iconStyle={styles.item} text={shortNumber(likesCount).toString()} />
        <IconTextButton onPress={() => handleItem()} size={20} iconSource={ICON_COMMENT} iconStyle={styles.item} text={shortNumber(commentsCount).toString()} />
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
    marginBottom: -10,
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
    marginHorizontal: 5,
    height: 40,
    zIndex: 5
  }
});

export default ActionBar;