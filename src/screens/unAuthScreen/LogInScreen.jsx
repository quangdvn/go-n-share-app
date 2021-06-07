import { useLazyQuery, useQuery } from '@apollo/client';
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppLogo from '../../components/AppLogo';
import LogInForm from '../../components/LogInForm';
import { COLORS, FONTS, SIZES } from '../../constants/theme';
import { HELLO, LOG_IN } from '../../graphql';
import * as RootNavigation from '../../navigationRef';
import axios from 'axios';
import { gnsAuthApi, reqConfig } from '../../api';

const KEYBOARD_VERTICAL_OFFSET = 0;

const LoginScreen = () => {
  const [borderColor, setBorderColor] = useState(null);

  const [isLoading, setLoading] = useState(false);

  const handleFocus = (value) => {
    setBorderColor(value);
  };

  const handleLogIn = async (logInData) => {
    try {
      const res = await gnsAuthApi.post(
        'driver/login',
        {
          username: logInData.username,
          password: logInData.password,
        },
        reqConfig()
      );

      await AsyncStorage.setItem('token', res.data.data);
      RootNavigation.navigate('Auth');
    } catch (err) {
      Alert.alert('Có lỗi xảy ra', err.response.data.message, [
        { text: 'OK', style: 'destructive' },
      ]);
    }
    // logIn({
    //   variables: {
    //     username: logInData.username,
    //     password: logInData.password,
    //   },
    // });
    // if (loading) {
    //   setLoading(loading);
    // } else if (error) {
    //   setLoading(false);
    //   Alert.alert('Có lỗi xảy ra', error, [
    //     { text: 'OK', style: 'destructive' },
    //   ]);
    // } else if (called && data) {
    //   setLoading(false);
    //   if (data.logIn.error) {
    //     Alert.alert('Có lỗi xảy ra', data.logIn.error[0], [
    //       { text: 'OK', style: 'destructive' },
    //     ]);
    //   } else if (data.logIn.token) {
    //     console.log(data.logIn.token);
    //     await AsyncStorage.setItem('token', data.logIn.token);
    //     RootNavigation.navigate('Main');
    //   }
    // }
  };

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        setBorderColor(null);
        Keyboard.dismiss();
      }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : null}
        keyboardVerticalOffset={KEYBOARD_VERTICAL_OFFSET}
        style={{ flex: 1 }}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          alwaysBounceVertical={false}>
          <SafeAreaView style={styles.container}>
            <View
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: SIZES.padding * 3,
              }}>
              <AppLogo />
            </View>
            <LogInForm
              handleSubmit={handleLogIn}
              borderColor={borderColor}
              handleFocus={handleFocus}
              spinner={isLoading}
            />
          </SafeAreaView>
        </ScrollView>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 23 * 3,
    marginTop: 100,
  },
  title: {
    color: COLORS.primary,
    ...FONTS.h3,
    textAlign: 'center',
    marginVertical: 50,
  },
  loading: {
    marginTop: 40,
  },
  link: {
    flexDirection: 'row',
    marginTop: 220,
    justifyContent: 'center',
  },
});

export default LoginScreen;
