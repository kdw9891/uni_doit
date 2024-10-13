import React from 'react';
import {StyleSheet, Image} from 'react-native';
import {fontSize, fontStyle} from '../../common/deviceUtils';
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
}

interface HeaderProps {
  centerIconProps: IconProps;
  rightIconProps: IconProps;
  ModalComponent?: React.ReactNode;
}

export const Header: React.FC<HeaderProps> = ({
  centerIconProps,
  rightIconProps,
}) => {
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
            alignItems: 'center',
            justifyContent: 'flex-end',
          }}>
          <Item
            iconType={rightIconProps.iconType}
            iconName={rightIconProps.iconName}
            iconColor={rightIconProps.color}
            onPress={rightIconProps.onPress}
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
