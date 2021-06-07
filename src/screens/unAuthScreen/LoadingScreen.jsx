import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { COLORS } from '../../constants/theme';
import { localSignIn } from '../../utils/authHelper';

const LoadingScreen = () => {
  useEffect(() => {
    localSignIn();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar barStyle='dark-content' />
      <ActivityIndicator size='large' color={COLORS.primary} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default LoadingScreen;
