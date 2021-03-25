import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import MenuScreen from '../screens/Menu';
import {Home} from '../screens/Home';

const MenuDrawer = createDrawerNavigator();

const Drawer = () => (
  <MenuDrawer.Navigator drawerContent={MenuScreen}>
    <MenuDrawer.Screen name="Home" component={Home} />
    <MenuDrawer.Screen name="Menu" component={MenuScreen} />
  </MenuDrawer.Navigator>
);

export default Drawer;
