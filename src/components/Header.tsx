import { StyleSheet, Text, View } from 'react-native';
import Animated, {
  FadeIn,
  FadeOut,
  SharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';
import colors from '@src/theme/colors';

type HeaderProps = {
  title?: string;
  isScrolled?: SharedValue<boolean>;
};

const AnimatedView = Animated.createAnimatedComponent(View);

export const Header = ({ title, isScrolled }: HeaderProps) => {
  const topBorder = useAnimatedStyle(() => {
    return {
      borderColor: isScrolled?.value ? colors.textPrimary : 'transparent',
    };
  });

  return (
    <AnimatedView
      style={[styles.container, topBorder]}
      entering={FadeIn}
      exiting={FadeOut}
    >
      {title ? <Text style={styles.headerTypography}>{title}</Text> : null}
    </AnimatedView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 48,
    paddingHorizontal: 16,
    paddingBottom: 8,
    paddingTop: 16,
    width: '100%',
    borderBottomWidth: 1,
    flexDirection: 'row',
    gap: 16,
  },
  headerTypography: {
    fontFamily: 'NunitoSansBold',
    fontSize: 20,
    lineHeight: 22,
    letterSpacing: -0.4,
    color: colors.textPrimary,
  },
});
