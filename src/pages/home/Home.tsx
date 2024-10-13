import React, {useState, useEffect} from 'react';
import {Image, ImageBackground, View, Text, Alert, TouchableOpacity} from 'react-native';
import {ScreenProps} from '../../../App';
import {Header} from './HomeHeader';
import {palette} from '../../common/palette';
import HomeMenuData from './HomeMenuData';
import {fontSize, fontStyle, setHeight} from '../../common/deviceUtils';
import ImageIcon from '../../components/common/ImageIcon';

const Home2: React.FC<ScreenProps> = ({navigation}) => {
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

  const handleIconClick = (id: string) => {
    const item = HomeMenuData.HOME_MENU_DATA.find(item => item.id === id);
    if (item) {
      navigation.navigate(item.route);
    }
  };

  return (
    <>
      <ImageBackground
        source={require('../../assets/newimages/white-background.jpg')}
        style={{flex: 10}}>
        <View style={{flex: 0.7, alignItems: 'center'}}>
          <Header
            coin={300}
            toDoPress={() => {
              navigation.navigate('TodoList');
            }}
            onPress={() => {
              navigation.navigate('OldHome');
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
              width: '60%',
              justifyContent: 'space-evenly',
              alignItems: 'center',
            }}>
            <TouchableOpacity onPress={resetTimer}>
              <Image
                source={require('../../assets/newimages/reseticon.png')}
                style={{
                  width: setHeight(24),
                  height: setHeight(24),
                  resizeMode: 'contain',
                }}
              />
            </TouchableOpacity>

            <Text
              style={{
                fontSize: fontSize(65),
                fontFamily: fontStyle.Bold,
                color: palette.gray[800],
              }}>
              {formatTime(timer)}
            </Text>

            <TouchableOpacity onPress={() => setIsRunning(!isRunning)}>
              <Image
                source={
                  isRunning
                    ? require('../../assets/newimages/stopicon.png')
                    : require('../../assets/newimages/starticon.png')
                }
                style={{
                  width: setHeight(24),
                  height: setHeight(24),
                  resizeMode: 'contain',
                }}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{flex: 4.5, justifyContent: 'center', alignItems: 'center'}}>
          <Image
            source={require('../../assets/images/cat_image.png')}
            style={{
              marginTop: '30%',
              width: 280,
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
                    height: setHeight(12),
                    borderWidth: 2,
                    borderRadius: 10,
                    borderColor: palette.gray[400],
                  }}>
                  <View
                    style={{
                      width: `${percentage}%`,
                      height: setHeight(8.5),
                      borderRadius: 10,
                      backgroundColor: palette.red[500],
                    }}
                  />
                </View>
              </View>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            {HomeMenuData.HOME_MENU_DATA.map(item => (
              <ImageIcon
                key={item.id}
                imagePath={item.path}
                onClick={() => handleIconClick(item.id)}
              />
            ))}
          </View>
        </View>
      </ImageBackground>
    </>
  );
};

export default Home2;
