import Animated from 'react-native-reanimated';
import { Image as ExpoImage } from 'expo-image';
import { IMAGE_BLURHASH } from './Image';

const AnimatedImageExpo = Animated.createAnimatedComponent(ExpoImage);

export const AnimatedImage = (props: ExpoImage['props']) => (
  <AnimatedImageExpo
    contentFit='fill'
    placeholder={{ blurhash: IMAGE_BLURHASH }}
    transition={300}
    {...props}
  />
);
