import React from 'react';
import { TextInput, TextInputProps, View } from 'react-native';
import styles from './styles';

const OutlinedTextInput = ({ right, ...props }: TextInputProps & { right?: React.ReactNode }) => {
  return (
    <View style={styles.view}>
      <TextInput {...props} style={[styles.container, styles.input, props.style]} />
      {right && right}
    </View>
  );
};

export default OutlinedTextInput;