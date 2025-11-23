import { StyleSheet } from 'react-native';
import Colors from '../../../utils/Colors';

export default StyleSheet.create({
  container: {
    flex: 1,
    gap: 4,
  },
  userPostContainer: {
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  titleContainer: {
    paddingHorizontal: 16,
  },
  row: {
    flexDirection: 'row',
    paddingLeft: 8,
    marginTop: 4,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    color: Colors.black,
    marginBottom: 8,
  },
  decription: {
    fontSize: 16,
    color: Colors.black,
  },
  bottom: {
    paddingHorizontal: 16,
  },
  text: {
    color: Colors.black,
  },
  smallText: {
    fontSize: 12,
  },
  images: {
    marginTop: 8,
  },
  touchable: {
    padding: 8,
  }
});
