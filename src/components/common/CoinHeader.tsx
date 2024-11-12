import React from 'react';
import {StyleSheet, Image, Text} from 'react-native';
import {fontSize, fontStyle, setWidth} from '../../common/deviceUtils';
import {palette} from '../../common/palette';
import {View} from 'react-native';
import {Item} from './DynamicIcon';
import {IconType} from '../../common/IconType';

interface IconProps {
  iconType: IconType;
  iconName: string;
  color?: any;
  size?: number;
  onPress?: () => void;
  imagePath?: any;
  coin?: number;
}

interface HeaderProps {
  centerIconProps: IconProps;
  coin: number;
}

export const CoinHeader: React.FC<HeaderProps> = ({centerIconProps, coin}) => {
  return (
    <>
      <View style={[styles.container]}>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-start',
          }}>
          <Item
            iconType={'Feather'}
            iconName={'chevron-left'}
            iconColor={palette.gray[800]}
            path="Home"
          />
        </View>

        <View
          style={{
            flex: 1,
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          {centerIconProps.imagePath ? (
            <Image
              source={centerIconProps.imagePath}
              style={{
                width: centerIconProps.size,
                height: centerIconProps.size,
                resizeMode: 'contain',
              }}
            />
          ) : (
            <></>
          )}
        </View>

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
              marginLeft: setWidth(25),
              width: setWidth(70),
              resizeMode: 'contain',
              position: 'absolute',
            }}
          />
          <Text
            style={{
              marginLeft: setWidth(52),
              color: palette.gray[800],
              fontFamily: fontStyle.SemiBold,
              fontSize: fontSize(40),
            }}>
            {coin}
          </Text>
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
