import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useRouter } from "expo-router";
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import Colors from '../../utils/Colors';

type GoBackProps = {
  onPress?: () => void;
  withBackground?: boolean;
};

const GoBack = ({ onPress, withBackground }: GoBackProps) => {
  const { back } = useRouter();
  return (
    <View style={withBackground ? styles.absolute : undefined}>
      <TouchableOpacity
        style={styles.container}
        onPress={() => (onPress ? onPress() : back())}>
        {withBackground ? (
          <View style={styles.background}>
            <MaterialCommunityIcons
              name="chevron-left"
              color={Colors.white}
              size={24}
            />
          </View>
        ) : (
          <MaterialCommunityIcons
            name="arrow-left"
            color={Colors.black}
            size={24}
          />
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 16,
    paddingHorizontal: 16,
  },
  background: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    width: 40,
    height: 40,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  absolute: {
    position: 'absolute',
    top: 0,
    zIndex: 1,
  },
});

export default GoBack;
