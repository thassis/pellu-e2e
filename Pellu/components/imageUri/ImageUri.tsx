import FontAwesome from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import React, { JSX, useState } from 'react';
import { Dimensions, Image, ImageProps } from 'react-native';
import { env } from '../../env';
import { SizeType } from '../../types/utils.type';

const { width: fullWidth } = Dimensions.get('window');
type ImageUriProps = Omit<ImageProps, 'width' | 'height'> & {
  name: string;
  size: 'small' | 'medium' | 'large';
  width?: SizeType;
  height?: SizeType;
  defaultErrorElement?: JSX.Element;
  defaultErrorAvatar?: boolean;
};

const ImageUri = ({
  name,
  size,
  width,
  height,
  defaultErrorElement,
  defaultErrorAvatar,
  ...props
}: ImageUriProps) => {
  const [error, setError] = useState(false);

  const nameWithSize = `${size}-${name}`;
  const uriFullPath = {
    uri: `${env.URL_IMAGE}${nameWithSize}`,
  };

  const getSizeNumber = () => {
    const sizeNumber = Number(width) < Number(height) ? width : height;
    if (typeof sizeNumber === 'string') {
      const newSize = (Number(sizeNumber.replace('%', '')) * fullWidth) / 100;
      return newSize || 26;
    }
    return sizeNumber || 26;
  };

  if (error) {
    if (defaultErrorAvatar)
      return (
        <FontAwesome name="person-circle-outline" color={"#757575"} size={getSizeNumber()} />
      );

    if (defaultErrorElement) return defaultErrorElement;

    return <MaterialCommunityIcons name="image-off-outline" size={getSizeNumber()} />
  }

  return (
    <Image
      {...props}
      source={uriFullPath}
      onError={() => setError(true)}
      style={[props.style, { width, height }]}
    />
  );
};

export default ImageUri;
