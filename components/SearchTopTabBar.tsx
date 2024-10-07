import { LINE_ACTIVE_COLOR, LINE_COLOR, SEARCHTOP_TAPBAR_HEIGHT, STATUSBAR_HEIGHT, TEXT_ACTIVE_COLOR, TEXT_COLOR, TEXT_FONT_SIZE, TRANSPARENT_BACKGROUND_COLOR } from '@/constants/Config';
import { Feather } from '@expo/vector-icons';
import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const SearchTopTabBar = () => {
  const [activeTab, setActiveTab] = useState('  全部  ');

  const tabs = [
    { key: '  全部  ', icon: 'grid' },
    { key: '  视频  ', icon: 'video' },
    { key: '  图像  ', icon: 'image' },
    { key: '  喜欢  ', icon: 'heart' },
    { key: '  建议  ', icon: 'message-square' },
    { key: '  收藏夹  ', icon: 'bookmark' },
  ];

  function handleTab(key: string) {
    setActiveTab(key)
  }

  return (
    <View style={styles.container}>
      <View style={styles.tabContainer}>
        <View style={styles.searchBar}>
          <Feather name="search" size={24} color='rgba(0, 0, 0, 0.7)' style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="検  索"
            placeholderTextColor="#888"
          />
        </View>
        <View style={styles.tabBar}>
          {tabs.map((tab) => (
            tab.key === activeTab ?
              <View
                key={tab.key}
                style={[styles.tab, activeTab === tab.key && styles.activeTab]}
              >
                <Feather
                  name={tab.icon as any}
                  size={20}
                  color={activeTab === tab.key ? TEXT_ACTIVE_COLOR : TEXT_COLOR}
                />
                <Text style={[
                  styles.tabText,
                  activeTab === tab.key && styles.activeTabText
                ]}>
                  {tab.key}
                </Text>
              </View> :
              <TouchableOpacity
                key={tab.key}
                style={[styles.tab, activeTab === tab.key && styles.activeTab]}
                onPress={() => handleTab(tab.key)}
              >
                <Feather
                  name={tab.icon as any}
                  size={20}
                  color={activeTab === tab.key ? TEXT_ACTIVE_COLOR : TEXT_COLOR}
                />
                <Text style={[
                  styles.tabText,
                  activeTab === tab.key && styles.activeTabText
                ]}>
                  {tab.key}
                </Text>
              </TouchableOpacity>
          ))}
        </View>
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
    height: SEARCHTOP_TAPBAR_HEIGHT,
    paddingVertical: 15,
    paddingHorizontal: 20,
    backgroundColor: TRANSPARENT_BACKGROUND_COLOR,
    zIndex: 5
  },
  tabContainer: {},
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 25,
    backgroundColor: 'white',
    borderRadius: 30,
    paddingHorizontal: 10,
    marginHorizontal: 50,
    marginVertical: 10
  },
  icon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: TEXT_FONT_SIZE,
    color: '#333',
  },
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: TRANSPARENT_BACKGROUND_COLOR,
    borderBottomWidth: 1,
    borderBottomColor: LINE_COLOR,
  },
  tab: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: LINE_ACTIVE_COLOR,
  },
  tabText: {
    fontSize: TEXT_FONT_SIZE,
    marginTop: 2,
    color: TEXT_COLOR,
  },
  activeTabText: {
    color: TEXT_ACTIVE_COLOR,
  },
});

export default SearchTopTabBar;