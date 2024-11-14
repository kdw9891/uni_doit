import React from 'react';
import {View, Text, Image} from 'react-native';
import {palette} from '../../common/palette';
import {StyleSheet} from 'react-native';
import {setWidth, fontSize, fontStyle} from '../../common/deviceUtils';
import {IconComponents, IconType} from '../../common/IconType';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
import InfoModal from './InfoModal';
import {useModal} from '../../common/hooks';

//#region DynamicIcon
export const DynamicIcon: React.FC<{
  iconType: IconType;
  iconName: string;
  style?: any;
  size?: number;
  color?: string;
}> = ({
  iconType,
  iconName,
  style,
  size = setWidth(95),
  color = palette.black,
}) => {
  const IconComponent = IconComponents[iconType];
  if (!IconComponent) {
    console.warn(`Icon type "${iconType}" not found`);
    return null;
  }
  return (
    <IconComponent name={iconName} size={size} color={color} style={style} />
  );
};

//#endregion DynamicIcon

export const Item: React.FC<{
  viewStyle?: any;
  text?: string;
  iconType: IconType;
  iconName: string;
  iconStyle?: any;
  path?: string;
  iconColor?: string;
  iconSize?: number;
  onPress?: () => void;
}> = ({
  viewStyle = styles.item,
  text,
  iconType,
  iconName,
  iconStyle = styles.iconBox,
  path,
  iconColor,
  iconSize = setWidth(25),
  onPress,
}) => {
  const navigation = useNavigation();

  const handlePress = () => {
    if (onPress) {
      // onPress가 있으면 실행
      onPress();
    } else if (path) {
      // path가 있으면 navigation 실행
      try {
        navigation.navigate(path as never);
      } catch (error) {
        console.error(`Navigation failed to ${path}: ${error}`);
      }
    } else {
      console.warn(`No path or onPress defined for item: ${text}`);
    }
  };

  return (
    <View>
      <TouchableOpacity onPress={handlePress}>
        <View style={viewStyle}>
          <DynamicIcon
            iconType={iconType}
            iconName={iconName}
            style={iconStyle}
            color={iconColor}
            size={iconSize}
          />
          {text && <Text style={styles.text}>{text}</Text>}
        </View>
      </TouchableOpacity>
    </View>
  );
};

//# region Store & Inventory Item

// #endregion Store & Inventory Item

//#region renderItem
export const renderItem = ({item}: {item: any}) => (
  <Item
    viewStyle={styles.item}
    text={item.text}
    iconType={item.iconType}
    iconName={item.iconName}
    path={item.path}
    iconColor={item.iconColor}
  />
);
//#endregion renderItem

// //#region storeItem
// export const storeItem = ({item}: {item: any}) => (
//   <Item
//     viewStyle={styles.menuItem}
//     text={item.text}
//     iconType={item.iconType}
//     iconName={item.iconName}
//     path={item.path}
//     iconSize={setWidth(35)}
//     iconStyle={item.iconStyle}
//     iconColor={item.iconColor}
//   />
// );
// //#endregion storeItem

export const ImageItem: React.FC<{
  viewStyle?: any;
  text?: string;
  inventory?: boolean;
  quantity?: number;
  iconStyle?: any;
  path?: string;
  image_url: string | null;
  item_price: number;
  onPress?: () => void;
}> = ({
  viewStyle = styles.item,
  iconStyle = styles.iconBox,
  text,
  inventory,
  quantity,
  path,
  image_url,
  item_price,
  onPress,
}) => {
  const {isVisible, openModal, closeModal} = useModal();

  const handlePress = () => {
    openModal(); // 모달 열기
  };

  return (
    <View>
      <TouchableOpacity onPress={handlePress}>
        <View style={viewStyle}>
          {image_url ? (
            <>
              <View style={{flexDirection: 'row', alignItems: 'flex-end'}}>
                <Image
                  style={[
                    iconStyle,
                    {
                      resizeMode: 'contain',
                      width: setWidth(40),
                      height: setWidth(40),
                    },
                  ]}
                  source={{uri: image_url}}
                />
                {quantity && (
                  <Text style={styles.quantityText}>
                    {quantity}
                    {'개'}
                  </Text>
                )}
              </View>
            </>
          ) : (
            <>
              <View style={{flexDirection: 'row', alignItems: 'flex-end'}}>
                <Image
                  style={[
                    iconStyle,
                    {
                      resizeMode: 'contain',
                      width: setWidth(44),
                      height: setWidth(44),
                    },
                  ]}
                  source={require('../../assets/newimages/doit_logo.png')}
                />
                {quantity && (
                  <Text style={styles.quantityText}>
                    {quantity}
                    {'개'}
                  </Text>
                )}
              </View>
            </>
          )}
          <View style={{flexDirection: 'column'}}>
            {text && <Text style={styles.text}>{text}</Text>}
          </View>
          <Text style={styles.coinText}>{item_price} 코인</Text>
        </View>
      </TouchableOpacity>

      <InfoModal isVisible={isVisible} onClose={closeModal}>
        <Text>{'상점 정보'}</Text>
      </InfoModal>
    </View>
  );
};

// renderImageItem에서 image_url을 올바르게 전달
export const renderImageItem = ({item}: {item: any}) => (
  <ImageItem
    viewStyle={styles.menuItem}
    image_url={item.image_url || null}
    item_price={item.item_price}
    text={item.item_name}
    quantity={item.quantity}
  />
);

const styles = StyleSheet.create({
  //#region renderItem
  item: {
    width: setWidth(55),
    height: setWidth(70),
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    textAlign: 'center',
    fontFamily: fontStyle.Bold,
    fontSize: fontSize(30),
    color: palette.black,
  },
  quantityText: {
    textAlign: 'center',
    fontFamily: fontStyle.Bold,
    fontSize: fontSize(30),
    color: palette.blueGray[900],
  },
  coinText: {
    textAlign: 'center',
    fontFamily: fontStyle.Bold,
    fontSize: fontSize(30),
    color: palette.deepOrange[400],
  },
  iconBox: {
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  //#endregion renderItem

  //#region storeItem
  menuItem: {
    marginHorizontal: 20,
    marginVertical: 20,
    width: setWidth(70),
    height: setWidth(95),
    alignItems: 'center',
    justifyContent: 'center',
  },
  //#endregion storeItem
});
