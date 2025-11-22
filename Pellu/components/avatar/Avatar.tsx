import React from 'react';
import { ImageProps } from 'react-native';
import styles from './styles';
import ImageUri from '../imageUri/ImageUri';
import FontAwesome from "@react-native-vector-icons/fontawesome";

type ImageServerProps = Omit<ImageProps, 'width' | 'height'> & {
  pictureName: string;
  size?: number;
};

const Avatar = ({ pictureName, size = 28, ...props }: ImageServerProps) => {
  return (
    <ImageUri
      size="small"
      defaultErrorAvatar
      style={[styles.profile, props.style]}
      name={pictureName}
      resizeMode="cover"
      width={size}
      height={size}
      defaultErrorElement={<FontAwesome name="user-circle" size={28} />}
      {...props}
    />
  );
};

export default Avatar;
