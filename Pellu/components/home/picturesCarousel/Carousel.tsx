import React, { useEffect, useRef, useState } from 'react';
import {
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  View
} from 'react-native';
import { SizeType } from '../../../types/utils.type';
import styles from './styles';

interface CarouselProps {
  images: string[];
  renderImage: (
    image: string,
    defaultWidth?: SizeType,
    defaultHeight?: SizeType,
  ) => React.ReactNode;
}

const Carousel: React.FC<CarouselProps> = ({ images, renderImage }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollViewRef = useRef<ScrollView>(null);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const slide = Math.ceil(
      event.nativeEvent.contentOffset.x /
      event.nativeEvent.layoutMeasurement.width,
    );
    if (slide !== currentIndex) {
      setCurrentIndex(slide);
    }
  };

  useEffect(() => {
    scrollViewRef.current?.scrollTo({ x: 0, y: 0 });
    setCurrentIndex(0);
  }, [images]);

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        pagingEnabled
        onScroll={handleScroll}
        showsHorizontalScrollIndicator={false}
        ref={scrollViewRef}
        scrollEventThrottle={16}>
        {images.map((image, index) => (
          <View key={index + image} style={styles.imageContainer}>
            {renderImage(image, '100%', 300)}
          </View>
        ))}
      </ScrollView>
      <View style={styles.indicatorContainer}>
        {images.map((_, index) => (
          <View
            key={index}
            style={[
              styles.indicator,
              currentIndex === index
                ? styles.activeIndicator
                : styles.inactiveIndicator,
            ]}
          />
        ))}
      </View>
    </View>
  );
};

export default Carousel;
