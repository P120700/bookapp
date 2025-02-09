import colors from '@src/theme/colors';
import { StyleSheet } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';

const SIZE = 7;
const ANIMATION_DURATION = 200;

type PaginationProps = {
  isActive: boolean;
};

export const PaginationDot = ({ isActive = false }: PaginationProps) => {
  const animatedStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: withTiming(
        isActive ? colors.textPrimary : colors.backgroundAlternative,
        {
          duration: ANIMATION_DURATION,
          easing: Easing.inOut(Easing.ease),
        }
      ),
    };
  });

  return <Animated.View style={[styles.dot, animatedStyle]} />;
};

const styles = StyleSheet.create({
  dot: {
    height: SIZE,
    width: SIZE,
    borderRadius: SIZE,
  },
});
