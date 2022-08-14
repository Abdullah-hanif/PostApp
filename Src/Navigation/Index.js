// In App.js in a new project

import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
// All screens Imports
import Home from '../Screens/HomePage/Index';
import RecentPosts from '../Screens/RecentPosts/Index';
import BookView from '../Screens/BookView/Index';
import ListCategory from '../Screens/ListCategory/Index';

import { SafeAreaView } from 'react-native-safe-area-context'

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function App() {
  return (

    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="home2">
        <Stack.Screen name="home2" component={DrawerNavigator} />
        <Stack.Screen name="recentPosts2" component={DrawerNavigator} />
        <Stack.Screen name="bookView2" component={DrawerNavigator} />
        <Stack.Screen name="listCategory2" component={DrawerNavigator} />
      </Stack.Navigator>
    </NavigationContainer>



  );
}
const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      initialRouteName="home"
      screenOptions={{
        drawerStyle: {
          backgroundColor: '#FFFF',
          width: 250,
        },
        drawerActiveTintColor: '#0d6efd',
      }}
    >
      <Drawer.Screen
        options={{ headerShown: false }}
        name="home"
        component={Home}
      />
      <Drawer.Screen
        options={{ headerShown: false }}
        name="listCategory"
        component={ListCategory}
      />

      <Drawer.Screen
        options={{ headerShown: false }}
        name="bookView"
        component={BookView}
      />
      <Drawer.Screen
        options={{ headerShown: false }}
        name="recentPosts"
        component={RecentPosts}
      />

    </Drawer.Navigator>
  );
};

export default App;