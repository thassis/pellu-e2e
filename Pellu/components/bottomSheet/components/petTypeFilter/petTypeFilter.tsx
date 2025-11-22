import React from 'react';
import { View } from 'react-native';
import styles from './styles';
import { PetType } from '../../../../types/offer.type';
import Bullets from '../../../bullets/Bullets';

const PetTypeFilter = ({
  petType,
  setPetType,
}: {
  petType: PetType | undefined;
  setPetType: (type: PetType | undefined) => void;
}) => {
  const filterTypes = [
    {
      key: undefined,
      text: 'Todos',
    },
    {
      key: 'DOG',
      text: 'Cachorros',
    },
    {
      key: 'CAT',
      text: 'Gatos',
    },
    {
      key: 'OTHERS',
      text: 'Outros',
    },
  ];

  return (
    <View style={styles.container}>
      <Bullets
        data={filterTypes}
        value={petType}
        setValue={(value) => setPetType(value as PetType | undefined)}
      />
    </View>
  );
};

export default PetTypeFilter;
