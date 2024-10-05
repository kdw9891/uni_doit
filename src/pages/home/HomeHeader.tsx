import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {setWidth, fontSize, fontStyle} from '../../common/deviceUtils';
import {palette} from '../../common/palette';
import {View} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {TimerButton} from './HomeCompo';

export const Header = ({
  toDoPress,
  infoPress,  
  coin,
}: {
  toDoPress?: () => void;
  infoPress?: () => void;
  coin: number;
}) => {
  return (
    <>
      <View style={[styles.container]}>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            width: '100%',
            height: '100%',
            alignItems: 'center',
          }}>
          <MaterialIcons
            name="copyright"
            style={{marginLeft: setWidth(15)}}
            size={setWidth(20)}
            color={palette.deepOrange.A700}
          />
          <Text
            style={{
              marginLeft: setWidth(5),
              // color: palette.gray[600],
              color: palette.black,
              fontFamily: fontStyle.SemiBold,
              fontSize: fontSize(40),
            }}>
            {coin}
          </Text>
        </View>
        <View
          style={{
            flex: 2,
            flexDirection: 'column',
            width: '100%',
            height: '100%',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          {/* <Image
              source={require('../../assets/images/doit.png')}
              style={{
                width: setWidth(120),
                justifyContent: 'center',
                resizeMode: 'contain',
              }}
            /> */}
          {/* <View
            style={{
              flex: 1,
              width: '100%',
              justifyContent: 'flex-end',
            }}>
            <Text
              style={{
                color: palette.gray[600],
                marginRight: setWidth(5),
                fontFamily: fontStyle.SemiBold,
                fontSize: fontSize(38),
                lineHeight: setHeight(50),
              }}>
              {'Lv.'}
              {level}
            </Text>
          </View>
          <View
            style={{
              flex: 1,
              width: '100%',
              justifyContent: 'center',
            }}>
            <View
              style={{
                height: setHeight(10),
                backgroundColor: palette.gray[300],
                borderRadius: setHeight(10),
              }}>
              <View
                style={{
                  width: `${percentage}%`,
                  height: setHeight(10),
                  backgroundColor: palette.cyan[400],
                  borderRadius: setHeight(10),
                }}
              />
            </View>
          </View> */}
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            width: '100%',
            height: '100%',
            alignItems: 'center',
            justifyContent: 'flex-end',
          }}>
          <TimerButton
            iconType="FontAwesome"
            iconName="info"
            iconStyle={{marginRight: setWidth(18)}}
            iconColor={palette.gray[800]}
            iconSize={setWidth(21)}
            onPress={() => {toDoPress}}
          />
          <TimerButton
            iconType="FontAwesome"
            iconName="pencil"
            iconStyle={{marginRight: setWidth(18)}}
            iconColor={palette.gray[800]}
            iconSize={setWidth(21)}
            onPress={() => {infoPress}}
          />
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 3,
    flexDirection: 'row',
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