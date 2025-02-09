import { useCallback, useEffect, useRef, useState } from 'react';
import {
  NativeScrollEvent,
  NativeSyntheticEvent,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import Animated, {
  scrollTo,
  useAnimatedRef,
  useAnimatedScrollHandler,
  useDerivedValue,
  useSharedValue,
} from 'react-native-reanimated';
import { useRouter } from 'expo-router';
import { Pagination } from '@components/Pagination';
import { deviceWindow } from '@constants/layout';
import { TopBannerSlide } from '@modules/books/books.slice';
import { Image } from './Image';

const IMAGE_WIDTH = deviceWindow.width - 32;
const IMAGE_HEIGHT = IMAGE_WIDTH * 0.46;

type SliderProps = {
  data: TopBannerSlide[];
};

export default function Slider({ data }: SliderProps) {
  const { navigate } = useRouter();

  const interval = useRef<any>();
  const ref = useAnimatedRef();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const [sliderData, setSliderData] = useState(data);

  const x = useSharedValue(0);
  const offset = useSharedValue(0);

  const onScroll = useAnimatedScrollHandler({
    onScroll: (e) => {
      x.value = e.contentOffset.x;
    },
    onMomentumEnd: (e) => {
      offset.value = e.contentOffset.x;
    },
  });

  useDerivedValue(() => {
    scrollTo(ref, offset.value, 0, true);
  });

  const renderItem = useCallback(({ item }: { item: TopBannerSlide }) => {
    return (
      <TouchableOpacity
        style={{
          width: deviceWindow.width,
          justifyContent: 'center',
          alignItems: 'center',
        }}
        onPress={() => {
          navigate(`(auth)/book/${item.book_id}`);
        }}
      >
        <Image source={{ uri: item.cover }} style={styles.image} />
      </TouchableOpacity>
    );
  }, []);

  const handleScrollBeginDrag = useCallback(() => {
    setIsAutoPlay(false);
  }, []);

  const handleScrollEndDrag = useCallback(() => {
    setIsAutoPlay(true);
  }, []);

  const handleMomentumScrollEnd = useCallback(
    (ev: NativeSyntheticEvent<NativeScrollEvent>) => {
      const newIndex = Math.round(
        ev.nativeEvent.contentOffset.x / deviceWindow.width
      );
      setCurrentIndex(newIndex);
    },
    []
  );

  const handleKeyExtractor = useCallback(
    (_: TopBannerSlide, index: number) => `item_key_${index}`,
    []
  );

  const handleEndReached = useCallback(() => {
    setSliderData([...sliderData, ...data]);
  }, [sliderData]);

  useEffect(() => {
    setSliderData(data);
  }, [data]);

  useEffect(() => {
    if (isAutoPlay === true) {
      interval.current = setInterval(() => {
        offset.value += deviceWindow.width;
      }, 3000);
    } else {
      clearInterval(interval.current);
    }
    return () => {
      clearInterval(interval.current);
    };
  }, [isAutoPlay]);

  return (
    <View style={styles.container}>
      <Animated.FlatList
        ref={ref}
        onScroll={onScroll}
        data={sliderData}
        keyExtractor={handleKeyExtractor}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        onEndReached={handleEndReached}
        onEndReachedThreshold={0.5}
        onMomentumScrollEnd={handleMomentumScrollEnd}
        onScrollBeginDrag={handleScrollBeginDrag}
        onScrollEndDrag={handleScrollEndDrag}
        renderItem={renderItem}
      />
      {data?.length ? (
        <View style={styles.paginationContainer}>
          <Pagination activeIndex={currentIndex} amountOfDots={data.length} />
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  paginationContainer: {
    position: 'absolute',
    bottom: 8,
    width: '100%',
    alignItems: 'center',
  },
  image: {
    width: IMAGE_WIDTH,
    height: IMAGE_HEIGHT,
    borderRadius: 20,
  },
});
