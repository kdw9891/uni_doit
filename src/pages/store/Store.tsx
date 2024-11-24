import React, {useEffect, useState} from 'react';
import {Text, View, ActivityIndicator} from 'react-native';
import {ScreenProps} from '../../../App';
import {Header} from '../../components/common/Header';
import {palette} from '../../common/palette';
import {useModal} from '../../common/hooks';
import InfoModal from '../../components/common/InfoModal';
import {FlatList} from 'react-native-gesture-handler';
import {renderImageItem} from '../../components/common/DynamicIcon';
import {Background} from '../../components/layout/Background';
import {fontSize, fontStyle, setWidth} from '../../common/deviceUtils';
import ScrollArea from '../../components/layout/ScrollArea';
import api from '../../common/api';
import {CoinHeader} from '../../components/common/CoinHeader';
import {globalContext} from '../../common/globalContext';

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
      renderItem={renderImageItem}
      keyExtractor={(item, index) => `${item.id || index}`}
      numColumns={3}
      scrollEnabled={false}
    />
  </View>
);

const Store: React.FC<ScreenProps> = ({navigation}) => {
  const [coin, setCoin] = useState(0);
  const {isVisible, openModal, closeModal} = useModal();
  const [categories, setCategories] = useState<
    {category_name: string; category_id: number; items: any[]}[]
  >([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    homeListhandler();
    categoryHandler();
  }, []);

  const homeListhandler = async () => {
    const result = await api<any>('get', '/home/list', {
      user_id: globalContext.user.user_id,
    });
    const homeList = result.data;

    setCoin(homeList[0].total_points);
  };

  const categoryHandler = async () => {
    try {
      const result = await api<any>('get', '/store/category', {});

      const categoryData = await Promise.all(
        result.data.map(async (cat: {category_name: string}) => {
          console.log(
            `Attempting to fetch items for item_category: ${cat.category_name}`,
          );

          const itemsResult = await api<any>('get', `/store/items`, {
            item_category: cat.category_name,
          });

          const itemsData = itemsResult.data || [];

          console.log(itemsData);

          return {
            category_name: cat.category_name,
            items: itemsData,
          };
        }),
      );

      setCategories(categoryData);
    } catch (error) {
      console.error('Error fetching category or items data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <Background>
        <ActivityIndicator
          size="large"
          color={palette.black}
          style={{flex: 1, justifyContent: 'center'}}
        />
      </Background>
    );
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
          <ScrollArea>
            {categories.map((category, index) => (
              <Section
                key={index}
                title={category.category_name}
                data={category.items}
              />
            ))}
          </ScrollArea>
        </View>
      </View>
    </Background>
  );
};

export default Store;
