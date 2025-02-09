import { StyleSheet } from 'react-native';
import Animated, {
  Extrapolation,
  interpolate,
  SharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';
import { AnimatedImage } from '@components/AnimatedImage';
import { Book } from '@modules/books/books.slice';

type CarouselItemProps = {
  item: Pick<Book, 'cover_url'>;
  index: number;
  scrollX: SharedValue<number>;
  slideWidth: number;
  slideHeight: number;
};

export function CarouselItem({
  item,
  index,
  scrollX,
  slideWidth,
  slideHeight,
}: CarouselItemProps) {
  const containerStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: interpolate(
            scrollX.value,
            [index - 1, index, index + 1],
            [0.8, 1, 0.8],
            Extrapolation.CLAMP
          ),
        },
      ],
    };
  });

  return (
    <Animated.View
      style={[
        styles.slideWrapper,
        {
          width: slideWidth,
          height: slideHeight,
        },
        containerStyle,
      ]}
    >
      <AnimatedImage
        source={{ uri: `${item.cover_url}` }}
        style={styles.image}
      />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  slideWrapper: {
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: 'rgba(0,0,0,0.1)',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 16,
  },
});
