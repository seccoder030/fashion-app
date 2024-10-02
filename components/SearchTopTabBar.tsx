import { TEXT_ACTIVE_COLOR, TEXT_COLOR, TEXT_FONT_SIZE, TRANSPARENT_BACKGROUND_COLOR, LINE_COLOR, LINE_ACTIVE_COLOR } from '@/constants/Config';
import { Feather } from '@expo/vector-icons';
import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const SearchBar = () => {
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
      <View style={styles.searchbar}>
        <Feather name="search" size={24} color='rgba(0, 0, 0, 0.7)' style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="検  索"
          placeholderTextColor="#888"
        />
      </View>
      <View style={styles.tabbar}>
        {tabs.map((tab) => (
          tab.key === activeTab?
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
          </View>:
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
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 20,
    marginBottom: -670,
  },
  searchbar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 30,
    paddingHorizontal: 12,
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
  tabbar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
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

export default SearchBar;