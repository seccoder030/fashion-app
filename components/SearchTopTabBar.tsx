import { SEARCHTOP_TAPBAR_HEIGHT, STATUSBAR_HEIGHT } from '@/constants/Config';
import { Feather } from '@expo/vector-icons';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import TextButton from './TextButton';

type SetCurrentPageFunction = Dispatch<SetStateAction<number>>;
type SetSearchFunction = Dispatch<SetStateAction<string>>;

interface SearchTopTabBarProps {
  tabs: string[];
  currentPage?: number;
  setCurrentPage: SetCurrentPageFunction;
  search?: string;
  setSearch?: SetSearchFunction;
}

const SearchTopTabBar: React.FC<SearchTopTabBarProps> = ({
  tabs,
  currentPage = 0,
  setCurrentPage,
  search = '',
  setSearch
}) => {
  useEffect(() => {
    setCurrentPage(currentPage);
  }, [currentPage]);

  useEffect(() => { })

  return (
    <View style={styles.container}>
      <View style={styles.tabContainer}>
        <View style={styles.searchBar}>
          <Feather name="search" size={24} color='rgba(0, 0, 0, 0.7)' style={styles.icon} />
          <TextInput
            value={search}
            onChangeText={(value) => setSearch && setSearch(value)}
            style={styles.input}
            placeholder="検  索"
            placeholderTextColor="#888"
          />
        </View>
        <View style={styles.tabBar}>
          <View style={[{ padding: 5 }, currentPage === -1 && styles.activeTab]}>
            <TextButton onPress={() => setCurrentPage(-1)} text='兴趣' backgroundColor={'rgba(0, 0, 0, 0)'} textColor={-1 === currentPage ? 'rgba(255, 255, 255, 1)' : 'rgba(255, 255, 255, 0.5)'} />
          </View>
          {tabs.map((tab, index) => (
            <View key={index} style={[{ padding: 5 }, currentPage === index && styles.activeTab]}>
              <TextButton onPress={() => setCurrentPage(index)} text={tab} backgroundColor={'rgba(0, 0, 0, 0)'} textColor={index === currentPage ? 'rgba(255, 255, 255, 1)' : 'rgba(255, 255, 255, 0.5)'} />
            </View>
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
    backgroundColor: 'rgba(255, 255, 255, 0)',
    zIndex: 5
  },
  tabContainer: {},
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
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
    fontSize: 13,
    color: '#333',
  },
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: 'rgba(255, 255, 255, 0)',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(88, 119, 234, 1)',
    marginTop: 5,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: 'rgba(41, 191, 255, 1)',
  },
  tabText: {
    fontSize: 13,
    marginTop: 2,
    color: 'rgba(255, 255, 255, 0.5)',
  },
  activeTabText: {
    color: 'rgba(255, 255, 255, 1)',
  },
});

export default SearchTopTabBar;