import { StyleSheet } from 'react-native';
import Colors from '../../../constants/Colors';

const IMAGE_SIZE = 265;

export const styles = StyleSheet.create({
  headImageWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 64,
    position: 'relative',
  },
  headImage: {
    width: IMAGE_SIZE,
    height: IMAGE_SIZE,
  },
  headGreenUnderImage: {
    backgroundColor: Colors.iconsGreen,
    width: IMAGE_SIZE,
    height: IMAGE_SIZE,
    position: 'absolute',
    transform: [{ translateX: 14 }, { translateY: 14 }],
    zIndex: -1,
  },
  title: {
    paddingHorizontal: 48,
    paddingVertical: 60,
    lineHeight: 52,
  },
  buttonWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    paddingVertical: 17,
    paddingHorizontal: 24,
    backgroundColor: Colors.primaryGreen,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 1,
    borderWidth: 2,
    borderColor: '#2C2C2C',
  },
  blackShadow: {
    flex: 1,
    zIndex: 100,
  }
});
