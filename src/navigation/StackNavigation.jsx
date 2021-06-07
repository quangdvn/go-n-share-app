import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import MainScreen from '../screens/authScreen/MainScreen';
import DetailScreen from '../screens/authScreen/DetailScreen';
import { COLORS, FONTS, SIZES } from '../constants';

const Stack = createStackNavigator();

const StackNavigation = () => (
  <Stack.Navigator>
    <Stack.Screen
      name='Main'
      component={MainScreen}
      options={{
        headerShown: false,
      }}
    />
    <Stack.Screen
      name='Detail'
      component={DetailScreen}
      options={{
        title: 'Thông tin chi tiết',
        headerStyle: {
          backgroundColor: COLORS.primary,
          height: SIZES.height * 0.1,
        },
        headerTintColor: COLORS.white,
        headerTitleStyle: {
          ...FONTS.h3,
        },
        headerTitleContainerStyle: {
          marginVertical: SIZES.padding * 1,
        },
        headerBackTitle: 'Quay lại',
      }}
    />
  </Stack.Navigator>
);

export default StackNavigation;
