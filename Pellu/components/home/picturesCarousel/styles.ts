import { Dimensions, StyleSheet } from 'react-native';
const { width } = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    height: 300,
    width: '100%',
  },
  flexContainer: {
    flex: 1,
  },
  image: {
    width,
    height: 300,
    resizeMode: 'contain',
  },
  indicatorContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
    position: 'absolute',
    bottom: -24,
    width: '100%',
  },
  indicator: {
    height: 6,
    width: 6,
    borderRadius: 2,
    margin: 2,
    backgroundColor: 'gray',
  },
  activeIndicator: {
    backgroundColor: 'blue',
  },
  inactiveIndicator: {
    backgroundColor: 'gray',
  },
  imageContainer: {
    width,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
