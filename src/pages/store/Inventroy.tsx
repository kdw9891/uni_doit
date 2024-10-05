import React from 'react';
import {Text, View} from 'react-native';
import {ScreenProps} from '../../../App';
import {Header} from '../../components/common/Header';
import {palette} from '../../common/palette';
import {useModal} from '../../common/hooks';
import InfoModal from '../../components/common/InfoModal';

const Inventory: React.FC<ScreenProps> = ({navigation}) => {
  const {isVisible, openModal, closeModal} = useModal();
  return (
    <View style={{flex: 10}}>
      <View style={{flex: 1}}>
        <Header
          centerIconProps={{
            iconType: 'FontAwesome6',
            iconName: 'box-archive',
            color: palette.brown[600],
            size: 30,
          }}
          rightIconProps={{
            iconType: 'FontAwesome',
            iconName: 'info',
            color: palette.gray[800],
            size: 30,
            onPress: openModal,
          }}
        />
        <InfoModal isVisible={isVisible} onClose={closeModal}>
          <Text>{'인벤토리 정보'}</Text>
        </InfoModal>
      </View>
      <View style={{flex: 9}}>
        <Text>{'인벤토리'}</Text>
      </View>
    </View>
  );
};

export default Inventory;
