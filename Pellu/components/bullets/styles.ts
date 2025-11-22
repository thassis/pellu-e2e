import { StyleSheet } from 'react-native';
import Colors from '../../utils/Colors';

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 16,
    flex: 1,
    flexWrap: 'wrap',
  },
  badge: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
  },
  badgeSelected: {
    backgroundColor: Colors.secondary,
    color: Colors.white,
  },
  badgeUnselected: {
    backgroundColor: Colors.background,
    color: Colors.black,
  },
  text: {},
});
