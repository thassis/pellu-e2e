import React from 'react';
import {TextInput, View} from 'react-native';
import {TextInputProps} from 'react-native-paper';
import styles from './styles';

const OutlinedTextInput = ({right, ...props}: TextInputProps) => {
  return (
    <View style={styles.view}>
      <TextInput {...props} style={[styles.container, styles.input, props.style]} />
      {right && right}
    </View>
  );
};

export default OutlinedTextInput;