import React from 'react';
import { View } from 'react-native';
import styles from './styles';
import { PetType } from '../../../../types/offer.type';
import Bullets from '../../../bullets/Bullets';
import { IOng } from '../../../../types/ong.type';

const OngTypeFilter = ({
  ongs,
  ongFilterId,
  setOngFilterId
}: {
  ongs: IOng[];
  ongFilterId: string | undefined;
  setOngFilterId: (ongId: string | undefined) => void;
}) => {
  const ongsType = ongs.map(ong => ({
    key: ong._id,
    text: ong.name,
  }));

  return (
    <View style={styles.container}>
      <Bullets
        data={ongsType}
        value={ongFilterId}
        setValue={setOngFilterId}
      />
    </View>
  );
};

export default OngTypeFilter;
