import { HOMETOP_TAPBAR_HEIGHT, STATUSBAR_HEIGHT } from '@/constants/Config';
import React, { useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacityProps, View } from 'react-native';
import TextButton from './TextButton';

interface HomeTopTabBarProps extends TouchableOpacityProps {
  tab?: string;
  setCurrentPage: (tab: number) => void;
}

const HomeTopTabBar: React.FC<HomeTopTabBarProps> = ({
  tab = '校友圈',
  setCurrentPage
}) => {
  const [activeTab, setActiveTab] = useState<string>(tab);
  const tabs = ['精选', '推荐', '校友圈'];

  useEffect(() => {
    setActiveTab(tab);
    if (tab === tabs[0]) setCurrentPage(0);
    else if (tab === tabs[1]) setCurrentPage(1);
    else if (tab === tabs[2]) setCurrentPage(2);
  }, [tab]);

  function handleTab(tab: string) {
    setActiveTab(tab);
  }

  return (
    <View style={styles.container}>
      <View style={styles.tabContainer}>
        {tabs.map((tab) => (
          <TextButton onPress={() => handleTab(tab)} text={tab} backgroundColor={'rgba(0, 0, 0, 0)'} textColor={tab === activeTab ? 'rgba(255, 255, 255, 1)' : 'rgba(255, 255, 255, 0.5)'} style={styles.tabButton} key={tab} />
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