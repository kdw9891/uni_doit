// 로그인 - 아이디 찾기 성공 페이지

import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useNavigation, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack'; 
import { RootStackParamList } from '../../App';

type FindMyIdCompleteScreenProp = StackNavigationProp<RootStackParamList, 'FindMyIdComplete'>;
type FindMyIdCompleteScreenRouteProp = RouteProp<RootStackParamList, 'FindMyIdComplete'>;

const FindMyIdCompleteScreen: React.FC<{ route: FindMyIdCompleteScreenRouteProp }> = ({ route }) => {
  const navigation = useNavigation<FindMyIdCompleteScreenProp>();
  const { email, id } = route.params; // route.params에서 email과 id를 가져옴

  return (
    <View style={styles.container}>
      <Text style={styles.email}>{email}</Text>
      <Text style={styles.idMessage}>{`\n${id} 입니다.`}</Text>

      <View style={styles.buttonContainer}>
        <Button title="로그인 페이지로 이동" onPress={() => navigation.navigate('Login')} />
        <Button title="비밀번호 찾기" onPress={() => navigation.navigate('FindMyPassword')} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center', // 중앙 정렬
    paddingHorizontal: 20,
  },
  email: {
    fontSize: 18,
    marginBottom: 10,
  },
  idMessage: {
    fontSize: 20,
    textAlign: 'center',
    marginVertical: 20,
  },
  buttonContainer: {
    flexDirection: 'row', // 버튼을 가로로 나열
    justifyContent: 'space-around',
    width: '100%', // 화면 가로 전체 사용
  },
});

export default FindMyIdCompleteScreen;
