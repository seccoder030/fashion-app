import { ICON_SEARCH, TEXT_ACTIVE_COLOR, TEXT_COLOR, TEXT_FONT_SIZE, TRANSPARENT_BACKGROUND_COLOR } from '@/constants/Config';
import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, TouchableOpacityProps, View } from 'react-native';
import IconButton from './IconButton';

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
      </View>
      <IconButton onPress={handleSearch} size={20} iconSource={ICON_SEARCH} style={styles.searchButton} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    backgroundColor: TRANSPARENT_BACKGROUND_COLOR,
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  tabButton: {
    marginHorizontal: 10,
    paddingHorizontal: 10
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
    position: 'absolute',
    right: 15,
    padding: 5,
  },
});

export default HomeTopTabBar;