import React from 'react';
import {Image, StyleSheet, Text} from 'react-native';
import {setWidth, fontSize, fontStyle} from '../../common/deviceUtils';
import {palette} from '../../common/palette';
import {View} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {TimerButton} from './HomeCompo';
import {InfoModal} from '../../components/common/InfoModal';
import {useModal} from '../../common/hooks';
import {TouchableOpacity} from 'react-native-gesture-handler';

export const Header = ({
  onPress,
  coin,
}: {
  onPress?: () => void;
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
          <Image
            source={require('../../assets/newimages/coin.png')}
            style={{
              marginLeft: setWidth(15),
              width: setWidth(75),
              height: setWidth(60),
              resizeMode: 'contain',
              position: 'absolute',
            }}
          />
          <Text
            style={{
              marginLeft: setWidth(43),
              color: palette.gray[800],
              fontFamily: fontStyle.SemiBold,
              fontSize: fontSize(40),
            }}>
            {coin}
          </Text>
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: 'column',
            width: '100%',
            height: '100%',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Image
            source={require('../../assets/images/doit_logo.png')}
            style={{
              width: 130,
              justifyContent: 'center',
              resizeMode: 'contain',
            }}
          />
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
          {/* <TimerButton
            iconType="MaterialIcons"
            iconName="settings"
            iconStyle={{marginRight: setWidth(18)}}
            iconColor={palette.gray[800]}
            iconSize={setWidth(25)}
            onPress={() => {
              openModal();
            }}
          />
          <InfoModal isVisible={isVisible} onClose={closeModal}>
            <Text>{'Info Modal'}</Text>
          </InfoModal> */}
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
