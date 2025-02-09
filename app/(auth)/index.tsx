import { StyleSheet, View } from 'react-native';
import { useCallback, useMemo } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import Animated from 'react-native-reanimated';
import { Header } from '@components/Header';
import Slider from '@components/Slider';
import { BookList } from '@modules/books/components/BookList';
import { useTopNavigationScroll } from '@hooks/useTopNavigationScroll';
import { useStore } from '@store';
import colors from '@src/theme/colors';
import { Book } from '@modules/books/books.slice';

export default function App() {
  const { top, bottom } = useSafeAreaInsets();
  const { navigate } = useRouter();

  const books = useStore((store) => store.books);
  const topBannerSlides = useStore((store) => store.topBannerSlides);

  const { onScroll, isScrolled } = useTopNavigationScroll();

  const mappedData: { title: string; books: Book[] }[] = useMemo(
    () =>
      Object.values(
        books?.reduce(
          (acc, item) => ({
            ...acc,
            [item.genre]: {
              title: item.genre,
              books: [...(acc[item.genre]?.books || []), item],
            },
          }),
          {}
        )
      ) || [],
    [books]
  );

  const handlePressBook = useCallback((id: string) => {
    navigate(`/book/${id}`);
  }, []);

  return (
    <View style={[styles.container, { paddingTop: top }]}>
      <Header title='Library' isScrolled={isScrolled} />
      <Animated.ScrollView
        showsVerticalScrollIndicator={false}
        onScroll={onScroll}
      >
        <View
          style={[styles.scrollViewContainer, { paddingBottom: bottom + 16 }]}
        >
          <View style={styles.mainWrapper}>
            <Slider data={topBannerSlides} />
            {mappedData?.length ? (
              <View style={styles.listWrapper}>
                {mappedData?.map((item) => (
                  <BookList
                    key={item.title}
                    genre={item.title}
                    books={item.books}
                    onPress={handlePressBook}
                  />
                ))}
              </View>
            ) : null}
          </View>
        </View>
      </Animated.ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollViewContainer: {
    flex: 1,
    paddingTop: 20,
  },
  mainWrapper: {
    gap: 40,
  },
  listWrapper: {
    flexDirection: 'column',
    gap: 24,
  },
});
