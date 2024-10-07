import { HOMETOP_TAPBAR_HEIGHT, ICON_SEARCH, STATUSBAR_HEIGHT, TEXT_ACTIVE_COLOR, TEXT_COLOR, TEXT_FONT_SIZE, TRANSPARENT_BACKGROUND_COLOR } from '@/constants/Config';
import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, TouchableOpacityProps, View } from 'react-native';
import ImageButton from './ImageButton';
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
      <ImageButton onPress={handleSearch} size={20} iconSource={ICON_SEARCH} style={styles.searchButton} />
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
    backgroundColor: TRANSPARENT_BACKGROUND_COLOR,
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
    color: TEXT_COLOR,
    fontSize: TEXT_FONT_SIZE,
  },
  activeTabText: {
    color: TEXT_ACTIVE_COLOR,
    fontWeight: 'bold',
    fontSize: 12,
  },
  searchButton: {
    height: 0,
    position: 'absolute',
    right: 20,
    top: 18,
  },
});

export default HomeTopTabBar;