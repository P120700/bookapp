import {
  useAnimatedScrollHandler,
  useSharedValue,
} from 'react-native-reanimated';

export function useTopNavigationScroll() {
  const scrolledShared = useSharedValue(false);

  const handleScroll = useAnimatedScrollHandler((event) => {
    const { contentOffset, contentSize, layoutMeasurement } = event;

    if (contentOffset?.y > 0) {
      scrolledShared.value = true;
    } else {
      scrolledShared.value = false;
    }
  });

  return {
    isScrolled: scrolledShared,
    onScroll: handleScroll,
  };
}
