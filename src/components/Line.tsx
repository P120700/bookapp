import colors from '@src/theme/colors';
import { StyleSheet, View } from 'react-native';

export const Line = () => {
  return <View style={styles.container} />;
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    borderBottomWidth: 1,
    borderColor: colors.textSecondaryAlternative,
  },
});
