import Icon from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import { Dimensions, Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { OnboardingStorage } from '../asyncStorage/onboarding.storage';
import LogoHeader from '../components/logoHeader.tsx/LogoHeader';
import Text from '../components/text/Text';
import Colors from '../utils/Colors';

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
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [currentTranslate, setCurrentTranslate] = useState(0);
  const [prevTranslate, setPrevTranslate] = useState(0);
  const containerRef = useRef<View>(null);

  const getContainerWidth = () => {
    if (typeof window !== 'undefined') {
      return window.innerWidth;
    }
    return Dimensions.get('window').width;
  };

  const handleNext = () => {
    if (currentIndex < slides.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      goHome();
    }
  };

  const goHome = () => {
    OnboardingStorage.set();
    replace('/(tabs)/home');
  };

  useEffect(() => {
    const width = getContainerWidth();
    const newTranslate = -currentIndex * width;
    setPrevTranslate(newTranslate);
    setCurrentTranslate(newTranslate);
  }, [currentIndex]);

  const handleMouseDown = (e: any) => {
    setIsDragging(true);
    setStartX(e.clientX || e.touches?.[0]?.clientX || 0);
  };

  const handleMouseMove = (e: any) => {
    if (!isDragging) return;
    const currentX = e.clientX || e.touches?.[0]?.clientX || 0;
    const diff = currentX - startX;
    setCurrentTranslate(prevTranslate + diff);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    const width = getContainerWidth();
    const movedBy = currentTranslate - prevTranslate;

    if (movedBy < -width / 4 && currentIndex < slides.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else if (movedBy > width / 4 && currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    } else {
      setCurrentTranslate(prevTranslate);
    }
  };

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleGlobalMouseMove = (e: MouseEvent) => handleMouseMove(e);
    const handleGlobalMouseUp = () => handleMouseUp();

    if (isDragging) {
      window.addEventListener('mousemove', handleGlobalMouseMove);
      window.addEventListener('mouseup', handleGlobalMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleGlobalMouseMove);
      window.removeEventListener('mouseup', handleGlobalMouseUp);
    };
  }, [isDragging, startX, currentTranslate, prevTranslate, currentIndex]);

  return (
    <View style={styles.container}>
      <LogoHeader />
      <View style={styles.body}>
        <View
          ref={containerRef}
          style={styles.carouselContainer}
          onStartShouldSetResponder={() => true}
          onResponderStart={handleMouseDown}
          onResponderMove={handleMouseMove}
          onResponderRelease={handleMouseUp}
        >
          <View
            style={[
              styles.slidesWrapper,
              {
                transform: [{ translateX: currentTranslate }],
                transition: isDragging ? 'none' : 'transform 0.3s ease-out'
              } as any
            ]}
          >
            {slides.map((slide, index) => (
              <View key={slide.id} style={styles.slide}>
                <Image source={slide.image} style={styles.image} />
                <Text style={styles.text}>{slide.text}</Text>
                <Text style={styles.message}>{slide.message}</Text>
              </View>
            ))}
          </View>
        </View>

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
            <Icon name="arrow-forward-circle" size={36} color={Colors.secondary} testID='arrow-forward-circle' />
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
  carouselContainer: {
    flex: 1,
    width: '100%',
    overflow: 'hidden',
  },
  slidesWrapper: {
    flexDirection: 'row',
    height: '100%',
  },
  image: {
    width: Dimensions.get('window').width - 50,
    height: Dimensions.get('window').width - 50,
    resizeMode: 'contain',
  },
  slide: {
    width: Dimensions.get('window').width,
    alignItems: 'center',
    justifyContent: 'center',
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