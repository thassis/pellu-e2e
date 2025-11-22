import {StyleSheet} from 'react-native';
import Colors from '../../utils/Colors';

export default StyleSheet.create({
  container: {
    backgroundColor: 'white',
    marginHorizontal: 4,
  },
  dropdown: {
    height: 50,
    borderColor: Colors.gray,
    borderWidth: 0.8,
    borderRadius: 4,
    paddingHorizontal: 12,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 8,
    bottom: 40,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
    color: Colors.text,
  },
});
