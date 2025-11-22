import {StyleSheet} from 'react-native';
import Colors from '../../utils/Colors';

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: Colors.white,
    padding: 12,
    paddingHorizontal: 8,
    alignItems: 'center',
    elevation: 2,
    zIndex: 1,
    paddingRight: 36,
  },
  title: {
    flex: 1,
    textAlign: 'center',
    fontSize: 16,
    color: Colors.text,
  },
});
