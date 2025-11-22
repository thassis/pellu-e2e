import React from 'react';
import { StyleSheet, TextInput } from 'react-native';
import Colors from '../../utils/Colors';

type TextArea = {
  placeholder: string;
  value: string;
  setValue: (value: string) => void;
  maxLength?: number;
};

const TextArea = ({ placeholder, value, setValue, maxLength }: TextArea) => {
  return (
    <TextInput
      style={styles.textInput}
      placeholder={placeholder}
      value={value}
      onChangeText={setValue}
      maxLength={maxLength}
      textAlignVertical="top"
      multiline
    />
  );
};

const styles = StyleSheet.create({
  textInput: {
    borderWidth: 0.5,
    color: Colors.black,
    borderRadius: 4,
    flexGrow: 1,
    paddingHorizontal: 8,
    fontSize: 16,
  },
});

export default TextArea;
