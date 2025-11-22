import React from 'react';
import {Image, Rect, Svg, Text} from 'react-native-svg';
import {env} from '../../../env';

type Props = {
  name: string;
  breed: string;
  age: string;
  gender: string;
  size: string;
  owner: string;
  image: string;
};

const IdentityIcon = ({
  age,
  breed,
  gender,
  image,
  name,
  owner,
  size,
}: Props) => {
  return (
    <Svg
      width="100%"
      height="250"
      viewBox="0 0 400 250"
      preserveAspectRatio="xMidYMid meet">
      <Rect
        x="0"
        y="0"
        width="400"
        height="250"
        fill="#e0f7cc"
        stroke="#004d00"
        stroke-width="1.5"
      />
      <Rect
        x="5"
        y="5"
        width="390"
        height="240"
        fill="none"
        stroke="#004d00"
        stroke-width="3"
      />
      <Rect
        x="10"
        y="10"
        width="380"
        height="230"
        fill="none"
        stroke="#004d00"
        stroke-width="1.5"
        stroke-dasharray="5, 5"
      />

      {/* Imagem */}
      <Rect
        x="30"
        y="50"
        width="101"
        height="101"
        fill="none"
        stroke="#004d00"
        stroke-width="2"
      />
      <Image
        href={{uri: `${env.URL_IMAGE}medium-${image}`}}
        x="30"
        y="50"
        width="100"
        height="100"
      />

      {/* Nome */}
      <Text
        x="140"
        y="67"
        font-family="Arial"
        font-size="16"
        fill="#002200"
        font-weight="bold">
        Nome:
      </Text>
      <Text x="190" y="68" font-family="Arial" font-size="14" fill="#004d00">
        {name}
      </Text>
      <Rect
        x="180"
        y="50"
        width="185"
        height="25"
        fill="none"
        stroke="#004d00"
        stroke-width="1.5"
      />

      {/* Raça */}
      <Text
        x="140"
        y="102"
        font-family="Arial"
        font-size="16"
        fill="#002200"
        font-weight="bold">
        Raça:
      </Text>
      <Text x="190" y="103" font-family="Arial" font-size="14" fill="#004d00">
        {breed}
      </Text>
      <Rect
        x="180"
        y="85"
        width="185"
        height="25"
        fill="none"
        stroke="#004d00"
        stroke-width="1.5"
      />

      {/* Sexo e Idade */}
      <Text
        x="140"
        y="137"
        font-family="Arial"
        font-size="16"
        fill="#002200"
        font-weight="bold">
        Sexo:
      </Text>
      <Text x="190" y="137" font-family="Arial" font-size="14" fill="#004d00">
        {gender}
      </Text>
      <Rect
        x="180"
        y="120"
        width="30"
        height="25"
        fill="none"
        stroke="#004d00"
        stroke-width="1.5"
      />

      <Text
        x="220"
        y="137"
        font-family="Arial"
        font-size="16"
        fill="#002200"
        font-weight="bold">
        Idade:
      </Text>
      <Text x="270" y="137" font-family="Arial" font-size="14" fill="#004d00">
        {age}
      </Text>
      <Rect
        x="260"
        y="120"
        width="105"
        height="25"
        fill="none"
        stroke="#004d00"
        stroke-width="1.5"
      />

      {/* Porte */}
      <Text
        x="140"
        y="172"
        font-family="Arial"
        font-size="16"
        fill="#002200"
        font-weight="bold">
        Porte:
      </Text>
      <Text x="190" y="173" font-family="Arial" font-size="14" fill="#004d00">
        {size}
      </Text>
      <Rect
        x="180"
        y="155"
        width="185"
        height="25"
        fill="none"
        stroke="#004d00"
        stroke-width="1.5"
      />

      {/* Dono */}
      <Text
        x="140"
        y="207"
        font-family="Arial"
        font-size="16"
        fill="#002200"
        font-weight="bold">
        Dono:
      </Text>
      <Text x="190" y="208" font-family="Arial" font-size="14" fill="#004d00">
        {owner}
      </Text>
      <Rect
        x="180"
        y="190"
        width="185"
        height="25"
        fill="none"
        stroke="#004d00"
        stroke-width="1.5"
      />
    </Svg>
  );
};

export default IdentityIcon;
