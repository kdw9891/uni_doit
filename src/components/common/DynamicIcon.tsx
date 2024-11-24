import React from 'react';
import {View, Text, Image} from 'react-native';
import {palette} from '../../common/palette';
import {StyleSheet} from 'react-native';
import {setWidth, fontSize, fontStyle} from '../../common/deviceUtils';
import {IconComponents, IconType} from '../../common/IconType';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
import InfoModal from './InfoModal';
import ItemModal from './ItemModal';
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
  iconStyle?: any;
  item: {
    text: string;
    quantity?: number;
    image_url: string | null;
    item_price?: number;
    item_name: string;
    item_rarity: string;
    image_description: string;
  };
  onConfirm: () => void;
}> = ({
  viewStyle = styles.item,
  iconStyle = styles.iconBox,
  item,
  onConfirm,
}) => {
  const {isVisible, openModal, closeModal} = useModal();

  const handlePress = () => {
    openModal();
  };

  return (
    <View>
      <TouchableOpacity onPress={handlePress}>
        <View style={viewStyle}>
          {item.image_url ? (
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
                source={
                  item.image_url && typeof item.image_url === 'string'
                    ? {uri: item.image_url}
                    : require('../../assets/newimages/doit_logo.png')
                }
              />
              {item.quantity && (
                <Text style={styles.quantityText}>
                  {item.quantity}
                  {'개'}
                </Text>
              )}
            </View>
          ) : (
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
              {item.quantity && (
                <Text style={styles.quantityText}>
                  {item.quantity}
                  {'개'}
                </Text>
              )}
            </View>
          )}
          <View style={{flexDirection: 'column'}}>
            {item.text && <Text style={styles.text}>{item.text}</Text>}
          </View>
          {item.item_price && (
            <Text style={styles.coinText}>{item.item_price} 코인</Text>
          )}
        </View>
      </TouchableOpacity>
      {item.item_price ? (
        <ItemModal
          isVisible={isVisible}
          onClose={closeModal}
          item={{
            item_name: item.item_name,
            item_rarity: item.item_rarity,
            image_description: item.image_description,
            image_url: item.image_url || '',
          }}
          buttonText={'구매'}
          onConfirm={onConfirm}
        />
      ) : (
        <ItemModal
          isVisible={isVisible}
          onClose={closeModal}
          item={{
            item_name: item.item_name,
            item_rarity: item.item_rarity,
            image_description: item.image_description,
            image_url: item.image_url || '',
          }}
          buttonText={'사용'}
          onConfirm={onConfirm}
        />
      )}
    </View>
  );
};

// renderImageItem에서 image_url을 올바르게 전달
export const renderImageItem = ({item}: {item: any}) => (
  <ImageItem
    viewStyle={styles.menuItem}
    item={{
      text: item.item_name,
      quantity: item.quantity,
      image_url: item.image_url,
      item_price: item.item_price,
      item_name: item.item_name,
      item_rarity: item.item_rarity,
      image_description: item.item_description,
    }}
    onConfirm={() => console.log('구매 또는 사용')}
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
