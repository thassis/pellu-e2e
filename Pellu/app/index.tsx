import useSplash from '@/hooks/useSplash';
import { Stack } from 'expo-router';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import LogoIcon from '../assets/svg/logo.icon';

const SplashScreen = () => {
  useSplash();

  return (
    <View style={styles.container}>
      <Stack screenOptions={{ headerShown: false }} />
      <LogoIcon width={200} height={100} />
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
