import React from 'react';
import { View, Image, Text, StyleSheet, ImageSourcePropType, TouchableOpacityProps } from 'react-native';
import { Feather } from '@expo/vector-icons';

interface IconTextButtonProps extends TouchableOpacityProps {
  key: number;
  imageUrl: ImageSourcePropType;
  caption?: string;
  comments?: number;
  likes?: number;
}

const ImageCard: React.FC<IconTextButtonProps> = ({ key, imageUrl, caption = '', comments = '', likes = '' }) => {
  return (
    <View key={key} style={styles.card}>
      <Image source={imageUrl} style={styles.cardImage} />
      <View style={styles.cardFooter}>
        <Text>{caption}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: '48%',
    aspectRatio: 0.8,
    marginBottom: 10,
    borderRadius: 5,
    overflow: 'hidden',
    padding: 10,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    borderWidth: 1,
    backgroundColor: 'rgba(1, 1, 1, 0.15)'
  },
  cardImage: {
    width: '100%',
    height: '100%',
    borderRadius: 5
  },
  cardFooter: {
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    marginTop: 50
  },
});

export default ImageCard;