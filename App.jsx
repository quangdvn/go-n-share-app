import { ApolloProvider } from '@apollo/client';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AppLoading from 'expo-app-loading';
import { useFonts } from 'expo-font';
import React from 'react';
import { StyleSheet } from 'react-native';
import TabNavigation from './src/navigation/TabNavigation';
import { navigationRef } from './src/navigationRef';
import LoadingScreen from './src/screens/unAuthScreen/LoadingScreen';
import LogInScreen from './src/screens/unAuthScreen/LogInScreen';
import { apolloClient } from './src/utils/apolloClient';

const Stack = createStackNavigator();

function App() {
  const [fontLoaded] = useFonts({
    'Roboto-Black': require('./assets/fonts/Roboto-Black.ttf'),
    'Roboto-Bold': require('./assets/fonts/Roboto-Bold.ttf'),
    'Roboto-Regular': require('./assets/fonts/Roboto-Regular.ttf'),
    'OpenSans-Bold': require('./assets/fonts/OpenSans-Bold.ttf'),
    'OpenSans-Italic': require('./assets/fonts/OpenSans-Italic.ttf'),
    'OpenSans-Regular': require('./assets/fonts/OpenSans-Regular.ttf'),
  });

  if (!fontLoaded) {
    return <AppLoading />;
  }

  return (
    <ApolloProvider client={apolloClient}>
      <NavigationContainer ref={navigationRef}>
        <Stack.Navigator initialRouteName='Loading'>
          <Stack.Screen
            name='Loading'
            component={LoadingScreen}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name='LogIn'
            component={LogInScreen}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name='Auth'
            component={TabNavigation}
            options={{
              headerShown: false,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </ApolloProvider>
  );
}

export default App;
