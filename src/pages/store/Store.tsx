import React from 'react';
import {Text, View} from 'react-native';
import {ScreenProps} from '../../../App';
import {Header} from '../../components/common/Header';
import {palette} from '../../common/palette';
import {useModal} from '../../common/hooks';
import InfoModal from '../../components/common/InfoModal';
import {FlatList} from 'react-native-gesture-handler';
import StoreData from './StoreData';
import {storeItem} from '../../components/common/DynamicIcon';
import {Background} from '../../components/layout/Background';
import {fontSize, fontStyle, setWidth} from '../../common/deviceUtils';
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

const Store: React.FC<ScreenProps> = ({navigation}) => {
  const {isVisible, openModal, closeModal} = useModal();
  return (
    <Background>
      <View style={{flex: 10}}>
        <View style={{flex: 1}}>
          <Header
            centerIconProps={{
              iconName: 'null',
              iconType: 'AntDesign',
              imagePath: require('../../assets/newimages/shophead.png'),
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
            <Text>{'상점 정보'}</Text>
          </InfoModal>
        </View>
        <View style={{flex: 9}}>
          <ScrollArea>
            <Section title="소모품" data={StoreData.CONSUMABLE_DATA} />
            <Section title="특수 아이템" data={StoreData.SPECIAL_ITEMS_DATA} />
            <Section title="커스터마이징" data={StoreData.CUSTOMIZING_DATA} />
            <Section title="악세서리" data={StoreData.ACCESSORY_DATA} />
            <Section title="친구" data={StoreData.COMPANION_ITEMS_DATA} />
          </ScrollArea>
        </View>
      </View>
    </Background>
  );
};

export default Store;
