import { AnimatedImage } from '@components/AnimatedImage';
import { Book } from '@modules/books/books.slice';
import { StyleSheet } from 'react-native';
import {
  Extrapolation,
  interpolate,
  SharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';

type CarouselBackdropProps = {
  item: Pick<Book, 'cover_url'>;
  index: number;
  scrollX: SharedValue<number>;
};

export const CarouselBackdrop = ({
  item,
  index,
  scrollX,
}: CarouselBackdropProps) => {
  const styleA = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        scrollX.value,
        [index - 1, index, index + 1],
        [0, 0.8, 0],
        Extrapolation.CLAMP
      ),
    };
  });
  return (
    <AnimatedImage
      source={{ uri: item.cover_url }}
      style={[StyleSheet.absoluteFillObject, styleA]}
      blurRadius={50}
    />
  );
};
