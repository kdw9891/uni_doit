import {StyleSheet} from 'react-native';
import {setWidth, setHeight, fontSize, fontStyle} from '../../common/deviceUtils';
import { palette } from '../../common/palette';

export const styles = StyleSheet.create({

  // base
  base: {
    flex:9,
    backgroundColor: palette.white,
  },

  // header
  header:{
    flex:1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
});
