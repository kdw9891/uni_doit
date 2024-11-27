import React, {useEffect, useState} from 'react';
import {Text, View, ActivityIndicator, StyleSheet, Alert} from 'react-native';
import {ScreenProps} from '../../../App';
import {Header} from '../../components/common/Header';
import {palette} from '../../common/palette';
import {useModal} from '../../common/hooks';
import ItemModal from '../../components/common/ItemModal';
import {FlatList} from 'react-native-gesture-handler';
import {ImageItem} from '../../components/common/DynamicIcon';
import {Background} from '../../components/layout/Background';
import {fontSize, fontStyle, setWidth} from '../../common/deviceUtils';
import ScrollArea from '../../components/layout/ScrollArea';
import api from '../../common/api';
import {globalContext} from '../../common/globalContext';

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
      const itemsResult = await api<any>(
        'get',
        `/inventory/list`,
        {
          user_id: globalContext.user?.user_id || 'default_user',
        },
        undefined,
      );
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
      
    } finally {
      setIsLoading(false);
    }
  };

  const renderImageItem = ({item}: {item: any}) => {
    if (!item.item_id) {
      console.error('item_id is missing for item:', item);
    }

    const handleItemClick = async () => {
      try {
        // API로 아이템 세부 정보를 가져옵니다.
        const response = await api<any>('get', '/inventory/itemdetails', {
          item_id: item.item_id,
        });

        const itemDetails = response.data;

        console.log('Item Details:', itemDetails); // itemDetails 값 확인
        console.log('inventory_id:', itemDetails[0]?.inventory_id);
        console.log('item_id:', itemDetails[0]?.item_id);

        // 아이템 카테고리에 따라 처리
        if (itemDetails[0]?.item_category === '의상') {
          await handleWearableItem(itemDetails[0]);
        } else if (itemDetails[0]?.item_category === '오브젝트') {
          await handleObjectItem(itemDetails[0]);
        } else {
          Alert.alert('장착 불가', '이 아이템은 장착할 수 없습니다.');
        }
      } catch (error) {
        console.error('Error handling item click:', error);
      }
    };

    return (
      <ImageItem
        viewStyle={styles.menuItem}
        item={{
          text: item.item_name,
          quantity: item.quantity,
          image_url: item.image_url,
          item_price: item.item_price,
          item_name: item.item_name,
          item_rarity: item.item_rarity,
          image_description: item.item_description,
          item_id: item.item_id, // 필수 데이터
        }}
        onConfirm={handleItemClick}
      />
    );
  };

  const handleWearableItem = async (itemDetails: any) => {
    try {
      const result = await api<any>(
        'post',
        '/inventory/itemuse',
        {
          user_id: globalContext.user?.user_id,
          inventory_id: itemDetails.inventory_id,
          item_id: itemDetails.item_id,
        },
        undefined,
      );

      if (result.status === 200) {
        if (result.data?.alreadyEquipped) {
          Alert.alert('알림', '이미 장착된 아이템입니다.');
        } else {
          Alert.alert('장착 완료', '의상이 성공적으로 장착되었습니다.');
          categoryHandler(); // 업데이트된 데이터를 반영하기 위해 호출
        }
      } else {
        Alert.alert('오류', '의상 장착에 실패했습니다.');
      }
    } catch (error) {
      Alert.alert('알림', '이미 장착된 아이템입니다.');
    }
  };

  const handleObjectItem = async (itemDetails: any) => {
    try {
      const result = await api<any>(
        'post',
        '/inventory/itemuse',
        {
          user_id: globalContext.user?.user_id,
          inventory_id: itemDetails.inventory_id,
          item_id: itemDetails.item_id,
        },
        undefined,
      );

      if (result.status === 200) {
        if (result.data?.alreadyEquipped) {
          Alert.alert('알림', '이미 배치된 오브젝트입니다.');
        } else {
          Alert.alert('장착 완료', '오브젝트가 성공적으로 배치되었습니다.');
          categoryHandler(); // 업데이트된 데이터를 반영하기 위해 호출
        }
      } else {
        Alert.alert('오류', '오브젝트 배치에 실패했습니다.');
      }
    } catch (error) {
      Alert.alert('알림', '이미 장착된 아이템입니다.');
    }
  };

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

const styles = StyleSheet.create({
  menuItem: {
    marginHorizontal: 20,
    marginVertical: 20,
    width: setWidth(70),
    height: setWidth(95),
    alignItems: 'center',
    justifyContent: 'center',
  },
});
