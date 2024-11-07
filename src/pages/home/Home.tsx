import React, {useState, useEffect} from 'react';
import {
  Image,
  ImageBackground,
  View,
  Text,
  Alert,
  TouchableOpacity,
  Button,
} from 'react-native';
import {ScreenProps} from '../../../App';
import {Header} from './HomeHeader';
import {palette} from '../../common/palette';
import HomeMenuData from './HomeMenuData';
import {fontSize, fontStyle, setHeight} from '../../common/deviceUtils';
import ImageIcon from '../../components/common/ImageIcon';
import api from '../../common/api';
import {globalContext} from '../../common/globalContext';
import {API_HOST} from '@env';
import axios from 'axios';

const Home: React.FC<ScreenProps> = ({navigation}) => {
  const [percentage, setPercentage] = useState(0);
  const [coin, setCoin] = useState(0);
  const [level, setLevel] = useState(0);
  const [timer, setTimer] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isTestMode, setIsTestMode] = useState(false); // State for test mode

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

  useEffect(() => {
    const initialize = async () => {
      globalContext.navigation = navigation;
      axios.defaults.baseURL = API_HOST;

      await loginhandler();
      await homeListhandler();
    };

    initialize();
  }, []);

  const loginhandler = async () => {
    const result = await api<any>('get', '/user/login', {
      user_id: 'admin',
      password: 'admin',
    });
    const user = result.data;
    globalContext.user = user;
  };

  const homeListhandler = async () => {
    if (!globalContext.user) {
      console.error('User not logged in');
      return;
    }

    const result = await api<any>('get', '/home/list', {
      user_id: globalContext.user.user_id,
    });

    const homeList = result.data;
    setPercentage(homeList[0].progress_percent);
    setCoin(homeList[0].total_points);
    setLevel(homeList[0].cat_level);
  };

  const sendStudyTimeToServer = async (studyTime: number) => {
    if (globalContext.user && globalContext.user.user_id) {
      try {
        console.log(
          'Sending study time with user_id:',
          globalContext.user.user_id,
          'and study_time:',
          studyTime,
        );
        await api('post', '/home/timer', {
          user_id: globalContext.user.user_id,
          study_time: studyTime,
        });
      } catch (error: any) {
        console.error(
          'Failed to send study time:',
          error?.response?.data || error.message,
        );
      }
    } else {
      console.error('User ID is missing or not set in globalContext.');
    }
  };

  const resetTimer = () => {
    if (isRunning || timer > 0) {
      setIsRunning(false);
      const studyTime = isTestMode ? 50 : Math.floor(timer / 60);
      Alert.alert(
        '공부를 멈출꺼냥?',
        `현재 타이머가 멈췄다. 지금까지 ${studyTime}분 공부 중입니다. 시간 초기화할꺼냥?`,
        [
          {
            text: '아니요',
            onPress: () => {
              setIsRunning(true);
            },
            style: 'cancel',
          },
          {
            text: '네',
            onPress: async () => {
              await sendStudyTimeToServer(studyTime);
              console.log(`총 공부 시간: ${studyTime}분`);
              setTimer(0);
            },
          },
        ],
      );
    } else {
      setTimer(0);
      setIsRunning(false);
    }
  };

  const formatTime = (time: number) => {
    const getSeconds = `0${time % 60}`.slice(-2);
    const minutes = Math.floor(time / 60);
    const getMinutes = `0${minutes % 60}`.slice(-2);
    const getHours = `0${Math.floor(time / 3600)}`.slice(-2);

    return `${getHours}:${getMinutes}:${getSeconds}`;
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
          <Header coin={coin} />
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
          <Button
            title={`테스트 모드: ${isTestMode ? 'ON' : 'OFF'}`}
            onPress={() => setIsTestMode(!isTestMode)}
            color={isTestMode ? 'green' : 'gray'}
          />
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
            flex: 1,
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row',
            backgroundColor: palette.gray[200],
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
                {level}
              </Text>
            </View>
            <View style={{alignItems: 'center'}}>
              <View style={{width: '90%'}}>
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

export default Home;
