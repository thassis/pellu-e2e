import React from 'react';
import {View, Image} from 'react-native';
import styles from './styles';
import LogoIcon from '../../assets/svg/logo.icon';

const LogoHeader = () => {
  return (
    <View style={styles.container}>
      <LogoIcon />
    </View>
  );
};

export default LogoHeader;
