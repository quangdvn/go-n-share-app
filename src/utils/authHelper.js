import AsyncStorage from '@react-native-async-storage/async-storage';
import * as RootNavigation from '../navigationRef';

export const localSignIn = async () => {
  try {
    const token = await AsyncStorage.getItem('token');
    if (token) {
      RootNavigation.navigate('Auth');
    } else {
      RootNavigation.navigate('LogIn');
    }
  } catch (err) {
    console.log(err);
  }
};

export const logOut = async () => {
  try {
    await AsyncStorage.removeItem('token');
    RootNavigation.navigate('LogIn');
  } catch (err) {
    console.log(err);
  }
};
