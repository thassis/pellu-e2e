import { StyleSheet } from 'react-native';
import Colors from '../../utils/Colors';

export default StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    flex: 1,
  },
  titleText: {
    fontSize: 14,
    color: Colors.black,
    textAlign: 'center',
  },
  title: {
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomColor: Colors.lightGray,
    borderBottomWidth: 0.2,
    paddingHorizontal: 16,
    paddingBottom: 12,
  },
  row: {
    marginTop: 16,
    flexDirection: 'row',
  },
  content: {
    gap: 4,
    paddingHorizontal: 8,
    width: '100%',
  },
  name: {
    fontSize: 11,
    color: Colors.black,
  },
  comment: {
    flex: 1,
    fontSize: 12,
    color: Colors.black,
  },
  publishAt: {
    fontSize: 11,
  },
  body: {
    flex: 1,
    paddingHorizontal: 16,
  },
  text: {
    marginTop: 16,
  },
});
