import React from 'react';
import {View, Text} from 'react-native';
import {palette} from '../../common/palette';
import {StyleSheet} from 'react-native';
import {setWidth, fontSize, fontStyle} from '../../common/deviceUtils';
import {IconComponents, IconType} from '../../common/IconType';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';

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

//#region Item

export const Item: React.FC<{
  text?: string;
  iconType: IconType;
  iconName: string;
  path?: string;
  iconColor?: string;
  onPress?: () => void; // onPress 속성 추가
}> = ({text, iconType, iconName, path, iconColor, onPress}) => {
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
        <View style={styles.item}>
          <DynamicIcon
            iconType={iconType}
            iconName={iconName}
            style={styles.iconBox}
            color={iconColor}
            size={setWidth(25)}
          />
          {text && <Text style={styles.text}>{text}</Text>}
        </View>
      </TouchableOpacity>
    </View>
  );
};

//#endregion Item

//#region renderItem
export const renderItem = ({item}: {item: any}) => (
  <Item
    text={item.text}
    iconType={item.iconType}
    iconName={item.iconName}
    path={item.path}
    iconColor={item.iconColor}
  />
);
//#endregion renderItem

const styles = StyleSheet.create({
  //#region renderItem
  item: {
    width: setWidth(55),
    height: setWidth(70),
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontFamily: fontStyle.Bold,
    fontSize: fontSize(30),
    color: palette.black,
  },
  iconBox: {
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  //#endregion renderItem
});
