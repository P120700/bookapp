import colors from '@src/theme/colors';
import { useFocusEffect } from 'expo-router';
import { StyleSheet } from 'react-native';
import Animated, {
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

type LoaderProps = {
  onAnimationFinish: () => void;
  lineWidth: number;
  animationDuration?: number;
};

export default function Loader({
  onAnimationFinish,
  lineWidth,
  animationDuration = 2000,
}: LoaderProps) {
  const progress = useSharedValue(0);

  const loaderStyle = useAnimatedStyle(() => {
    return {
      width: interpolate(progress.value, [0, 1], [0, lineWidth]),
    };
  }, []);

  useFocusEffect(() => {
    progress.value = withTiming(1, { duration: animationDuration }, () => {
      'worklet';
      runOnJS(onAnimationFinish)();
    });
  });

  return (
    <Animated.View
      style={[
        styles.outsideContainer,
        {
          width: lineWidth,
        },
      ]}
    >
      <Animated.View style={[styles.insideContainer, loaderStyle]} />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  outsideContainer: {
    backgroundColor: colors.white20,
    height: 6,
    borderRadius: 6,
    overflow: 'hidden',
  },
  insideContainer: {
    height: 6,
    width: 0,
    backgroundColor: colors.white,
    borderRadius: 6,
  },
});
