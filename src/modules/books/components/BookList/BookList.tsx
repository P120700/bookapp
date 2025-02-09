import { StyleSheet, Text, View } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { useCallback } from 'react';
import { ColorVariant } from '@constants/enums';
import colors from '@src/theme/colors';

import { ListItem } from './ListItem';
import { Book } from '@modules/books/books.slice';

type BookListProps = {
  genre: string;
  books: Book[];
  variant?: ColorVariant;
  onPress?: (id: string) => void;
};

export const BookList = ({
  genre,
  books,
  variant = ColorVariant.dark,
  onPress,
}: BookListProps) => {
  const renderItem = useCallback(
    ({ item }: { item: Book }) => {
      return (
        <ListItem
          name={item.name}
          uri={item.cover_url}
          variant={variant}
          onPress={() => {
            if (item.id !== undefined && item.id !== null && onPress) {
              onPress(`${item.id}`);
            }
          }}
        />
      );
    },
    [variant, onPress]
  );

  return (
    <View style={styles.container}>
      <View style={styles.textWrapper}>
        <Text
          style={[
            styles.textStyle,
            {
              color:
                variant === ColorVariant.light
                  ? colors.textSecondary
                  : colors.white,
            },
          ]}
          numberOfLines={1}
        >
          {genre}
        </Text>
      </View>
      <FlashList
        data={books}
        renderItem={renderItem}
        horizontal
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        contentContainerStyle={styles.listContainerStyle}
        ItemSeparatorComponent={() => <View style={styles.listSeparator} />}
        estimatedItemSize={120}
        extraData={variant}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    gap: 16,
  },
  textWrapper: {
    marginHorizontal: 16,
  },
  textStyle: {
    fontFamily: 'NunitoSansBold',
    fontSize: 20,
    lineHeight: 22,
    letterSpacing: -0.4,
  },
  listContainerStyle: {
    paddingHorizontal: 16,
  },
  listSeparator: {
    width: 8,
  },
});
