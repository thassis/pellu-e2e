import React, {useState} from 'react';
import {View} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import Colors from '../../utils/Colors';
import Text from '../text/Text';
import styles from './styles';

type SelectProps = {
  options: string[];
  label: string;
  value: string;
  search?: boolean;
  searchPlaceholder?: string;
  onChange: (value: string) => void;
};

const Select = ({
  options,
  label,
  value,
  search,
  searchPlaceholder,
  onChange,
}: SelectProps) => {
  const [isFocus, setIsFocus] = useState(false);

  const renderLabel = () => {
    if (value || isFocus) {
      return (
        <Text
          medium={isFocus}
          style={[styles.label, isFocus && {color: Colors.secondary}]}>
          {label}
        </Text>
      );
    }
    return null;
  };

  const selectOptions = options.map(option => ({
    label: option,
    value: option,
  }));

  return (
    <View style={styles.container}>
      {renderLabel()}
      <Dropdown
        search={search}
        searchPlaceholder={searchPlaceholder}
        style={[
          styles.dropdown,
          isFocus && {borderColor: Colors.secondary, borderWidth: 1.5},
        ]}
        placeholderStyle={[
          styles.placeholderStyle,
          isFocus && {color: Colors.secondary},
        ]}
        selectedTextStyle={styles.selectedTextStyle}
        data={selectOptions}
        labelField="label"
        valueField="value"
        placeholder={!isFocus ? label : ''}
        value={value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={item => {
          onChange(item.value);
          setIsFocus(false);
        }}
      />
    </View>
  );
};

export default Select;
