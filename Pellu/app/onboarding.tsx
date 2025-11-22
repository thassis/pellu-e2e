import Icon from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';
import React, { useRef, useState } from 'react';
import { Dimensions, FlatList, Image, NativeScrollEvent, NativeSyntheticEvent, StyleSheet, TouchableOpacity, View } from 'react-native';
import { OnboardingStorage } from '../asyncStorage/onboarding.storage';
import LogoHeader from '../components/logoHeader.tsx/LogoHeader';
import Text from '../components/text/Text';
import Colors from '../utils/Colors';

const { width } = Dimensions.get('window');

const slides = [
  {
    id: '1',
    text: "Bem-vindo ao Pellu, a rede social feita para amantes de pets!",
    message: "Descubra e compartilhe histórias, divirta-se com memes, participe de enquetes e muito mais!",
    image: require('../assets/images/onboarding-1.png')
  },
  {
    id: '2',
    text: "Encontre seu melhor amigo!",
    message: "Adote um pet ou compartilhe um para adoção. Além disso, você pode gerenciar a saúde do seu pet, acompanhando o histórico de vacinas e cuidados essenciais.",
    image: require('../assets/images/onboarding-2.png')
  },
  {
    id: '3',
    text: "Totalmente Grátis!",
    message: "E o melhor: ao usar o app, você já apoia o trabalho das ONGs parceiras para ajudar os animais! 🐾",
    image: require('../assets/images/onboarding-3.png')
  },
];

const OnboardingScreen = () => {
  const { replace } = useRouter();
  const flatListRef = useRef<FlatList>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    if (currentIndex < slides.length - 1) {
      flatListRef.current?.scrollToIndex({ index: currentIndex + 1, animated: true });
      setCurrentIndex(currentIndex + 1);
    } else if (currentIndex === slides.length - 1) {
      goHome();
    }
  };

  const handleScrollEnd = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const index = Math.round(event.nativeEvent.contentOffset.x / width);
    if (index === slides.length - 1) {
      goHome();
      return;
    }
    setCurrentIndex(index);
  };

  const goHome = () => {
    OnboardingStorage.set();
    replace('/home');
  };

  return (
    <View style={styles.container}>
      <LogoHeader />
      <View style={styles.body}>
        <FlatList
          ref={flatListRef}
          data={slides}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          onMomentumScrollEnd={handleScrollEnd}
          renderItem={({ item }) => (
            <View style={styles.slide}>
              <Image source={item.image} style={styles.image} />
              <Text style={styles.text}>{item.text}</Text>
              <Text style={styles.message}>{item.message}</Text>
            </View>
          )}
        />

        <View style={styles.indicatorContainer}>
          {slides.map((_, index) => (
            <View key={index} style={[styles.indicator, currentIndex === index && styles.activeIndicator]} />
          ))}
        </View>

        <View style={styles.buttonsContainer}>
          <TouchableOpacity onPress={goHome}>
            <Text style={styles.buttonText}>Pular</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleNext}>
            <Icon name="arrow-forward-circle" size={36} color={Colors.secondary} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default OnboardingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  body: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  image: {
    width: width - 50,
    height: width - 50,
    resizeMode: 'contain',
  },
  slide: {
    width: width,
    alignItems: 'center',
  },
  text: {
    marginTop: 20,
    fontSize: 20,
    textAlign: 'center',
    paddingHorizontal: 20,
    fontWeight: 'bold',
    color: Colors.primary,
  },
  message: {
    marginTop: 20,
    fontSize: 16,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  indicatorContainer: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 80,
  },
  indicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#ccc',
    marginHorizontal: 5,
  },
  activeIndicator: {
    backgroundColor: Colors.primary,
  },
  buttonsContainer: {
    position: 'absolute',
    bottom: 40,
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buttonText: {
    fontSize: 18,
    color: Colors.secondary,
  },
});