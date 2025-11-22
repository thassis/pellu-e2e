import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import styles from './styles';
import Text from '../text/Text';

type TypeProps = {
  value: string;
  selected: boolean;
  onClick: () => void;
};

const Type = ({ value, selected, onClick }: TypeProps) => {
  const badgeStyle = selected ? styles.badgeSelected : styles.badgeUnselected;
  const textColor = selected ? { color: 'white' } : { color: 'black' };

  return (
    <TouchableOpacity
      key={value}
      style={[styles.badge, badgeStyle]}
      onPress={() => onClick()}>
      <Text key={value} style={[styles.text, textColor]}>{value}</Text>
    </TouchableOpacity>
  );
};

type Data = {
  key: string | undefined;
  text: string;
}

const Bullets = ({
  data,
  value,
  setValue,
}: {
  data: Data[],
  value: string | undefined;
  setValue: (value: string | undefined) => void;
}) => {
  const handleSelectBadge = (typeValue: string | undefined) => {
    setValue(typeValue);
  };

  return (
    <View style={styles.container}>
      {data.map(type => (
        <View key={type.text}>
          <Type
            value={type.text}
            selected={value === type.key}
            onClick={() => handleSelectBadge(type.key)}
          />
        </View>
      ))}
    </View>
  );
};

export default Bullets;
