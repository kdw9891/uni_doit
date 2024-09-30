import {PixelRatio, Platform, Dimensions} from 'react-native';
import {palette} from './palette';
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

// width(변경 전 변수명)
export function widthPercentage(width: number): number {
  const percentage = (width / windowWidth) * 100;

  return responsiveScreenWidth(percentage);
}

// height(변경 전 변수명)
export function heightPercentage(height: number): number {
  const percentage = (height / windowHeight) * 100;

  return responsiveScreenHeight(percentage);
}

// width(변경 예정 변수명)
function setWidth(width: number): number {
  const percentage = (width / windowWidth) * 100;

  return responsiveScreenWidth(percentage);
}

// height(변경 예정 변수명)
function setHeight(height: number): number {
  const percentage = (height / windowHeight) * 100;

  return responsiveScreenHeight(percentage);
}

// font size (변경 전 변수명)
export function fontPercentage(size: number): number {
  const percentage = pixelRatio * (size * 0.02);

  return responsiveScreenFontSize(percentage);
}

// font size (변경 예정 변수명)
function fontSize(size: number): number {
  const percentage = pixelRatio * (size * 0.02);

  return responsiveScreenFontSize(percentage);
}
