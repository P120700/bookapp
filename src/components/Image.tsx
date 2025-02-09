import { Image as ExpoImage } from 'expo-image';

export const IMAGE_BLURHASH = 'LEHV6nWB2yk8pyo0adR*.7kCMdnj';

export const Image = (props: ExpoImage['props']) => (
  <ExpoImage
    contentFit='fill'
    placeholder={{ blurhash: IMAGE_BLURHASH }}
    transition={300}
    {...props}
  />
);
