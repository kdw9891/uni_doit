import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {setWidth, fontSize, fontStyle} from '../../common/deviceUtils';
import {palette} from '../../common/palette';
import {View} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {TimerButton} from './HomeCompo';
import {InfoModal} from '../../components/common/InfoModal';
import {useModal} from '../../common/hooks';

export const Header = ({
  toDoPress,
  coin,
}: {
  toDoPress?: () => void;
  coin: number;
}) => {
  const {isVisible, openModal, closeModal} = useModal();
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
          }}></View>
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
            onPress={() => {
              openModal();
            }}
          />
          <InfoModal isVisible={isVisible} onClose={closeModal}>
            <Text>{'Home Info'}</Text>
          </InfoModal>
          <TimerButton
            iconType="FontAwesome"
            iconName="pencil"
            iconStyle={{marginRight: setWidth(18)}}
            iconColor={palette.gray[800]}
            iconSize={setWidth(21)}
            onPress={toDoPress}
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
