import React, {useEffect, useState} from 'react';
import {Text, View, ActivityIndicator} from 'react-native';
import {ScreenProps} from '../../../App';
import {Header} from '../../components/common/Header';
import {palette} from '../../common/palette';
import {useModal} from '../../common/hooks';
import ItemModal from '../../components/common/ItemModal';
import {FlatList} from 'react-native-gesture-handler';
import {renderImageItem} from '../../components/common/DynamicIcon';
import {Background} from '../../components/layout/Background';
import {fontSize, fontStyle, setWidth} from '../../common/deviceUtils';
import ScrollArea from '../../components/layout/ScrollArea';
import api from '../../common/api';
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

const Inventory: React.FC<ScreenProps> = ({navigation}) => {
  const {isVisible, openModal, closeModal} = useModal();
  const [categories, setCategories] = useState<
    {category_name: string; items: any[]}[]
  >([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    categoryHandler();
  }, []);

  const categoryHandler = async () => {
    try {
      // 1. 카테고리 목록을 가져옵니다
      const categoryResult = await api<any>('get', '/inventory/category', {});
      const categoryData = categoryResult.data.map(
        (cat: {category_name: string}) => ({
          category_name: cat.category_name,
          items: [], // 카테고리 별 아이템을 저장할 배열
        }),
      );

      // 2. 아이템 목록을 가져옵니다
      const itemsResult = await api<any>('get', `/inventory/list`, {
        user_id: globalContext.user?.user_id || 'default_user',
      });
      const itemsData = itemsResult.data || [];

      // 3. 아이템을 카테고리별로 분류합니다
      itemsData.forEach((item: any) => {
        const category = categoryData.find(
          (cat: {category_name: any}) =>
            cat.category_name === item.item_category,
        );
        if (category) {
          category.items.push(item);
        }
      });

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
          <Header
            centerIconProps={{
              iconName: 'null',
              iconType: 'AntDesign',
              imagePath: require('../../assets/newimages/inventoryhead.png'),
              size: setWidth(45),
            }}
            // rightIconProps={{
            //   iconType: 'FontAwesome',
            //   iconName: 'info',
            //   color: palette.gray[600],
            //   size: setWidth(30),
            //   onPress: openModal,
            // }}
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

export default Inventory;
