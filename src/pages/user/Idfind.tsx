import React, {useState, useEffect} from 'react';
import {View, Text, Alert, TouchableOpacity, StyleSheet, TextInput, ActivityIndicator} from 'react-native';
import {useFormRef} from '../../common/hooks';
import { globalContext } from '../../common/globalContext';
import axios from 'axios';
import { API_HOST } from '@env';
import {ScreenProps} from '../../../App';
import {Background} from '../../components/layout/Background';
import api from '../../common/api';
import {Item} from '../../components/common/DynamicIcon';
import {palette} from '../../common/palette';

const IdFind: React.FC<ScreenProps> = ({navigation}) => {
  const [email, setEmail] = useState<string>(''); // 이메일 입력 상태
  const [loading, setLoading] = useState<boolean>(false); // 로딩 상태
  const [userId, setUserId] = useState<string | null>(null); // 결과로 받은 user_id

  interface ApiResponse {
    status: number;
    user_id: string;
  }
  

  useEffect(() => {
    globalContext.navigation = navigation;
    axios.defaults.baseURL = API_HOST;
  }, []);

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  const findUserIdByEmail = async (email: string) => {
    if (!email) {
      Alert.alert('오류', '이메일을 입력해주세요.');
      return;
    }
    if (!validateEmail(email)) {
      Alert.alert('오류', '올바른 이메일 형식을 입력해주세요.');
      return;
    }

    // 이메일 형식 검증
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      Alert.alert('오류', '유효한 이메일 주소를 입력해 주세요.');
      return;
    }

    try {
      setLoading(true); // 로딩 시작

      console.log('전송된 데이터:', { email });
      const url = `${API_HOST}/user/idfind`;
       console.log('Request URL:', url);


      const response = await api<ApiResponse>('post', '${API_HOST}/user/idfind', email);

      // 서버 응답 처리
      if (response.status === 200 && response.data.user_id) {
        setUserId(response.data.user_id);
        Alert.alert('아이디 찾기 성공', `회원님의 아이디는 ${response.data.user_id}입니다.`);
      } else {
        Alert.alert('오류', '등록된 이메일이 없습니다.');
        setUserId(null);
      }
    } catch (error: any) {
      // 오류 정보 출력
      console.error('아이디 찾기 실패:', error);
  
      if (error.response) {
        console.log('서버 응답 상태 코드:', error.response.status);
        console.log('서버 응답 데이터:', error.response.data);
      } else if (error.request) {
        console.log('요청 객체:', error.request);
      } else {
        console.log('요청 설정 오류:', error.message);
      }
  
      Alert.alert('오류', '서버와 통신 중 문제가 발생했습니다.');
    } finally {
      setLoading(false); // 로딩 종료
    }
  };

  return (
    <Background>
      <View style={styles.container}>
      <TouchableOpacity style={styles.backButton}>
        <Item iconType={'Feather'}
            iconName={'chevron-left'}
            iconColor={palette.gray[800]}
            path="Login"/>
      </TouchableOpacity>
      <Text style={styles.title}>아이디 찾기</Text>
      <TextInput
        style={styles.input}
        placeholder="이메일을 입력하세요"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />
      <TouchableOpacity
        style={[styles.button, loading && styles.buttonDisabled]}
        onPress={() => findUserIdByEmail(email)}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>아이디 찾기</Text>
        )}
      </TouchableOpacity>
      {userId && (
        <Text style={styles.resultText}>조회된 아이디: {userId}</Text>
      )}
    </View>
    </Background>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#f9f9f9',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
  },
  backButton: {
    position: 'absolute',
    top: 10,
    left: 10,
    zIndex: 1,
  },
  input: {
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 30,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#4a90e2',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonDisabled: {
    backgroundColor: '#aac8ff',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  resultText: {
    marginTop: 20,
    fontSize: 16,
    textAlign: 'center',
    color: '#333',
  },
});

export default IdFind;
