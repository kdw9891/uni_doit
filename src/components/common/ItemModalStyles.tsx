import {StyleSheet} from 'react-native';
import {setWidth, setHeight, fontSize} from '../../common/deviceUtils';
import {palette} from '../../common/palette';

export const ItemStyles = StyleSheet.create({
  // 모달 배경 스타일
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    textAlignVertical: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },

  // 모달 뷰 스타일
  modalView: {
    width: setWidth(230),
    padding: 20,
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

  // 아이템 이미지 스타일
  itemImage: {
    width: setWidth(90),
    height: setWidth(90),
    resizeMode: 'contain',
    marginBottom: setHeight(15),
  },

  // 아이템 정보 박스
  infoBox: {
    width: '100%',
    padding: setWidth(10),
    backgroundColor: palette.gray[100],
    borderRadius: 8,
    marginBottom: setHeight(15),
  },
  itemName: {
    fontWeight: 'bold',
    fontSize: fontSize(35),
    color: palette.black,
    marginBottom: setHeight(5),
  },
  itemRarity: {
    fontWeight: 'bold',
    fontSize: fontSize(30),
    color: palette.gray[800],
    marginBottom: setHeight(5),
  },
  itemDescription: {
    fontWeight: 'bold',
    fontSize: fontSize(34),
    color: palette.gray[700],
  },

  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  button: {
    flex: 1,
    paddingVertical: setHeight(8),
    borderRadius: 5,
    alignItems: 'center',
    marginHorizontal: setWidth(5),
  },
  cancelButton: {
    backgroundColor: palette.gray[400],
  },
  confirmButton: {
    backgroundColor: palette.green[500],
  },
  buttonText: {
    color: palette.white,
    fontWeight: 'bold',
    fontSize: fontSize(40),
  },
});
