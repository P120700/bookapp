import colors from '@src/theme/colors';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type ButtonProps = {
  label: string;
  onPress?: () => void;
};

export const Button = ({ label, onPress }: ButtonProps) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Text style={styles.buttonText}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 30,
    width: '100%',
    height: 48,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: colors.white,
    fontSize: 16,
    lineHeight: 16,
    fontFamily: 'NunitoSansExtraBold',
  },
});
