import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from '@react-navigation/drawer';
import React from 'react';
import { Image } from 'react-native';
import { icons } from '../constants';
import * as RootNavigation from '../navigationRef';
import MainScreen from '../screens/authScreen/MainScreen';
import { apolloClient } from '../utils/apolloClient';
import { logOut } from '../utils/authHelper';
import StackNavigation from './StackNavigation';

const Drawer = createDrawerNavigator();

const SideBar = ({ ...props }) => (
  <DrawerContentScrollView {...props}>
    <DrawerItemList {...props} />
    <DrawerItem
      label='Đăng xuất'
      icon={({ color, size }) => (
        <Image
          source={icons.back}
          style={{ width: size, height: size, tintColor: color }}
        />
      )}
      onPress={() => {
        RootNavigation.toggle();
        logOut().then(() =>
          apolloClient.clearStore().then(() => console.log('Clear success !!!'))
        );
      }}
    />
  </DrawerContentScrollView>
);

const DrawerNavigation = () => (
  <Drawer.Navigator
    initialRouteName='Stack'
    drawerContent={(props) => <SideBar {...props} />}>
    <Drawer.Screen
      name='Stack'
      component={StackNavigation}
      options={{
        drawerIcon: ({ color, size }) => (
          <Image
            source={icons.nearby}
            style={{ width: size, height: size, tintColor: color }}
          />
        ),
        drawerLabel: 'Trang chính',
      }}
    />
  </Drawer.Navigator>
);

export default DrawerNavigation;
