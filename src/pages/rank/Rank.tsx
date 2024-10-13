import React, {useEffect, useState} from 'react';
import {Image, Text, View, ActivityIndicator, StyleSheet} from 'react-native';
import {ScreenProps} from '../../../App';
import {Header} from '../../components/common/Header';
import {palette} from '../../common/palette';
import {useModal} from '../../common/hooks';
import InfoModal from '../../components/common/InfoModal';
import {setHeight, setWidth} from '../../common/deviceUtils';
import rankData from './RankData';
import ScrollArea from '../../components/layout/ScrollArea';

const Rank: React.FC<ScreenProps> = ({navigation}) => {
  const {isVisible, openModal, closeModal} = useModal();
  const [rankInfo, setRankInfo] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchRankData = async () => {
      try {
        // 실제 API 호출 부분입니다.
        // const result = await useApi('post', '/rank', null);
        // setRankInfo(result.data);

        //  더미데이터 사용
        setRankInfo(rankData);
      } catch (error) {
        console.error('Error fetching rank data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRankData();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color={palette.blue[600]} />;
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
          rightIconProps={{
            iconType: 'FontAwesome',
            iconName: 'info',
            color: palette.gray[800],
            size: setWidth(30),
            onPress: openModal,
          }}
        />
        <InfoModal isVisible={isVisible} onClose={closeModal}>
          <Text>{'랭크 정보'}</Text>
        </InfoModal>
      </View>

      <View style={{flex: 9}}>
        {/* 상위 3위 영역 */}
        <View style={styles.topThreeContainer}>
          {rankInfo.ranks.slice(0, 3).map((rank: any, index: number) => (
            <View key={rank.id} style={styles.topRankItem}>
              <Image source={rank.rankImage} style={styles.rankImage} />
              <Text style={styles.rankName}>{rank.name}</Text>
              <Text style={styles.rankTime}>{rank.time}</Text>
            </View>
          ))}
        </View>

        {/* 나머지 순위 영역 */}
        <ScrollArea>
          <View style={styles.otherRanksContainer}>
            {rankInfo.ranks.slice(3).map((rank: any, index: number) => (
              <View key={rank.id} style={styles.rankItem}>
                <Text style={styles.rankPosition}>{index + 4}</Text>
                <Text style={styles.rankName}>{rank.name}</Text>
                <Text style={styles.rankTime}>{rank.time}</Text>
              </View>
            ))}
          </View>
        </ScrollArea>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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
    fontSize: 18,
    fontWeight: 'bold',
    color: palette.gray[800],
    marginBottom: 5,
  },
  rankTime: {
    fontSize: 16,
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
});

export default Rank;
