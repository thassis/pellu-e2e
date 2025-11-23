import { Checkbox as CB } from 'expo-checkbox';
import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import Colors from '../../utils/Colors';
import Text from '../text/Text';

type Props = {
  checked: boolean;
  label?: string;
  onPress: () => void;
  disabled?: boolean;
};

const Checkbox = ({ checked, label, disabled, onPress }: Props) => {
  return (
    <TouchableOpacity style={styles.container} onPress={() => onPress()}>
      <CB
        value={checked}
        onValueChange={() => onPress()}
        disabled={disabled}
      />
      <Text type="h1" style={styles.disabled}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  disabled: {
    color: Colors.disabled,
  }
});
export default Checkbox;
