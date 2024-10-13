import {StyleSheet} from 'react-native';
import {setWidth, setHeight, fontSize, fontStyle} from '../../common/deviceUtils';
import {palette} from '../../common/palette';

export const InfoStyles = StyleSheet.create({
  // modal box styles
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    textAlignVertical: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },

  // modal styles
  modalView: {
    width: setWidth(270),
    height: setHeight(350),
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});
