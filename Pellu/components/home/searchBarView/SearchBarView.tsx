import Ionicons from '@expo/vector-icons/Ionicons';
import React, { useState } from 'react';
import { Keyboard, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';

type SearchBarViewProps = {
  value: string;
  placeholder: string;
  autoFocus?: boolean;
  showCancel?: boolean;
  showSubmit?: boolean;
  onChangeText: (text: string) => void;
  onSubmit?: () => void;
};

const SearchBarView = ({
  value,
  placeholder,
  showCancel,
  showSubmit,
  autoFocus,
  onChangeText,
  onSubmit,
}: SearchBarViewProps) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleClean = () => {
    Keyboard.dismiss();
    setIsFocused(false);
    onChangeText('');
  }

  const handleSubmit = () => {
    Keyboard.dismiss();
    setIsFocused(false);
    onSubmit?.();
  }

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Ionicons name="search" size={20} color="gray" style={styles.icon} />
        <TextInput
          value={value}
          style={styles.input}
          placeholder={placeholder}
          autoFocus={autoFocus}
          onChangeText={onChangeText}
          placeholderTextColor="gray"
          onSubmitEditing={handleSubmit}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          autoCapitalize="none"
        />
        {isFocused && showCancel && (
          <TouchableOpacity onPress={handleClean}>
            <Ionicons name='close' size={24} color='gray' />
          </TouchableOpacity>
        )}
      </View>
      {isFocused && showSubmit && (
        <TouchableOpacity style={styles.send} onPress={handleSubmit}>
          <Ionicons name='send' size={18} color='gray' />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    paddingHorizontal: 12,
  },
  icon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 16,
  },
  cancelText: {
    color: 'black',
    marginLeft: 8,
  },
  send: {
    padding: 16,
  }
});

export default SearchBarView;