import {StyleSheet} from 'react-native';
import {widthPercentage} from '../../common/deviceUtils';
import {palette} from '../../common/palette';

export default StyleSheet.create({
  headerColor: {
    backgroundColor: palette.purple[700],
  },

  titleIconWrapper: {
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'center',
  },

  rightTitleButton: {
    width: widthPercentage(30),
    alignItems: 'center',
    justifyContent: 'center',
  },

  rightTitleIcon: {
    color: palette.white,
  },
});
