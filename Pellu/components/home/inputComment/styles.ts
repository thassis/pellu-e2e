import { StyleSheet } from 'react-native';
import Colors from '../../../utils/Colors';

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    borderTopWidth: 0.2,
    borderColor: Colors.lightGray,
    paddingHorizontal: 16,
  },
  profile: {
    borderRadius: 14,
  },
  loginContainer: {
    padding: 16,
  },
  send: {
    width: 48,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: -8
  }
});
