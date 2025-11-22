import React from 'react';
import { TouchableOpacity, TouchableOpacityProps } from 'react-native';
import Text from '../text/Text';
import styles from './styles';
import Loading from '../loading/Loading';

type PrimaryButtonProps = TouchableOpacityProps & {
  title: string;
  loading?: boolean;
  onPressDisabled?: () => void;
};

const PrimaryButton = ({
  title,
  disabled,
  loading,
  onPress,
  onPressDisabled,
  ...props
}: PrimaryButtonProps) => {
  return (
    <TouchableOpacity
      {...props}
      onPress={e => disabled ? onPressDisabled?.() : onPress?.(e)}
      style={[
        styles.container,
        props.style,
        disabled && styles.containerDisabled,
      ]}>
      {loading ? (
        <Loading size={20} loading color={'white'} />
      ) : (
        <Text medium style={[styles.text, disabled && styles.textDisabled]}>
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};

export default PrimaryButton;
