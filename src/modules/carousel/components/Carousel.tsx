import { ActivityIndicator, StyleSheet, View } from 'react-native';
import Animated, {
  runOnJS,
  useAnimatedScrollHandler,
  useSharedValue,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { deviceWindow } from '@constants/layout';
import { CarouselItem } from './CarouselItem';
import { CarouselBackdrop } from './CarouselBackdrop';
import { CarouselTextBlock } from './CarouselTextBlock';
import {
  BOOK_DETAIL_HEADER_HEIGHT,
  BOOK_DETAIL_SCREEN_OVERLAPPING,
} from '@constants/book-detail';
import colors from '@src/theme/colors';
import { Book } from '@modules/books/books.slice';

const SLIDER_WIDTH = 200;
const BOOK_DETAIL_SLIDER_HEIGHT = 250;
const SPACING = 16;

type CarouselProps = {
  data: Book[];
  onChangeActiveItem: (index: number) => void;
};

export const Carousel = ({ data, onChangeActiveItem }: CarouselProps) => {
  const { top } = useSafeAreaInsets();

  const isLoading = false;

  const scrollX = useSharedValue(0);

  const onScroll = useAnimatedScrollHandler((e) => {
    const activeIndex = e.contentOffset.x / (SLIDER_WIDTH + SPACING);
    scrollX.value = activeIndex;
    ('worklet');
    runOnJS(onChangeActiveItem)(Math.round(activeIndex));
  });

  const renderItem = ({ item, index }: { item: Book; index: number }) => {
    return (
      <CarouselItem
        index={index}
        item={item}
        scrollX={scrollX}
        slideWidth={SLIDER_WIDTH}
        slideHeight={BOOK_DETAIL_SLIDER_HEIGHT}
      />
    );
  };

  if (isLoading) {
    return (
      <View
        style={[
          styles.loadingContainer,
          {
            paddingTop: top,
          },
        ]}
      >
        <ActivityIndicator size='large' />
      </View>
    );
  }

  return (
    <View
      style={[
        styles.container,
        {
          paddingTop: top + BOOK_DETAIL_HEADER_HEIGHT,
        },
      ]}
    >
      <View style={StyleSheet.absoluteFillObject}>
        {data?.map((item, index) => (
          <CarouselBackdrop
            key={`bg-photo-${item.id}`}
            index={index}
            item={item}
            scrollX={scrollX}
          />
        ))}
      </View>
      <Animated.FlatList
        data={data}
        keyExtractor={(item) => `Carousel_id_${item.id}`}
        contentContainerStyle={styles.listContainer}
        renderItem={renderItem}
        snapToInterval={SLIDER_WIDTH + SPACING}
        decelerationRate={'fast'}
        showsHorizontalScrollIndicator={false}
        horizontal
        onScroll={onScroll}
        scrollEventThrottle={16}
      />
      <View style={styles.textBlockWrapper}>
        {data?.map((item, index) => (
          <CarouselTextBlock
            key={`author-details-${item.id}`}
            index={index}
            item={item}
            scrollX={scrollX}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  textBlockWrapper: {
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: colors.black,
    marginBottom: -BOOK_DETAIL_SCREEN_OVERLAPPING,
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: colors.black,
    marginBottom: -BOOK_DETAIL_SCREEN_OVERLAPPING,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContainer: {
    gap: SPACING,
    paddingHorizontal: (deviceWindow.width - SLIDER_WIDTH) / 2,
    alignItems: 'center',
  },
});
