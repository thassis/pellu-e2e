import React, { useEffect, useRef, useState } from 'react';
import { View, ViewStyle } from 'react-native';
import { TextInput as TextInputP, TextInputProps } from 'react-native-paper';
import Colors from '../../utils/Colors';
import Text from '../text/Text';
import styles from './styles';

type Props = TextInputProps & {
  mask?: string;
  onChangeText: (text: string, unmasked?: string) => void;
  autoFocus?: boolean;
  errorText?: string;
  style?: ViewStyle;
};

const applyMask = (value: string, mask: string): { formatted: string; unmasked: string } => {
  let formatted = '';
  let unmasked = '';
  let valueIndex = 0;

  for (let i = 0; i < mask.length && valueIndex < value.length; i++) {
    const maskChar = mask[i];
    const valueChar = value[valueIndex];

    if (maskChar === '9') {
      if (/\d/.test(valueChar)) {
        formatted += valueChar;
        unmasked += valueChar;
        valueIndex++;
      } else {
        break;
      }
    } else if (maskChar === 'A') {
      if (/[a-zA-Z]/.test(valueChar)) {
        formatted += valueChar;
        unmasked += valueChar;
        valueIndex++;
      } else {
        break;
      }
    } else if (maskChar === '*') {
      formatted += valueChar;
      unmasked += valueChar;
      valueIndex++;
    } else {
      formatted += maskChar;
      if (valueChar === maskChar) {
        valueIndex++;
      }
    }
  }

  return { formatted, unmasked };
};

const TextInput = ({
  label,
  mask,
  autoFocus,
  secureTextEntry,
  ...props
}: Props) => {
  const inputRef = useRef<any>(null);
  const [hideValue, setHideValue] = useState(secureTextEntry);
  const [displayValue, setDisplayValue] = useState(props.value || '');

  useEffect(() => {
    if (autoFocus && inputRef.current) {
      const timeoutId = setTimeout(() => {
        inputRef?.current?.focus();
      }, 500);

      return () => clearTimeout(timeoutId);
    }
  }, [autoFocus]);

  useEffect(() => {
    if (props.value !== undefined) {
      setDisplayValue(props.value);
    }
  }, [props.value]);

  const handleChangeText = (text: string) => {
    if (mask) {
      const cleanText = text.replace(/[^\w]/g, '');
      const { formatted, unmasked } = applyMask(cleanText, mask);
      setDisplayValue(formatted);
      props?.onChangeText?.(formatted, unmasked);
    } else {
      setDisplayValue(text);
      props?.onChangeText?.(text, text);
    }
  };

  return (
    <View style={[styles.container, props.style]}>
      <TextInputP
        ref={inputRef}
        mode="outlined"
        label={label}
        {...props}
        value={displayValue}
        onChangeText={handleChangeText}
        theme={{
          colors: {
            primary: Colors.secondary,
            placeholder: Colors.secondary,
            text: '#000000',
            background: '#ffffff',
            onSurfaceVariant: Colors.lightGray,
          },
        }}
        style={[{ marginBottom: !!mask ? 16 : 0 }]}
        secureTextEntry={secureTextEntry && hideValue}
        left={props.left}
        right={
          secureTextEntry ? (
            <TextInputP.Icon
              icon={hideValue ? 'eye' : 'eye-off'}
              onPress={() => setHideValue(!hideValue)}
              color={Colors.gray}
            />
          ) : props.right
        }
      />
      {props.errorText && props.error && (
        <Text style={styles.errorText}>{props.errorText}</Text>
      )}
    </View>
  );
};

export default TextInput;