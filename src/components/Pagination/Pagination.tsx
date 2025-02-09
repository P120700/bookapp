import { StyleSheet, View } from 'react-native';
import { PaginationDot } from './PaginationDot';

type PaginationProps = {
  activeIndex: number;
  amountOfDots: number;
};

export const Pagination = ({ activeIndex, amountOfDots }: PaginationProps) => {
  return (
    <View style={styles.container}>
      {new Array(amountOfDots).fill({}).map((_, index) => (
        <PaginationDot
          key={index}
          isActive={index === activeIndex % amountOfDots}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 10,
  },
});
