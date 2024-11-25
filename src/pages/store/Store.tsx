import React, {useEffect, useState} from 'react';
import {Text, View, ActivityIndicator, StyleSheet} from 'react-native';
import {ScreenProps} from '../../../App';
import {palette} from '../../common/palette';
import {useModal} from '../../common/hooks';
import {FlatList} from 'react-native-gesture-handler';
import {ImageItem} from '../../components/common/DynamicIcon';
import {Background} from '../../components/layout/Background';
import {fontSize, fontStyle, setWidth} from '../../common/deviceUtils';
import ScrollArea from '../../components/layout/ScrollArea';
import api from '../../common/api';
import {CoinHeader} from '../../components/common/CoinHeader';
import {globalContext} from '../../common/globalContext';
import {Alert} from 'react-native';

const Store: React.FC<ScreenProps> = ({navigation}) => {
  const [coin, setCoin] = useState(0);
  const {isVisible, openModal, closeModal} = useModal();
  const [categories, setCategories] = useState<
    {
      category_name: string;
      category_id: number;
      items: any[];
    }[]
  >([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    homeListhandler();
    categoryHandler();
  }, []);

  const homeListhandler = async () => {
    try {
      const result = await api<any>('get', '/home/list', {
        user_id: globalContext.user.user_id,
      });
      const homeList = result.data;

      setCoin(homeList[0].total_points);
    } catch (error) {
      console.error('Error fetching home list:', error);
    }
  };

  const categoryHandler = async () => {
    try {
      const result = await api<any>('get', '/store/category', {});

      const categoryData = await Promise.all(
        result.data.map(async (cat: {category_name: string}) => {
          const itemsResult = await api<any>('get', `/store/items`, {
            item_category: cat.category_name,
          });

          const itemsData = itemsResult.data || [];

          return {
            category_name: cat.category_name,
            items: itemsData,
          };
        }),
      );

      setCategories(categoryData);
    } catch (error) {
      console.error('Error fetching categories:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const purchaseHandler = async (item_id: number) => {
    try {
      const result = await api<any>('post', '/store/purchase', undefined, {
        user_id: globalContext.user.user_id,
        item_id: Number(item_id),
        quantity: 1,
      });

      if (result.data) {
        console.log('Purchase successful:', result.data);

        closeModal(); // 모달 닫기

        Alert.alert(
          '구매 완료',
          '아이템이 성공적으로 구매되었습니다.',
          [
            {
              text: '확인',
              onPress: () => homeListhandler(), // 코인 정보 갱신
            },
          ],
          {cancelable: false}, // Alert 창 바깥 클릭으로 닫기 방지
        );
      } else {
        console.error('Purchase failed:', result.data.ERROR_MSG);

        // 구매 실패 Alert 표시
        Alert.alert(
          '구매 실패',
          result.data.ERROR_MSG || '알 수 없는 오류가 발생했습니다.',
          [{text: '확인'}], // 확인 버튼만 표시
        );
      }
    } catch (error) {
      console.error('Error during purchase:', error);

      // 네트워크 오류 또는 기타 예외 Alert 표시
      Alert.alert(
        '구매 실패',
        '구매 중 오류가 발생했습니다. 다시 시도해주세요.',
        [{text: '확인'}], // 확인 버튼만 표시
      );
    }
  };

  const renderImageItem = ({item}: {item: any}) => {
    if (!item.item_id) {
      console.error('item_id is missing for item:', item);
    }

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
        onConfirm={() => purchaseHandler(item.item_id)}
      />
    );
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
              <View key={index} style={{alignItems: 'center'}}>
                <Text
                  style={{
                    textAlign: 'center',
                    fontSize: fontSize(50),
                    color: palette.black,
                    fontFamily: fontStyle.SemiBold,
                    marginBottom: 10,
                  }}>
                  {category.category_name}
                </Text>
                <FlatList
                  data={category.items}
                  renderItem={renderImageItem}
                  keyExtractor={(item, idx) => `${item.id || idx}`}
                  numColumns={3}
                  scrollEnabled={false}
                />
              </View>
            ))}
          </ScrollArea>
        </View>
      </View>
    </Background>
  );
};

export default Store;

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
