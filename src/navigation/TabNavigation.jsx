import {
  BottomTabBar,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import React from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import { isIphoneX } from 'react-native-iphone-x-helper';
import Svg, { Path } from 'react-native-svg';
import { COLORS, icons } from '../constants';
import InfoScreen from '../screens/authScreen/InfoScreen';
import MainScreen from '../screens/authScreen/MainScreen';
import DrawerNavigation from './DrawerNavigation';

const Tab = createBottomTabNavigator();

const TabBarCustomButton = ({ accessibilityState, children, onPress }) => {
  const isSelected = accessibilityState?.selected;
  if (isSelected) {
    return (
      <View style={{ flex: 1, alignItems: 'center' }}>
        <View style={{ flexDirection: 'row', position: 'absolute', top: 0 }}>
          <View style={{ flex: 1, backgroundColor: COLORS.white }} />
          <Svg width={75} height={61} viewBox='0 0 75 61'>
            <Path
              d='M75.2 0v61H0V0c4.1 0 7.4 3.1 7.9 7.1C10 21.7 22.5 33 37.7 33c15.2 0 27.7-11.3 29.7-25.9.5-4 3.9-7.1 7.9-7.1h-.1z'
              fill={COLORS.white}
            />
          </Svg>
          <View style={{ flex: 1, backgroundColor: COLORS.white }} />
        </View>

        <TouchableOpacity
          style={{
            top: -22.5,
            justifyContent: 'center',
            alignItems: 'center',
            width: 50,
            height: 50,
            borderRadius: 25,
            backgroundColor: COLORS.white,
          }}
          onPress={onPress}>
          {children}
        </TouchableOpacity>
      </View>
    );
  }
  return (
    <TouchableOpacity
      style={{
        flex: 1,
        height: 60,
        backgroundColor: COLORS.white,
      }}
      activeOpacity={1}
      onPress={onPress}>
      {children}
    </TouchableOpacity>
  );
};

const CustomTabBar = (props) => {
  if (isIphoneX()) {
    return (
      <View>
        <View
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: 30,
            backgroundColor: COLORS.white,
          }}
        />
        <BottomTabBar {...props.props} />
      </View>
    );
  }
  return <BottomTabBar {...props.props} />;
};

const TabNavigation = () => (
  <Tab.Navigator
    tabBarOptions={{
      showLabel: false,
      style: {
        backgroundColor: 'transparent',
        borderTopWidth: 0,
        elevation: 0,
      },
    }}
    tabBar={(props) => <CustomTabBar props={props} />}>
    <Tab.Screen
      name='Drawer'
      component={DrawerNavigation}
      options={{
        tabBarIcon: ({ focused }) => (
          <Image
            source={icons.nearby}
            resizeMode='contain'
            style={{
              width: 25,
              height: 25,
              tintColor: focused ? COLORS.primary : COLORS.secondary,
            }}
          />
        ),
        tabBarButton: (props) => <TabBarCustomButton {...props} />,
      }}
    />
    <Tab.Screen
      name='Info'
      component={InfoScreen}
      options={{
        tabBarIcon: ({ focused }) => (
          <Image
            source={icons.user}
            resizeMode='contain'
            style={{
              width: 25,
              height: 25,
              tintColor: focused ? COLORS.primary : COLORS.secondary,
            }}
          />
        ),
        tabBarButton: (props) => <TabBarCustomButton {...props} />,
      }}
    />
  </Tab.Navigator>
);

export default TabNavigation;
