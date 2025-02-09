import colors from '@src/theme/colors';
import { StyleSheet, Text, View } from 'react-native';
import Animated, {
  FadeIn,
  FadeOut,
  LinearTransition,
} from 'react-native-reanimated';

type BookDetailInfoProps = {
  title?: string;
  description?: string;
};

export const BookDetailInfo = ({ title, description }: BookDetailInfoProps) => {
  return (
    <Animated.View style={styles.container} layout={LinearTransition}>
      <Animated.Text
        style={styles.headerTypography}
        entering={FadeIn.duration(500)}
        exiting={FadeOut.duration(200)}
        key={title}
      >
        {title}
      </Animated.Text>
      <Animated.Text style={styles.descriptionTypography}>
        {description}
      </Animated.Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTypography: {
    fontFamily: 'NunitoSansBold',
    fontSize: 18,
    lineHeight: 22,
    letterSpacing: -0.4,
    color: colors.textSecondary,
  },
  descriptionTypography: {
    fontFamily: 'NunitoSansSemibold',
    fontSize: 12,
    lineHeight: 14,
    letterSpacing: -0.4,
    color: colors.textSecondaryAlternative,
  },
});
