import React, {useState, useEffect} from 'react';
import {
  Image,
  ImageBackground,
  View,
  Text,
  Alert,
  TouchableOpacity,
  ActivityIndicator,
  Button,
} from 'react-native';
import {ScreenProps} from '../../../App';
import {Header} from './HomeHeader';
import {palette} from '../../common/palette';
import HomeMenuData from './HomeMenuData'; // 유지
import {
  fontSize,
  fontStyle,
  setHeight,
  setWidth,
} from '../../common/deviceUtils';
import ImageIcon from '../../components/common/ImageIcon';
import api from '../../common/api';
import {globalContext} from '../../common/globalContext';
import {API_HOST} from '@env';
import axios from 'axios';
import {toStorage} from '../../common/utility';
import {useFocusEffect} from '@react-navigation/native';

const Home: React.FC<ScreenProps> = ({navigation}) => {
  const [percentage, setPercentage] = useState(0);
  const [coin, setCoin] = useState(0);
  const [level, setLevel] = useState(0);
  const [timer, setTimer] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isTestMode, setIsTestMode] = useState(false);
  const [equippedItems, setEquippedItems] = useState<number[]>([]);
  const [catImage, setCatImage] = useState(
    require('../../assets/newimages/상자고양이.png'),
  ); // 기본 고양이 이미지

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

      console.log(API_HOST);

      await loginhandler();
      await homeListhandler();
      await fetchEquippedItems();
      await fetchEquippedOutfit();

      setIsLoading(false);
    };

    initialize();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      const initialize = async () => {
        axios.defaults.baseURL = API_HOST;

        console.log(API_HOST);

        await loginhandler();
        await homeListhandler();
        await fetchEquippedItems();
        await fetchEquippedOutfit();

        setIsLoading(false);
      };

      initialize();

      return () => {
        // 필요하다면 화면 언포커스 시 수행할 작업 작성
        console.log('Home screen unfocused');
      };
    }, []),
  );

  const sendStudyTimeToServer = async (studyTime: number) => {
    if (globalContext.user && globalContext.user.user_id) {
      try {
        console.log(
          'Sending study time with user_id:',
          globalContext.user.user_id,
          'and study_time:',
          studyTime,
        );
        const result = await api('post', '/home/timer', {
          user_id: globalContext.user.user_id,
          study_time: studyTime,
        });
        homeListhandler();
        console.log('Study time sent successfully:', result);
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

  const loginhandler = async () => {
    const result = await api<any>('get', '/user/login', {
      user_id: 'admin',
      password: 'admin',
    });
    globalContext.user = result.data;
  };

  const homeListhandler = async () => {
    const result = await api<any>('get', '/home/list', {
      user_id: globalContext.user.user_id,
    });

    const homeList = result.data[0];
    setPercentage(homeList.progress_percent);
    setCoin(homeList.total_points);
    setLevel(homeList.cat_level);
  };

  const fetchEquippedItems = async () => {
    try {
      const response = await api<any>(
        'get',
        '/home/fielditemlist',
        {
          user_id: globalContext.user.user_id,
        },
        undefined,
      );

      if (response.data && response.data.length > 0) {
        setEquippedItems(response.data.map((item: any) => item.item_id)); // 장착된 아이템 ID 목록
      } else {
        console.log('No equipped items found for the user.');
        setEquippedItems([]); // 장착된 아이템 ID 목록을 초기화
      }
    } catch (error) {
      console.error('Failed to fetch equipped items:', error);
    }
  };

  const fetchEquippedOutfit = async () => {
    try {
      const response = await api<any>(
        'get',
        '/home/catequiplist',
        {user_id: globalContext.user?.user_id},
        undefined,
      );
      if (response.data && response.data.length > 0) {
        const outfitId = response.data[0]?.item_id;
        switch (outfitId) {
          case 6:
            setCatImage(require('../../assets/newimages/유치원복.png'));
            break;
          case 7:
            setCatImage(require('../../assets/newimages/개구리우비.png'));
            break;
          case 8:
            setCatImage(require('../../assets/newimages/할로윈의상.png'));
            break;
          case 9:
            setCatImage(require('../../assets/newimages/산타.png'));
            break;
          case 10:
            setCatImage(require('../../assets/newimages/잠옷.png'));
            break;
          default:
            setCatImage(require('../../assets/newimages/상자고양이.png'));
        }
      } else {
        console.log('No equipped outfits found.');
        setCatImage(require('../../assets/newimages/상자고양이.png'));
      }
    } catch (error) {
      console.error('Failed to fetch equipped outfit:', error);
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

  if (isLoading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" color="black" />
      </View>
    );
  }

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
            source={
              isRunning
                ? require('../../assets/newimages/공부중.png')
                : catImage
            }
            style={{
              width: setWidth(100),
              marginTop: '40%',
              marginLeft: '10%',
              justifyContent: 'center',
              resizeMode: 'contain',
              zIndex: 1,
            }}
          />
          {equippedItems.includes(27) && (
            <Image
              source={require('../../assets/newimages/러그.png')}
              style={{
                width: setWidth(200),
                resizeMode: 'contain',
                position: 'absolute',
                bottom: '15%',
                left: '20%',
                transform: [{translateY: setWidth(210)}],
                zIndex: 0,
              }}
            />
          )}
          {equippedItems.includes(20) && (
            <Image
              source={require('../../assets/newimages/캣타워(분홍).png')}
              style={{
                width: setWidth(100),
                resizeMode: 'contain',
                position: 'absolute',
                bottom: '16%',
                left: '5%',
                transform: [{translateY: 120}],
              }}
            />
          )}
          {equippedItems.includes(21) && (
            <Image
              source={require('../../assets/newimages/캣타워(파랑).png')}
              style={{
                width: setWidth(100),
                resizeMode: 'contain',
                position: 'absolute',
                bottom: '10%',
                left: '60%',
                transform: [{translateY: 120}],
              }}
            />
          )}
          {equippedItems.includes(28) && (
            <Image
              source={require('../../assets/newimages/스크래쳐.png')}
              style={{
                width: setWidth(70),
                resizeMode: 'contain',
                position: 'absolute',
                bottom: '10%',
                left: '1%',
                transform: [{translateY: 170}],
              }}
            />
          )}
          {equippedItems.includes(22) && (
            <Image
              source={require('../../assets/newimages/화분.png')}
              style={{
                width: setWidth(30),
                resizeMode: 'contain',
                position: 'absolute',
                bottom: '8%',
                left: '84%',
                transform: [{translateY: 240}],
              }}
            />
          )}
          {equippedItems.includes(25) && (
            <Image
              source={require('../../assets/newimages/사료.png')}
              style={{
                width: setWidth(50),
                resizeMode: 'contain',
                position: 'absolute',
                bottom: '10%',
                left: '80%',
                transform: [{translateY: 170}],
              }}
            />
          )}
          {equippedItems.includes(24) && (
            <Image
              source={require('../../assets/newimages/털실.png')}
              style={{
                width: setWidth(40),
                resizeMode: 'contain',
                position: 'absolute',
                bottom: '8%',
                left: '30%',
                transform: [{translateY: 240}],
              }}
            />
          )}
          {equippedItems.includes(26) && (
            <Image
              source={require('../../assets/newimages/방석.png')}
              style={{
                width: setWidth(60),
                resizeMode: 'contain',
                position: 'absolute',
                bottom: '8%',
                left: '1%',
                transform: [{translateY: 230}],
              }}
            />
          )}
        </View>

        {/* HomeMenuData 부분 추가 */}
        <View
          style={{
            flex: 1,
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row',
            backgroundColor: palette.gray[200],
            zIndex: 1,
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
                    borderColor: palette.gray[300],
                  }}>
                  <View
                    style={{
                      width: `${percentage}%`,
                      height: setHeight(8.5),
                      backgroundColor: palette.red[300],
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
