import {StyleSheet} from 'react-native';
import {fontSize, fontStyle, setWidth} from '../../common/deviceUtils';
import {palette} from '../../common/palette';

export default StyleSheet.create({
  comboContainer: {
    flexDirection: 'row',
    width: setWidth(884),
    alignSelf: 'center',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  comboTitle: {
    fontFamily: fontStyle.Bold,
    fontSize: fontSize(45),
    color: palette.black,
    lineHeight: 35,
    paddingLeft: 5,
  },
  comboSubtitle: {
    fontFamily: fontStyle.SemiBold,
    fontSize: fontSize(35),
    color: palette.gray[500],
    lineHeight: 35,
    paddingRight: 5,
    textDecorationLine: 'underline',
  },
});
