import {StyleSheet} from 'react-native';
import Colors from '../../utils/Colors';

export default StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: Colors.primary,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },
  containerDisabled: {
    backgroundColor: Colors.disabled,
  },
  text: {
    fontSize: 16,
    color: Colors.white,
  },
  textDisabled: {
    color: Colors.gray,
  },
});
