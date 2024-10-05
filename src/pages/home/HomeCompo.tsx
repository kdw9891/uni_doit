import React from 'react';
import {View, Text} from 'react-native';
import {palette} from '../../common/palette';
import {StyleSheet} from 'react-native';
import {setHeight, setWidth, fontSize, fontStyle} from '../../common/deviceUtils';
import {IconComponents, IconType} from '../../common/IconType';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
import ScrollArea from '../../components/layout/ScrollArea';
import {Background} from '../../components/layout/Background';
import {DynamicIcon} from '../../components/common/DynamicIcon';

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
  iconStyle?: any;
}> = ({onPress, iconType, iconName, iconColor, iconSize, iconStyle}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <DynamicIcon
        iconType={iconType}
        iconName={iconName}
        style={iconStyle}
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
