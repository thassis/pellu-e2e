import React from 'react';
import { View } from 'react-native';
import LogoIcon from '../../assets/svg/logo.icon';
import styles from './styles';

const LogoHeader = () => {
  return (
    <View style={styles.container}>
      <LogoIcon />
    </View>
  );
};

export default LogoHeader;
