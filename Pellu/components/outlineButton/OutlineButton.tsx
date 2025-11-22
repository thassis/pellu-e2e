import React from "react";
import { StyleSheet, TouchableOpacity, ViewStyle } from "react-native";
import Text from "../text/Text";
import Colors from "../../utils/Colors";

type Props = {
  title: string;
  onPress: () => void;
  style?: ViewStyle;
  type?: 'primary' | 'outline';
}

const OutlineButton = ({ title, style, onPress, type = 'outline' }: Props) => {
  return (
    <TouchableOpacity style={[styles.container, styles[type], style]} onPress={onPress}>
      <Text bold style={[styles.txt, { color: type == 'primary' ? 'white' : 'black' }]}>{title}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 6,
    paddingHorizontal: 8,
    borderRadius: 8,
    borderColor: 'black',
    alignItems: 'center',
    justifyContent: 'center'
  },
  primary: {
    borderWidth: 0,
    backgroundColor: Colors.primary,
    color: 'white'
  },
  outline: {
    borderWidth: 1,
    backgroundColor: 'transparent',
    color: 'black'
  },
  txt: {
    fontSize: 12
  }
});

export default OutlineButton;