import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Image } from '@components/Image';
import { ColorVariant } from '@constants/enums';
import colors from '@src/theme/colors';

type ListItemProps = {
  uri: string;
  name: string;
  variant?: ColorVariant;
  onPress: () => void;
};

const IMAGE_WIDTH = 120;
const IMAGE_HEIGHT = 150;

export const ListItem = ({
  name,
  uri,
  onPress,
  variant = ColorVariant.dark,
}: ListItemProps) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Image source={{ uri }} style={styles.image} />
      <View>
        <Text
          style={[
            styles.text,
            {
              color:
                variant === ColorVariant.light
                  ? colors.textSecondaryLight
                  : colors.white,
            },
          ]}
          numberOfLines={2}
        >
          {name}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    width: IMAGE_WIDTH,
    overflow: 'hidden',
    gap: 4,
  },
  image: {
    width: IMAGE_WIDTH,
    height: IMAGE_HEIGHT,
    borderRadius: 20,
  },
  text: {
    fontFamily: 'NunitoSansSemiBold',
    fontSize: 16,
    lineHeight: 18,
    letterSpacing: -0.4,
    opacity: 0.7,
  },
});
