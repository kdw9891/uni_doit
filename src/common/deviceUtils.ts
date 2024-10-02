import {PixelRatio, Platform, Dimensions} from 'react-native';
import {responsiveScreenHeight, responsiveScreenWidth, responsiveScreenFontSize} from 'react-native-responsive-dimensions';

// Pixel Ratio
export const pixelRatio = PixelRatio.get();

// Font style
export const fontStyle = {
  Regular: 'NotoSansKR-Regular',
  Medium: 'NotoSansKR-Medium',
  Bold: 'NotoSansKR-Bold',
  SemiBold: 'NotoSansKR-SemiBold',
  Light: 'NotoSansKR-Light',
  Black: 'NotoSansKR-Black',
};

// Device size
const {width, height} = Dimensions.get('window');

export const devicePlatform: string = Platform.OS;
export const deviceWidth: number = width;
export const deviceHeight: number = height;

// Figma design size
const windowWidth = 320;
const windowHeight = 568;

export function setWidth(width: number): number {
  const percentage = (width / windowWidth) * 100;

  return responsiveScreenWidth(percentage);
}

export function setHeight(height: number): number {
  const percentage = (height / windowHeight) * 100;

  return responsiveScreenHeight(percentage);
}

export function fontSize(size: number): number {
  const percentage = pixelRatio * (size * 0.02);

  return responsiveScreenFontSize(percentage);
}
