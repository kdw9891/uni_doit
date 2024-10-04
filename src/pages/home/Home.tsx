import React from 'react';
import {Image, ImageBackground, View} from 'react-native';
import {ScreenProps} from '../../../App';
import {Header} from './Header';
import {Text, FlatList} from 'react-native';
import {palette} from '../../common/palette';
import LottieView from 'lottie-react-native';
import {renderItem} from './HomeCompo';
import HomeMenuData from './HomeMenuData';
import {TimerButton} from './HomeCompo';
import {globalContext} from '../../common/globalContext';
import {fontSize, fontStyle, setHeight} from '../../common/deviceUtils';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';

const Home: React.FC<ScreenProps> = ({navigation}) => {
  const percentage = 50;

  return (
    <>
      <ImageBackground
        source={require('../../assets/images/background_new.png')}
        style={{flex: 10}}>
        <View style={{flex: 0.7, alignItems: 'center'}}>
          <Header coin={300} level={10000} percentage={80} />
        </View>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View
            style={{
              flexDirection: 'row',
              width: '60%',
              height: '80%',
              justifyContent: 'space-around',
              alignItems: 'center',
              // borderTopWidth: 1,
              // borderBottomWidth: 1,
              // borderColor: palette.gray[400],
            }}>
            <Entypo name="cw" size={24} color={palette.gray[600]} />
            <Text
              style={{
                fontSize: 24,
                fontWeight: 'bold',
                color: palette.gray[800],
              }}>
              00:00
            </Text>
            <AntDesign name="caretright" size={24} color={palette.gray[600]} />
          </View>
        </View>
        <View
          style={{flex: 4.5, justifyContent: 'center', alignItems: 'center'}}>
          {/* <LottieView
            style={{width: '100%', height: '100%'}}
            source={require('../../assets/lottie/cat_moon.json')}
            autoPlay
            loop={true}
          /> */}
          <Image
            source={require('../../assets/images/cat_image.png')}
            style={{
              marginTop: '30%',
              width: 200,
              justifyContent: 'center',
              resizeMode: 'contain',
            }}
          />
        </View>
        <View
          style={{
            flex: 0.7,
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row',
          }}>
          <View
            style={{
              flex: 1,
              flexDirection: 'column',
              justifyContent: 'center',
            }}>
            <View style={{alignItems: 'flex-start', paddingLeft: '5%'}}>
              <Text
                style={{
                  color: palette.gray[600],
                  fontFamily: fontStyle.Bold,
                  fontSize: fontSize(40),
                  lineHeight: setHeight(15),
                }}>
                {'Lv.'}
                {'100'}
              </Text>
            </View>
            <View style={{alignItems: 'center'}}>
              <View
                style={{
                  width: '90%',
                }}>
                <View
                  style={{
                    justifyContent: 'center',
                    height: setHeight(11),
                    borderWidth: 2,
                    borderColor: palette.gray[200],
                  }}>
                  <View
                    style={{
                      width: `${percentage}%`,
                      height: setHeight(7.5),
                      backgroundColor: palette.red[500],
                    }}
                  />
                </View>
              </View>
            </View>
          </View>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <FlatList
              data={HomeMenuData.HOME_MENU_DATA}
              renderItem={renderItem}
              keyExtractor={item => item.id}
              scrollEnabled={false}
              numColumns={3}
            />
          </View>
        </View>
        {/* <View
          style={{
            flex: 3,
            width: '100%',
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <ToDoList />
        </View> */}
      </ImageBackground>
    </>
  );
};

export default Home;
