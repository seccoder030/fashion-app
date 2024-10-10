import { HOMETOP_TAPBAR_HEIGHT, STATUSBAR_HEIGHT } from '@/constants/Config';
import React, { useState } from 'react';
import { StyleSheet, TouchableOpacityProps, View } from 'react-native';
import TextButton from './TextButton';

interface HomeTopTabBarProps extends TouchableOpacityProps {
}

const HomeTopTabBar: React.FC<HomeTopTabBarProps> = ({
}) => {
  const [activeTab, setActiveTab] = useState('精选');
  const tabs = ['精选', '推荐', '校友圈'];

  function handleTab(tab: string) {
    setActiveTab(tab);
    // if(tab == tabs[0]) alert(0);
    // else if(tab == tabs[1]) alert(1);
    // else if(tab == tabs[2]) alert(2);
  }

  function handleSearch() {
    alert('Search');
  }

  return (
    <View style={styles.container}>
      <View style={styles.tabContainer}>
        {tabs.map((tab) => (
          <TextButton onPress={handleSearch} text={tab} backgroundColor={'rgba(0, 0, 0, 0)'} style={styles.tabButton} key={tab} />
        ))}
      </View>
      {/* <View style={styles.tabContainer}>
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab}
            onPress={() => handleTab(tab)}
            style={styles.tabButton}
          >
            <Text style={[
              styles.tabText,
              activeTab === tab && styles.activeTabText
            ]}>
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View> */}
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
  },
  tabText: {
    color: 'rgba(255, 255, 255, 0.5)',
    fontSize: 13,
  },
  activeTabText: {
    color: 'rgba(255, 255, 255, 1)',
    fontWeight: 'bold',
    fontSize: 12,
  },
});

export default HomeTopTabBar;