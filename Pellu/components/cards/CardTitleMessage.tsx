import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import Text from '../text/Text';
import Colors from '../../utils/Colors';

type Props = {
  title: string;
  message: string;
};

const CardTitleMessage = ({title, message}: Props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.message} medium>
        {message}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
    backgroundColor: Colors.background,
    gap: 4,
    borderRadius: 8,
    justifyContent: 'center',
  },
  title: {
    fontSize: 14,
    color: Colors.text,
  },
  message: {
    fontSize: 16,
    color: Colors.secondary,
  },
});

export default CardTitleMessage;
