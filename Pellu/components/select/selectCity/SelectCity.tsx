import React, { useEffect, useRef, useState } from 'react';
import { TouchableOpacity, View, FlatList, Keyboard, TextInput as RNTextInput, ScrollView } from 'react-native';
import cities from '../../../../assets/cities';
import TextInput from '../../TextInput/TextInput';
import Text from '../../text/Text';
import Colors from '../../../utils/Colors';

type Props = {
  state: keyof typeof cities;
  onSelect: (
    value: string,
    latitude: number,
    longitude: number,
  ) => void;
  inputValue: string,
  setInputValue: (text: string) => void,
  scrollRef: React.RefObject<ScrollView | null>,
};

const SelectCity = ({ inputValue, setInputValue, state, onSelect, scrollRef }: Props) => {
  const citiesByState = cities[state];
  const cityNames = citiesByState.map(city => city.city);

  const [showList, setShowList] = useState(false);
  const [error, setError] = useState('');
  const inputRef = useRef<RNTextInput>(null);
  const internalChange = useRef(false);

  const filteredCities = cityNames.filter(city =>
    city.toLowerCase().includes(inputValue.toLowerCase()),
  );

  const handleSelect = (cityName: string) => {
    console.log("selecting: ", cityName)
    const city = citiesByState.find(c => c.city === cityName);
    if (city) {
      internalChange.current = true;
      setInputValue(city.city);
      setError('');
      setShowList(false);
      onSelect(city.city, city.latitude, city.longitude);
      Keyboard.dismiss();
    }
  };

  const handleBlur = () => {
    const match = citiesByState.find(c => c.city.toLowerCase() === inputValue.toLowerCase());
    if (!match) {
      setInputValue('');
      setError('Por favor, clique em uma cidade válida.');
      setShowList(false);
    }
  };

  const handleFocus = () => {
    setShowList(true); setError('')

    setTimeout(() => {
      scrollRef?.current?.scrollTo({
        y: 300,
        animated: true,
      });
    }, 300);
  }

  const handleSubmit = () => {
    if (filteredCities.length === 1) {
      handleSelect(filteredCities[0]);
    }
  }

  useEffect(() => {
    const keyboardHideListener = Keyboard.addListener('keyboardDidHide', () => {
      setShowList(false);
    });

    return () => {
      keyboardHideListener.remove();
    };
  }, []);

  return (
    <View>
      <TextInput
        ref={inputRef}
        value={inputValue}
        onChangeText={text => {
          setInputValue(text);
          setShowList(true);
          setError('');
        }}
        label="Cidade"
        onBlur={handleBlur}
        onFocus={() => {handleFocus()}}
        onSubmitEditing={handleSubmit}
      />
      {error ? (
        <Text style={{ color: Colors.error, marginTop: 4, marginLeft: 6 }}>{error}</Text>
      ) : null}

      {showList && filteredCities.length > 0 && (
        <FlatList
          data={filteredCities}
          keyExtractor={item => item}
          style={{
            borderWidth: 1,
            borderColor: Colors.lightGray,
            marginTop: -4,
            marginHorizontal: 6,
            backgroundColor: 'white',
          }}
          keyboardShouldPersistTaps="handled"
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => handleSelect(item)}
              style={{ padding: 12 }}
            >
              <Text>{item}</Text>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
};

export default SelectCity;
