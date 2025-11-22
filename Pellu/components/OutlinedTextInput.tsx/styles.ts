import {StyleSheet} from 'react-native';
import Colors from '../../utils/Colors';

export default StyleSheet.create({
  view: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 24,
    borderWidth: 0.5,
    borderColor: Colors.lightGray,
    marginVertical: 16,
    flex: 1,
  },
  input: {
    fontSize: 12,
    padding: 8,
  },
});