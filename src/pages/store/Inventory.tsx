import React from 'react';
import {Text, View} from 'react-native';
import {ScreenProps} from '../../../App';
import {Header} from '../../components/common/Header';
import {palette} from '../../common/palette';
import {useModal} from '../../common/hooks';
import InfoModal from '../../components/common/InfoModal';
import {FlatList} from 'react-native-gesture-handler';
import InventoryData from './InventoryData';
import {storeItem} from '../../components/common/DynamicIcon';
import {Background} from '../../components/layout/Background';
import {fontSize, fontStyle} from '../../common/deviceUtils';
import ScrollArea from '../../components/layout/ScrollArea';

const Section: React.FC<{title: string; data: any[]}> = ({title, data}) => (
  <View style={{alignItems: 'center'}}>
    <View
      style={{
        width: '90%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        borderTopColor: palette.gray[300],
        borderTopWidth: 0.5,
      }}>
      <Text
        style={{
          textAlign: 'center',
          fontSize: fontSize(50),
          color: palette.black,
          fontFamily: fontStyle.SemiBold,
          marginLeft: 10,
        }}>
        {title}
      </Text>
    </View>
    <FlatList
      data={data}
      renderItem={storeItem}
      keyExtractor={item => item.id}
      numColumns={3}
      scrollEnabled={false}
    />
  </View>
);

const Inventory: React.FC<ScreenProps> = ({navigation}) => {
  const {isVisible, openModal, closeModal} = useModal();
  return (
    <Background>
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
            <Text>{'상점 정보'}</Text>
          </InfoModal>
        </View>
        <View style={{flex: 9}}>
          <ScrollArea>
            <Section title="" data={InventoryData.INVENTORY_DATA} />
          </ScrollArea>
        </View>
      </View>
    </Background>
  );
};

export default Inventory;
