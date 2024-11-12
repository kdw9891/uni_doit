import React, {useEffect, useState} from 'react';
import {Text, View} from 'react-native';
import Tabs from './Tabs';
import {Header} from '../../components/common/Header';
import {palette} from '../../common/palette';
import {setWidth} from '../../common/deviceUtils';
import {Background} from '../../components/layout/Background';
import {useModal} from '../../common/hooks';
import {CoinHeader} from '../../components/common/CoinHeader';
import api from '../../common/api';
import { globalContext } from '../../common/globalContext';
import { fromStorage } from '../../common/utility';

const ItemStore = () => {
  const {isVisible, openModal, closeModal} = useModal();
  const [tab, setTab] = useState(0);
  const [coin, setCoin] = useState(0);
  const [category, setCategory] = useState([]);

  useEffect(() => {
    categoryHandler();
  }, []);
  
  const categoryHandler = async () => {
    const result = await api<any>('get', '/store/category', {});  
    const categoryList = result.data;
    setCategory(categoryList);
  };

  const CoinHandler = async () => {
    const result = await api<any>('get', '/user/home', {
      user_id: globalContext.user.user_id,
    });
    const coin = result.data;
    setCoin(coin);
  }

  return (
    <Background>
      <View style={{flex: 10}}>
        <View style={{flex: 1}}>
          <CoinHeader
            centerIconProps={{
              iconName: 'null',
              iconType: 'AntDesign',
              imagePath: require('../../assets/newimages/shophead.png'),
              size: setWidth(45),
            }}
            coin={coin}
          />
        </View>
        <View style={{flex: 9}}>
          <Tabs
            menus={['소비', '의상', '오브젝트']}
            onSelectHandler={index => {
              setTab(index);
            }}
            selectedIndex={tab}
          />
          <View>
            <Text>{tab}</Text>
          </View>
        </View>
      </View>
    </Background>
  );
};

export default ItemStore;
