import React from 'react';
import {View} from 'react-native';
import {ScreenProps} from '../../../App';
import {Header} from './Header';
import {Text, FlatList} from 'react-native';
import {palette} from '../../common/palette';
import LottieView from 'lottie-react-native';
import {renderItem, ToDoList} from './HomeCompo';
import HomeMenuData from './HomeMenuData';
import {globalContext} from '../../common/globalContext';

const Home: React.FC<ScreenProps> = ({navigation}) => {
  return (
    <>
      <View style={{flex: 9, backgroundColor: palette.white}}>
        <View style={{flex: 1, alignItems: 'center'}}>
          <Header coin={300} level={10000} percentage={80} />
        </View>
        <View style={{flex: 4, justifyContent: 'center', alignItems: 'center'}}>
          <LottieView
            style={{width: '100%', height: '100%'}}
            source={require('../../assets/lottie/cat_moon.json')}
            autoPlay
            loop={true}
          />
        </View>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            width: '100%',
            height: '100%',
          }}>
          <FlatList
            data={HomeMenuData.HOME_MENU_DATA}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            numColumns={3}
          />
        </View>
        <View
          style={{
            flex: 3,
            width: '100%',
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <ToDoList />
        </View>
      </View>
    </>
  );
};

export default Home;
