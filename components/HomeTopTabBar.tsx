import { HOMETOP_TAPBAR_HEIGHT, STATUSBAR_HEIGHT } from '@/constants/Config';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacityProps, View } from 'react-native';
import TextButton from './TextButton';

type SetCurrentPageFunction = Dispatch<SetStateAction<number>>;

interface HomeTopTabBarProps {
  tabs: string[];
  currentPage?: number;
  setCurrentPage: SetCurrentPageFunction;
}

const HomeTopTabBar: React.FC<HomeTopTabBarProps> = ({
  tabs,
  currentPage = 2,
  setCurrentPage
}) => {

  useEffect(() => {
    setCurrentPage(currentPage);
  }, [currentPage]);

  return (
    <View style={styles.container}>
      <View style={styles.tabContainer}>
        {tabs.map((tab, index) => (
          <TextButton onPress={() => setCurrentPage(index)} text={tab} backgroundColor={'rgba(0, 0, 0, 0)'} textColor={index === currentPage ? 'rgba(255, 255, 255, 1)' : 'rgba(255, 255, 255, 0.5)'} style={styles.tabButton} key={index} />
        ))}
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
    height: HOMETOP_TAPBAR_HEIGHT,
    alignItems: 'center',
    paddingVertical: 15,
    backgroundColor: 'rgba(255, 255, 255, 0)',
    zIndex: 5
  },
  tabContainer: {
    flexDirection: 'row',
    paddingTop: 5
  },
  tabButton: {
    marginHorizontal: 25,
  }
});

export default HomeTopTabBar;