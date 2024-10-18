import BottomTabBar from '@/components/BottomTabBar';
import { useAuth } from '@/context/Authentication';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import DetailScreen from './DetailScreen';
import EditProfileScreen from './EditProfileScreen';
import HomeScreen from './HomeScreen';
import MessageListScreen from './MessageListScreen';
import MessageScreen from './MessageScreen';
import ProfileScreen from './ProfileScreen';
import SearchScreen from './SearchScreen';
import Loading from '@/components/Loading';

const Stack = createStackNavigator();

export default function MainLayout() {
  return (
    <>
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="light-content" />
        <Stack.Navigator>
          <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }} />
          <Stack.Screen name="SearchScreen" component={SearchScreen} options={{ headerShown: false }} />
          <Stack.Screen name="DetailScreen" component={DetailScreen} options={{ headerShown: false }} />
          <Stack.Screen name="MessageListScreen" component={MessageListScreen} options={{ headerShown: false }} />
          <Stack.Screen name="MessageScreen" component={MessageScreen} options={{ headerShown: false }} />
          <Stack.Screen name="ProfileScreen" component={ProfileScreen} options={{ headerShown: false }} />
          <Stack.Screen name="EditProfileScreen" component={EditProfileScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
        <BottomTabBar />
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});