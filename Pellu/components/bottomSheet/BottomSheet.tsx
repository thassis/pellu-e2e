import BottomSheetG, { BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import React, { useEffect, useRef } from 'react';
import { BackHandler, View } from 'react-native';
import Text from '../text/Text';
import BottomSheetComments from './BottomSheetComments';
import { useBottomSheet } from './BottomSheetContext';
import BottomSheetPetFilter from './BottomSheetPetFilter';
import styles from './styles';

const BottomSheet = () => {
  const { visible, title, type, closeSheet } = useBottomSheet();

  const isVisible = useRef(false);
  isVisible.current = visible;
  const sheetRef = useRef<BottomSheetG>(null);

  const close = () => {
    closeSheet();
    sheetRef.current?.close();
  }

  const renderContent = () => {
    return (
      <>
        <BottomSheetPetFilter isVisible={type === 'pet-filter'} close={close} />
        {/*the pet-filter needs to be rendered always in order to keep its states*/}
        {type === 'comments' && <BottomSheetComments close={close} />}
      </>
    )
  }

  useEffect(() => {
    if (visible) {
      sheetRef.current?.snapToIndex(0);
    } else {
      close();
    }
  }, [visible]);

  useEffect(() => {
    const backAction = () => {
      if (isVisible.current) {
        close();
        return true;
      }
      return false;
    }

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);

  return (
    <BottomSheetG
      ref={sheetRef}
      snapPoints={["70%"]}
      enablePanDownToClose={true}
      enableDynamicSizing={false}
      onClose={() => closeSheet()}
      backdropComponent={(props) =>
        <BottomSheetBackdrop
          {...props}
          disappearsOnIndex={-1}
          appearsOnIndex={0}
          pressBehavior={'close'}
        />}
      index={-1}
    >
      <View style={styles.container}>
        <View style={styles.title}>
          <Text style={styles.titleText} bold>
            {title}
          </Text>
        </View>
        {/* {renderContent()} */}
      </View>
    </BottomSheetG>
  );
}

export default BottomSheet;
