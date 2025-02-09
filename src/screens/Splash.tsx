import { StyleSheet, Text, View } from 'react-native';
import { deviceWindow } from '@constants/layout';
import Loader from '@components/Loader';
import colors from '@src/theme/colors';
import { Image } from '@components/Image';

const firstBackgroundLayer = require('@assets/splashBackground.png');
const secondBackgroundLayer = require('@assets/splashBackgroundHeart.png');

export default function SplashScreen({ onLoadingFinished }: any) {
  return (
    <View style={styles.container}>
      <View style={[StyleSheet.absoluteFillObject]}>
        <Image
          source={firstBackgroundLayer}
          style={styles.imageFill}
          placeholder={undefined}
        />
      </View>
      <View style={[StyleSheet.absoluteFillObject]}>
        <Image
          source={secondBackgroundLayer}
          style={styles.imageFill}
          placeholder={undefined}
        />
      </View>
      <View style={[StyleSheet.absoluteFillObject, styles.content]}>
        <View style={styles.textWrapper}>
          <Text style={styles.titleTypography}>Book App</Text>
          <Text style={styles.descriptionTypography}>Welcome to Book App</Text>
        </View>
        <Loader
          lineWidth={deviceWindow.width * 0.7}
          onAnimationFinish={onLoadingFinished}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  imageFill: {
    width: '100%',
    height: '100%',
  },
  content: {
    justifyContent: 'center',
    alignItems: 'center',
    gap: 48,
  },
  textWrapper: {
    gap: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleTypography: {
    fontSize: 52,
    lineHeight: 52,
    fontFamily: 'Georgia',
    fontStyle: 'italic',
    color: colors.primary,
    fontWeight: 700,
    textAlign: 'center',
  },
  descriptionTypography: {
    fontSize: 24,
    lineHeight: 26,
    fontFamily: 'NunitoSansBold',
    color: colors.white80,
    textAlign: 'center',
  },
});
