import { deviceWindow } from '@constants/layout';
import { Book } from '@modules/books/books.slice';
import colors from '@src/theme/colors';
import { StyleSheet, Text } from 'react-native';
import Animated, {
  Extrapolation,
  interpolate,
  SharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';

type CarouselTextBlockProps = {
  item: Pick<Book, 'name' | 'author'>;
  index: number;
  scrollX: SharedValue<number>;
};

export const CarouselTextBlock = ({
  item,
  index,
  scrollX,
}: CarouselTextBlockProps) => {
  const styleA = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: interpolate(
            scrollX.value,
            [index - 1, index, index + 1],
            [deviceWindow.width / 2, 0, -deviceWindow.width / 2]
          ),
        },
      ],
      opacity: interpolate(
        scrollX.value,
        [index - 0.5, index, index + 0.5],
        [0, 1, 0],
        Extrapolation.CLAMP
      ),
    };
  });
  return (
    <Animated.View style={[styles.container, styleA]}>
      <Text style={styles.nameTypography} numberOfLines={1}>
        {item.name}
      </Text>
      <Text style={styles.authorTypography} numberOfLines={1}>
        {item.author}
      </Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 4,
    position: 'absolute',
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: deviceWindow.width * 0.1,
    bottom: 20 + 18,
  },
  nameTypography: {
    color: colors.white,
    fontFamily: 'NunitoSansBold',
    fontSize: 20,
    lineHeight: 22,
    letterSpacing: -0.4,
    fontWeight: '700',
  },
  authorTypography: {
    color: colors.white80,
    fontFamily: 'NunitoSansBold',
    fontSize: 14,
    lineHeight: 16,
    letterSpacing: -0.4,
    fontWeight: '700',
  },
});
