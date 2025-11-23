import { Checkbox } from 'expo-checkbox';
import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import Colors from "../../utils/Colors";
import Text from "../text/Text";

type Props = {
  value: boolean;
  onChange: () => void;
  label: string;
}

const RadioButton = ({ value, onChange, label }: Props) => {
  return (
    <TouchableOpacity onPress={() => onChange()} style={styles.radio}>
      <Checkbox
        value={value}
        color={Colors.primary}
        onChange={() => onChange()}
      />
      <Text type="h1">{label}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  radio: {
    flexDirection: 'row',
    alignItems: "center",
    justifyContent: 'center'
  }
})

export default RadioButton;