import {StyleSheet} from 'react-native';
import {fontPercentage, fontStyle, widthPercentage} from '../../common/deviceUtils';
import {palette} from '../../common/palette';

export default StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    width: widthPercentage(884),
    alignSelf: 'center',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  inputTitle: {
    fontFamily: fontStyle.Bold,
    fontSize: fontPercentage(45),
    color: palette.black,
    lineHeight: 35,
    paddingLeft: 5,
  },
  inputSubTitle: {
    fontFamily: fontStyle.SemiBold,
    fontSize: fontPercentage(35),
    color: palette.gray[500],
    lineHeight: 35,
    paddingRight: 5,
    textDecorationLine: 'underline',
  },
});
