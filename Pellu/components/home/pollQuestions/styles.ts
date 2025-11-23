import { StyleSheet } from 'react-native';
import Colors, { hexToRGBA } from '../../../utils/Colors';

export default StyleSheet.create({
  container: {
    gap: 4,
    flex: 1,
    flexDirection: 'column',
  },
  questionContainer: {
    paddingVertical: 8,
    borderWidth: 0.5,
    borderRadius: 4,
    borderColor: Colors.lightGray,
    flexDirection: 'row',
  },
  clickedContainer: {
    borderColor: Colors.primary,
    borderWidth: 2,
  },
  fill: {
    height: 36,
    position: 'absolute',
    left: 0,
    top: 0,
    zIndex: -1,
  },
  fillChecked: {
    backgroundColor: hexToRGBA(Colors.primary, 0.3),
  },
  fillUnchecked: {
    backgroundColor: hexToRGBA(Colors.disabled, 0.3),
  },
  textView: {
    marginLeft: 8,
    flex: 1,
    flexDirection: 'row',
    zIndex: 1,
  },
  text: {
    alignSelf: 'center',
    fontWeight: 'bold',
    zIndex: 1,
  },
  textPercentage: {
    marginRight: 8,
    zIndex: 1,
  },
  totalVote: {
    paddingLeft: 4,
    paddingVertical: 8,
  },
});
