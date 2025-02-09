import { Dimensions, Platform } from 'react-native';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export const deviceWindow = {
  width,
  height,
};

export const isIos = Platform.OS === 'ios';
export const isAndroid = Platform.OS === 'android';
