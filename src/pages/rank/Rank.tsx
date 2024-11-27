import React, {useEffect, useState} from 'react';
import {
  Image,
  Text,
  View,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {ScreenProps} from '../../../App';
import {Header} from '../../components/common/Header';
import {palette} from '../../common/palette';
import {useModal} from '../../common/hooks';
import InfoModal from '../../components/common/InfoModal';
import {fontSize, setHeight, setWidth} from '../../common/deviceUtils';
import ScrollArea from '../../components/layout/ScrollArea';
import api from '../../common/api';
import Icon from 'react-native-vector-icons/FontAwesome';
import {getCurrentWeekNumber} from '../../common/utility';

const Rank: React.FC<ScreenProps> = ({navigation}) => {
  const {isVisible, openModal, closeModal} = useModal();
  const [rankInfo, setRankInfo] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [week, setWeek] = useState<number>(getCurrentWeekNumber());
  const maxWeek = getCurrentWeekNumber();
  const [error, setError] = useState<string | null>(null);

  const medalImages = [
    require('../../assets/newimages/1등.png'),
    require('../../assets/newimages/2등.png'),
    require('../../assets/newimages/3등.png'),
  ];

  const fetchRankData = async (weekNumber: number) => {
    setLoading(true);
    setError(null);
    try {
      let response;

      if (weekNumber === maxWeek) {
        response = await api<any>('get', '/rank/list', {});
      } else {
        response = await api<any>('get', '/rank/history', {
          week_number: weekNumber,
        });
      }

      console.log('Rank data:', response.data);

      // 데이터가 "RSLT_CD": "01"인 경우 데이터 없음으로 처리
      if (response.data?.RSLT_CD === '01') {
        setRankInfo([]);
        setError('해당 주차에 데이터가 없습니다.');
      } else {
        setRankInfo(response.data || []);
      }
    } catch (error: any) {
      setRankInfo([]);
      if (error.message === 'Network Error') {
        setError('네트워크 연결을 확인하세요.');
      } else {
        setError('해당 주차에 데이터가 없습니다');
      }
      console.warn('Warn fetching rank data null');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRankData(week);
  }, [week]);

  const goToPreviousWeek = () => {
    if (week > 1) {
      setWeek(prevWeek => prevWeek - 1);
    }
  };

  const goToNextWeek = () => {
    if (week < maxWeek) {
      setWeek(prevWeek => prevWeek + 1);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={palette.blue[600]} />
      </View>
    );
  }

  return (
    <View style={{flex: 10}}>
      <View style={{flex: 1}}>
        <Header
          centerIconProps={{
            iconName: 'null',
            iconType: 'AntDesign',
            imagePath: require('../../assets/newimages/rankhead.png'),
            size: setWidth(45),
          }}
        />
        <InfoModal isVisible={isVisible} onClose={closeModal}>
          <Text>{'랭크 정보'}</Text>
        </InfoModal>
      </View>

      <View
        style={{
          flex: 9,
          borderTopWidth: 0.5,
          borderTopColor: palette.gray[300],
        }}>
        <View style={styles.weekNavigation}>
          <TouchableOpacity onPress={goToPreviousWeek} style={styles.navIcon}>
            <Icon
              name="caret-left"
              size={setHeight(20)}
              color={palette.gray[600]}
            />
          </TouchableOpacity>
          <Text style={styles.weekDisplay}>{`${week}주`}</Text>
          <TouchableOpacity onPress={goToNextWeek} style={styles.navIcon}>
            <Icon
              name="caret-right"
              size={setHeight(20)}
              color={palette.gray[600]}
            />
          </TouchableOpacity>
        </View>

        {/* 데이터가 없거나 오류가 발생한 경우 메시지 표시 */}
        {error ? (
          <View style={styles.noDataContainer}>
            <Text style={styles.noDataText}>{error}</Text>
          </View>
        ) : (
          <>
            {/* 상위 3위 영역 */}
            <View style={styles.topThreeContainer}>
              {Array.isArray(rankInfo) &&
                rankInfo.slice(0, 3).map((rank: any, index: number) => (
                  <View key={rank.user_id} style={styles.topRankItem}>
                    <Image
                      source={medalImages[index]}
                      style={styles.rankImage}
                    />
                    <Text style={styles.rankName}>{rank.user_nickname}</Text>
                    <Text style={styles.rankTime}>
                      {rank.total_study_time} 분
                    </Text>
                  </View>
                ))}
            </View>

            <ScrollArea>
              <View style={styles.otherRanksContainer}>
                {Array.isArray(rankInfo) &&
                  rankInfo.slice(3).map((rank: any, index: number) => (
                    <View key={rank.user_id} style={styles.rankItem}>
                      <Text style={styles.rankPosition}>{index + 4}</Text>
                      <Text style={styles.rankName}>{rank.user_nickname}</Text>
                      <Text style={styles.rankTime}>
                        {rank.total_study_time} 분
                      </Text>
                    </View>
                  ))}
              </View>
            </ScrollArea>
          </>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  weekNavigation: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    backgroundColor: palette.gray[100],
  },
  navIcon: {
    paddingHorizontal: 15,
    marginHorizontal: 100,
  },
  topThreeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 20,
    paddingHorizontal: 10,
  },
  topRankItem: {
    alignItems: 'center',
  },
  rankImage: {
    width: setWidth(50),
    height: setHeight(50),
    resizeMode: 'contain',
    marginBottom: 10,
  },
  rankName: {
    fontSize: fontSize(40),
    fontWeight: 'bold',
    color: palette.gray[800],
    marginBottom: 5,
  },
  rankTime: {
    fontWeight: 'bold',
    fontSize: fontSize(50),
    color: palette.gray[600],
  },
  otherRanksContainer: {
    marginTop: 20,
    paddingHorizontal: 10,
  },
  rankItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: palette.gray[300],
  },
  rankPosition: {
    fontSize: 16,
    color: palette.gray[600],
  },
  weekDisplay: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  noDataContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noDataText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: palette.gray[500],
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: palette.gray[100], // 필요하면 배경색 추가
  },
});

export default Rank;
