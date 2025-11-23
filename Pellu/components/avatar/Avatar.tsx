import FontAwesome from "@expo/vector-icons/FontAwesome";
import React from 'react';
import { ImageProps } from 'react-native';
import ImageUri from '../imageUri/ImageUri';
import styles from './styles';

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
