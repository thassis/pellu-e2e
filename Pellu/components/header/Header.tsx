import Ionicons from '@expo/vector-icons/Ionicons';
import React, { TouchableOpacity, View } from 'react-native';
import Colors from '../../utils/Colors';
import Text from '../text/Text';
import styles from './styles';

type HeaderProps = {
  title: string;
  goBack: () => void;
};

export const Header = ({ title, goBack }: HeaderProps) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={goBack}>
        <Ionicons name="chevron-back" color={Colors.primary} size={24} />
      </TouchableOpacity>
      <Text medium style={styles.title}>
        {title}
      </Text>
    </View>
  );
};
