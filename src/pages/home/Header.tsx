import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {
  setWidth,
  setHeight,
  fontSize,
  fontStyle,
} from '../../common/deviceUtils';
import {palette} from '../../common/palette';
import {View} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

export const Header = ({
  title,
  onPress,
  viewStyle,
  textStyle,
}: {
  title?: string;
  onPress?: () => void;
  viewStyle?: any;
  textStyle?: any;
}) => {
  return (
    <>
      <View style={[styles.container, {...viewStyle}]}>
        <View
          style={{
            flex: 1,
            width: "100%",
            height: "100%",
            alignItems: 'flex-start',
            justifyContent: 'center',
            backgroundColor: 'green',
          }}>
          <AntDesign
            name="copyright"
            size={setWidth(20)}
            color={palette.black}
          />
        </View>
        <View
          style={{
            flex: 1,
            width: "100%",
            height: "100%",
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'red',
          }}>
          <Text style={[styles.title, {...textStyle}]}>{title}</Text>
        </View>
        <View
          style={{
            flex: 1,
            width: "100%",
            height: "100%",
            alignItems: 'flex-end',
            justifyContent: 'center',
            backgroundColor: 'blue',
          }}>
          <TouchableOpacity onPress={onPress}>
            <AntDesign
              name="setting"
              size={setWidth(20)}
              color={palette.black}
            />
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 3,
    backgroundColor: palette.gray[500],
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  title: {
    fontFamily: fontStyle.Bold,
    fontSize: fontSize(55),
    color: palette.black,
  },

  icon: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
