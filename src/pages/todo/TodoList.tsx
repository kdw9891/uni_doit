import React from 'react';
import {Text, View} from 'react-native';
import {ScreenProps} from '../../../App';
import {Header} from '../../components/common/Header';
import {palette} from '../../common/palette';
import {useModal} from '../../common/hooks';
import InfoModal from '../../components/common/InfoModal';
import {setWidth} from '../../common/deviceUtils';

const TodoList: React.FC<ScreenProps> = ({navigation}) => {
  const {isVisible, openModal, closeModal} = useModal();
  return (
    <View style={{flex: 10}}>
      <View style={{flex: 1}}>
        <Header
          centerIconProps={{
            iconName: 'null',
            iconType: 'AntDesign',
            imagePath: require('../../assets/newimages/todohead.png'),
            size: setWidth(45),
          }}
          rightIconProps={{
            iconType: 'FontAwesome',
            iconName: 'info',
            color: palette.gray[800],
            size: setWidth(30),
            onPress: openModal,
          }}
        />
        <InfoModal isVisible={isVisible} onClose={closeModal}>
          <Text>{'TodoList 정보'}</Text>
        </InfoModal>
      </View>
      <View style={{flex: 9}}>
        <Text>{'TodoList'}</Text>
      </View>
    </View>
  );
};

export default TodoList;
