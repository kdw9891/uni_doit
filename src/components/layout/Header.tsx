import React from 'react';

import {View, TouchableOpacity} from 'react-native';
import {widthPercentage} from '../../common/deviceUtils';
import {StackNavigationProp} from '@react-navigation/stack';

import Icon from 'react-native-vector-icons/Ionicons';
import styles from './HeaderStyles';

interface HeaderProps {
  navigation: StackNavigationProp<any>;
  home: boolean;
}

export const HeaderButton: React.FC<HeaderProps> = ({navigation, home}) => {
  return (
    <>
      <View style={[styles.titleIconWrapper]}>
        <TouchableOpacity
          onPress={() => {}}
          style={styles.rightTitleButton}
          disabled={home}>
          <Icon
            name="home"
            size={widthPercentage(23)}
            style={[styles.rightTitleIcon]}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.rightTitleButton}>
          <Icon
            name="menu"
            size={widthPercentage(23)}
            style={styles.rightTitleIcon}
          />
        </TouchableOpacity>
      </View>
    </>
  );
};
