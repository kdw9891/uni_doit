import React from 'react';
import {View, Text} from 'react-native';
import {palette} from '../../common/palette';
import {StyleSheet} from 'react-native';
import {
  setHeight,
  setWidth,
  fontSize,
  fontStyle,
} from '../../common/deviceUtils';
import {IconComponents, IconType} from './IconType';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
import ScrollArea from '../../components/layout/ScrollArea';
import {Background} from '../../components/layout/Background';

//#region DynamicIcon
const DynamicIcon: React.FC<{
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

interface ItemProps {
  text?: string;
  iconType: IconType;
  iconName: string;
  path?: string;
  iconColor?: string;
}

const Item: React.FC<ItemProps> = ({
  text,
  iconType,
  iconName,
  path,
  iconColor,
}) => {
  const navigation = useNavigation();

  const handlePress = () => {
    if (path) {
      try {
        navigation.navigate(path as never);
        console.log(navigation.getState());
      } catch (error) {
        console.error(`Navigation failed to ${path}: ${error}`);
      }
    } else {
      console.warn(`No path defined for item: ${text}`);
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

export const renderItem = ({item}: {item: any}) => (
  <Item
    text={item.text}
    iconType={item.iconType}
    iconName={item.iconName}
    path={item.path}
    iconColor={item.iconColor}
  />
);
//#endregion DynamicIcon

//#region ToDoList

export const ToDoList: React.FC = () => {
  return (
    <>
      <Background>
        <View style={styles.container}>
          <View style={styles.header}>
            <View style={{flex: 9, flexDirection: 'row', paddingLeft: '5%'}}>
              <Text
                style={[
                  {
                    color: palette.gray.A700,
                    fontFamily: fontStyle.Bold,
                    fontSize: fontSize(65),
                  },
                ]}>
                {'To Do List'}
              </Text>
            </View>
          </View>
          <View style={styles.body}>
            <ScrollArea>
              <View style={styles.body}></View>
            </ScrollArea>
          </View>
        </View>
      </Background>
    </>
  );
};

//#endregion ToDoList

//#region Timer Button

export const TimerButton: React.FC<{
  onPress?: () => void;
  iconType: IconType;
  iconName: string;
  iconColor?: string;
  iconSize?: number;
}> = ({onPress, iconType, iconName, iconColor, iconSize}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <DynamicIcon
        iconType={iconType}
        iconName={iconName}
        color={iconColor}
        size={iconSize}
      />
    </TouchableOpacity>
  );
};

//#endregion Timer Button

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

  //#region ToDoList
  container: {
    flex: 3,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopColor: palette.gray[400],
    borderTopWidth: 0.5,
  },
  header: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  body: {
    flex: 4,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  box: {
    width: setWidth(279),
    height: setHeight(30),
    backgroundColor: palette.skyBlue,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginVertical: 5,
  },

  //#endregion ToDoList

  //#region Timer Button
  timerButton: {
    width: setWidth(35),
    height: setWidth(35),
    justifyContent: 'center',
    alignItems: 'center',
  },
  //#endregion Timer Button
});
