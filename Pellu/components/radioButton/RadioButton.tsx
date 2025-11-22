import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import Text from "../text/Text";
import Colors from "../../utils/Colors";
import { RadioButton as RB } from "react-native-paper";

type Props = {
  value: boolean;
  onChange: () => void;
  label: string;
}

const RadioButton = ({value, onChange, label}: Props) => {
  return (
    <TouchableOpacity onPress={() => onChange()} style={styles.radio}>
      <RB
        value={String(value)}
        color={Colors.primary}
        status={value ? 'checked' : 'unchecked'}
        onPress={() => onChange()}
        uncheckedColor='black'
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