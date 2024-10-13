import React, {useState, useEffect} from 'react';
import {Image, ImageBackground, View, Text, FlatList, Alert} from 'react-native';
import {ScreenProps} from '../../../App';
import {Header} from './HomeHeader';
import {palette} from '../../common/palette';
import {renderItem} from '../../components/common/DynamicIcon';
import HomeMenuData from './HomeMenuData';
import {TimerButton} from './HomeCompo';
import {fontSize, fontStyle, setHeight} from '../../common/deviceUtils';
import LottieView from 'lottie-react-native';

const Home: React.FC<ScreenProps> = ({navigation}) => {
  const percentage = 50;

  const [timer, setTimer] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isRunning) {
      interval = setInterval(() => {
        setTimer(prev => prev + 1);
      }, 1000);
    } else if (!isRunning && timer !== 0) {
      clearInterval(interval!);
    }
    return () => clearInterval(interval!);
  }, [isRunning]);

  const formatTime = (time: number) => {
    const getSeconds = `0${time % 60}`.slice(-2);
    const minutes = Math.floor(time / 60);
    const getMinutes = `0${minutes % 60}`.slice(-2);
    const getHours = `0${Math.floor(time / 3600)}`.slice(-2);

    return `${getHours}:${getMinutes}:${getSeconds}`;
  };

  const resetTimer = () => {
    if (isRunning || timer > 0) {
      Alert.alert(
        '공부를 멈출꺼냥?',
        '현재 타이머가 멈췄다. 시간 초기화할꺼냥?',
        [
          {
            text: '아니요',
            onPress: () => {},
            style: 'cancel',
          },
          {
            text: '네',
            onPress: () => {
              setTimer(0);
              setIsRunning(false);
            },
          },
        ],
      );
    } else {
      setTimer(0);
      setIsRunning(false);
    }
  };

  return (
    <>
      <ImageBackground
        source={require('../../assets/images/background_new.png')}
        style={{flex: 10}}>
        <View style={{flex: 0.7, alignItems: 'center'}}>
          <Header
            coin={300}
            toDoPress={() => {
              navigation.navigate('TodoList');
            }}
            onPress={() => {
              navigation.navigate('Home');
            }}
          />
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
              width: '80%',
              justifyContent: 'space-evenly',
              alignItems: 'center',
            }}>
            <TimerButton
              iconType="Foundation"
              iconName="refresh"
              iconColor={palette.blue[600]}
              iconSize={setHeight(24)}
              onPress={resetTimer}
            />
            <Text
              style={{
                fontSize: fontSize(65),
                fontFamily: fontStyle.Bold,
                color: palette.gray[800],
              }}>
              {formatTime(timer)}
            </Text>
            <TimerButton
              iconType="Entypo"
              iconName={isRunning ? 'controller-stop' : 'controller-play'}
              iconColor={isRunning ? palette.red[500] : palette.green[600]}
              iconSize={setHeight(24)}
              onPress={() => setIsRunning(!isRunning)}
            />
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
            source={require('../../assets/images/cat_new.png')}
            style={{
              marginTop: '30%',
              width: 250,
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
            {/* <FlatList
              data={HomeMenuData.HOME_MENU_DATA}
              renderItem={renderItem}
              keyExtractor={item => item.id}
              scrollEnabled={false}
              showsVerticalScrollIndicator={false}
              numColumns={3}
            /> */}
          </View>
        </View>
      </ImageBackground>
    </>
  );
};

export default Home;
