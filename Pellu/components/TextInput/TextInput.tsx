import React, { useEffect, useRef, useState } from 'react';
import { View } from 'react-native';
import { TextInput as TextInputP, TextInputProps } from 'react-native-paper';
import TextInputMask from 'react-native-text-input-mask';
import Colors from '../../utils/Colors';
import Text from '../text/Text';
import styles from './styles';

type Props = TextInputProps & {
  mask?: string;
  onChangeText: (text: string, unmasked?: string) => void;
  autoFocus?: boolean;
  errorText?: string;
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

  useEffect(() => {
    if (autoFocus && inputRef.current) {
      const timeoutId = setTimeout(() => {
        inputRef?.current?.focus();
      }, 500);

      return () => clearTimeout(timeoutId);
    }
  }, [autoFocus]);

  return (
    <View style={[styles.container, props.style]}>
      <TextInputP
        ref={inputRef}
        mode="outlined"
        label={label}
        {...props}
        theme={{
          colors: {
            primary: Colors.secondary,
            placeholder: Colors.secondary,
            text: '#000000',
            background: '#ffffff',
            onSurfaceVariant: Colors.lightGray,
          },
        }}
        {...(!!mask && {
          render: props_render => (
            <TextInputMask
              {...(props_render as any)}
              style={{ paddingVertical: 12, paddingHorizontal: 16 }}
              mask={mask}
              onChangeText={(formatted, extracted) => {
                props?.onChangeText?.(formatted, extracted || '');
              }}
            />
          ),
        })}
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
