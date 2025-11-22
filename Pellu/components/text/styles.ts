import { StyleSheet } from 'react-native';
import Colors from '../../utils/Colors';

export default StyleSheet.create({
  text: {
    fontFamily: 'DMSans-Regular',
  },
  textMedium: {
    fontFamily: 'DMSans-Medium',
  },
  textBold: {
    fontFamily: 'DMSans-Bold',
  },
  link: {
    color: '#007AFF',
  },
  pageTitle: {
    fontFamily: 'DMSans-Regular',
    fontSize: 36,
    color: Colors.black,
    marginBottom: 16,
  },
  subtitle: {
    fontFamily: 'DMSans-Regular',
    fontSize: 20,
    color: Colors.black,
    marginBottom: 16,
  },
  h1: {
    fontFamily: 'DMSans-Regular',
    fontSize: 16,
    color: Colors.black,
  },
  delete: {
    fontSize: 14,
    color: Colors.error,
    fontFamily: 'DMSans-Regular',
  },
});
