import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useStore } from '@store';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import Animated, {
  Extrapolation,
  FadeIn,
  FadeOut,
  interpolate,
  useAnimatedRef,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import { useMemo, useState } from 'react';
import { BookDetailInfo } from '@modules/books/components/BookDetailInfo';
import { Line } from '@components/Line';
import { BookList } from '@modules/books/components/BookList';
import { Button } from '@src/components/Button';
import Ionicons from '@expo/vector-icons/Ionicons';
import { deviceWindow } from '@src/constants/layout';
import { Carousel } from '@modules/carousel/components/Carousel';
import {
  BOOK_DETAIL_TOP_PART_HEIGHT,
  BOOK_DETAIL_HEADER_HEIGHT,
  BOOK_DETAIL_SLIDER_HEIGHT,
  BOOK_DETAIL_SCREEN_OVERLAPPING,
} from '@constants/book-detail';
import colors from '@src/theme/colors';
import { ColorVariant } from '@constants/enums';

export default function BookDetailScreen() {
  const { top, bottom } = useSafeAreaInsets();
  const { canGoBack, back } = useRouter();
  const { id } = useLocalSearchParams<{
    id: string;
  }>();

  const [activeId, setActiveId] = useState(id);

  const carouselBooks = useStore((store) => store.carouselBooks);
  const youWillLikeSection = useStore((store) => store.youWillLikeSection);

  const scrollY = useSharedValue(0);
  const isScrollable = useSharedValue(false);
  const refScroll = useAnimatedRef();

  const book = useMemo(() => {
    if (activeId === undefined || activeId === null || !carouselBooks) {
      return null;
    }
    return carouselBooks?.find((book) => `${book.id}` === `${activeId}`);
  }, [activeId, carouselBooks]);

  const books = useMemo(() => {
    if (!id || !carouselBooks) {
      return carouselBooks;
    }
    const activeBook = carouselBooks.find((book) => `${book.id}` === id);

    return [activeBook, ...carouselBooks.filter((book) => `${book.id}` !== id)];
  }, [carouselBooks, id]);

  const scrollStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        scrollY.value,
        [0, BOOK_DETAIL_SLIDER_HEIGHT - BOOK_DETAIL_HEADER_HEIGHT],
        [1, 0]
      ),
      transform: [
        {
          scale: interpolate(
            scrollY.value,
            [0, BOOK_DETAIL_SLIDER_HEIGHT - BOOK_DETAIL_HEADER_HEIGHT],
            [1, 2],
            Extrapolation.CLAMP
          ),
        },
      ],
    };
  });

  const textStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        scrollY.value,
        [BOOK_DETAIL_SLIDER_HEIGHT - BOOK_DETAIL_HEADER_HEIGHT, 200],
        [1, 0],
        Extrapolation.CLAMP
      ),
    };
  });

  const scrollContainerStyle = useAnimatedStyle(() => {
    return {
      minHeight: isScrollable.value
        ? deviceWindow.height +
          BOOK_DETAIL_SLIDER_HEIGHT +
          BOOK_DETAIL_SCREEN_OVERLAPPING
        : 0,
    };
  });

  const onScroll = useAnimatedScrollHandler((e) => {
    isScrollable.value = !!e.contentOffset.y;
    scrollY.value = e.contentOffset.y;
  });

  const handlePressBack = () => {
    if (canGoBack()) {
      back();
    }
  };

  const handleScrollEndDrag = () => {
    if (
      scrollY.value > 0 &&
      scrollY.value <
        (BOOK_DETAIL_SLIDER_HEIGHT + BOOK_DETAIL_SCREEN_OVERLAPPING) / 2
    ) {
      refScroll.current?.scrollTo({
        y: 0,
        animated: true,
      });
    } else if (
      scrollY.value <
        BOOK_DETAIL_SLIDER_HEIGHT + BOOK_DETAIL_SCREEN_OVERLAPPING &&
      scrollY.value >
        (BOOK_DETAIL_SLIDER_HEIGHT + BOOK_DETAIL_SCREEN_OVERLAPPING) / 2
    ) {
      refScroll.current?.scrollTo({
        y: BOOK_DETAIL_SLIDER_HEIGHT + BOOK_DETAIL_SCREEN_OVERLAPPING,
        animated: true,
      });
    }
  };

  const handleChangeActiveSliderItem = (index: number) => {
    setActiveId(books[index].id);
  };

  return (
    <View style={styles.container}>
      <Animated.ScrollView
        ref={refScroll}
        showsVerticalScrollIndicator={false}
        bounces={false}
        contentContainerStyle={styles.scrollContainer}
        onScroll={onScroll}
        scrollEventThrottle={16}
        onScrollEndDrag={handleScrollEndDrag}
        stickyHeaderIndices={[0]}
      >
        <Animated.View style={styles.stickyHeader}>
          <Animated.View
            style={[
              styles.headerContainer,
              textStyle,
              {
                height: top + BOOK_DETAIL_HEADER_HEIGHT,
                paddingTop: top,
              },
            ]}
          >
            <View style={styles.centered}>
              <Text style={styles.headerTitle} numberOfLines={1}>
                {book?.name}
              </Text>
              <Text style={styles.descriptionHeader} numberOfLines={1}>
                {book?.author}
              </Text>
            </View>
            <Animated.View style={styles.backBtnWrapper}>
              <Pressable onPress={handlePressBack}>
                <Ionicons
                  name='arrow-back'
                  size={22}
                  color={colors.textSecondary}
                />
              </Pressable>
            </Animated.View>
          </Animated.View>
        </Animated.View>
        <Animated.View style={scrollContainerStyle}>
          <Animated.View
            style={[
              {
                height: BOOK_DETAIL_TOP_PART_HEIGHT + top,
                position: 'relative',
              },
            ]}
          >
            <Animated.View
              style={[
                {
                  height:
                    BOOK_DETAIL_SLIDER_HEIGHT +
                    BOOK_DETAIL_HEADER_HEIGHT +
                    top +
                    BOOK_DETAIL_SCREEN_OVERLAPPING,
                  position: 'relative',
                  zIndex: 2,
                },
                scrollStyle,
              ]}
            >
              <Carousel
                data={books}
                onChangeActiveItem={handleChangeActiveSliderItem}
              />
              <View
                style={[
                  styles.initialBackBtn,
                  { top: top + BOOK_DETAIL_SCREEN_OVERLAPPING },
                ]}
              >
                <Pressable onPress={handlePressBack}>
                  <Ionicons name='arrow-back' size={22} color={colors.white} />
                </Pressable>
              </View>
            </Animated.View>
          </Animated.View>
          <View
            style={[
              styles.mainContentContainer,
              {
                paddingBottom: bottom + 16,
              },
            ]}
          >
            <View style={styles.bookDetailContainer}>
              <View style={styles.bookDetailRow}>
                <BookDetailInfo title={book?.views} description='Readers' />
                <BookDetailInfo title={book?.likes} description='Likes' />
                <BookDetailInfo title={book?.quotes} description='Quotes' />
                <BookDetailInfo title={book?.genre} description='Genre' />
              </View>
              <Line />
              <View style={styles.textWrapper}>
                <Text style={styles.titleTypography}>Summary</Text>
                <Animated.Text
                  style={styles.descriptionTypography}
                  entering={FadeIn.duration(500)}
                  exiting={FadeOut.duration(100)}
                  key={book?.id}
                >
                  {book?.summary}
                </Animated.Text>
              </View>
              <Line />
            </View>
            <BookList
              genre='You will also like'
              books={youWillLikeSection}
              variant={ColorVariant.light}
            />
            <View style={styles.buttonWrapper}>
              <Button label='Read now' onPress={() => {}} />
            </View>
          </View>
        </Animated.View>
      </Animated.ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  scrollContainer: {
    flexGrow: 1,
  },
  mainContentContainer: {
    flex: 1,
    backgroundColor: colors.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 20,
    gap: 16,
  },
  bookDetailRow: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginBottom: -4,
  },
  bookDetailContainer: {
    paddingHorizontal: 16,
    gap: 16,
  },
  textWrapper: {
    gap: 8,
    overflow: 'hidden',
  },
  titleTypography: {
    fontFamily: 'NunitoSansBold',
    fontSize: 20,
    lineHeight: 22,
    letterSpacing: -0.4,
    color: colors.textSecondary,
  },
  descriptionTypography: {
    fontFamily: 'NunitoSansSemibold',
    fontSize: 14,
    lineHeight: 16,
    letterSpacing: -0.4,
    color: colors.textSecondaryLight,
  },
  buttonWrapper: {
    paddingHorizontal: 48,
    marginTop: 8,
  },
  initialBackBtn: {
    position: 'absolute',
    left: 16,
  },
  headerContainer: {
    position: 'absolute',
    bottom: 0,
    height: BOOK_DETAIL_HEADER_HEIGHT,
    width: '100%',
    paddingHorizontal: 16,
    flexDirection: 'row',
    gap: 16,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 3,
    top: 0,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderColor: colors.textSecondaryAlternative,
  },
  centered: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    color: colors.textSecondary,
    fontFamily: 'NunitoSansBold',
    fontSize: 20,
    lineHeight: 22,
    letterSpacing: -0.4,
    fontWeight: '700',
    maxWidth: deviceWindow.width * 0.6,
  },
  descriptionHeader: {
    color: colors.textSecondary,
    fontFamily: 'NunitoSansBold',
    fontSize: 14,
    lineHeight: 16,
    letterSpacing: -0.4,
    fontWeight: '700',
    opacity: 0.8,
  },
  backBtnWrapper: {
    position: 'absolute',
    bottom: 12,
    left: 16,
    zIndex: 3,
  },
  stickyHeader: {
    position: 'relative',
    height: 1,
    width: '100%',
    backgroundColor: 'transparent',
    marginBottom: -1,
  },
});
