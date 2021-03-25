import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Drawer from './DrawerStack';
import Screen1 from '../screens/Screen1';
import Screen2 from '../screens/Screen2';

const RootStack = createStackNavigator();

const RootNavigation = () => (
  <NavigationContainer>
    <RootStack.Navigator headerMode="none">
      <RootStack.Screen name="Drawer" component={Drawer} />
      <RootStack.Screen name="Screen1" component={Screen1} />
      <RootStack.Screen name="Screen2" component={Screen2} />
    </RootStack.Navigator>
  </NavigationContainer>
);

export default RootNavigation;
