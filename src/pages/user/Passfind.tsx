import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Background } from '../../components/layout/Background';
import {Item} from '../../components/common/DynamicIcon';
import {palette} from '../../common/palette';
import {ScreenProps} from '../../../App';
import { API_HOST } from '@env';
import { globalContext } from '../../common/globalContext';


const Passfind:React.FC<ScreenProps> = ({navigation}) => {
  const [user_id, setuser_id] = useState('');
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const [confirmpassword, setconfirmpassword] = useState('');
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    globalContext.navigation = navigation;
    axios.defaults.baseURL = API_HOST;
  }, []);

  const validateForm = () => {

      if (!email.trim() || 
          !user_id.trim() || 
          !password.trim() || 
          !confirmpassword.trim()) 
     {
      Alert.alert('모든 항목을 입력해 주세요.');
      return false;
    }

    if (!/^[a-zA-Z0-9]{4,20}$/.test(user_id)) {
      Alert.alert('아이디는 4-20자의 영문과 숫자로만 입력해 주세요.');
      return false;
    }

    if (password.length < 6) {
      Alert.alert('비밀번호는 최소 6자 이상이어야 합니다.');
      return false;
    }

    if (password !== confirmpassword) {
      Alert.alert('비밀번호가 일치하지 않습니다.');
      return false;
    }

    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      Alert.alert('유효한 이메일 주소를 입력해 주세요.');
      return false;
    }

    return true;
  };

  const handleResetPassword = async () => {
    if (!validateForm()) return;
    
    setLoading(true);
    try {
      const response = await axios.post('http://138.2.41.118:9005/doit/user/passfind',
        {email, user_id, password}, {
        headers:{
          "Content-Type":"application/json",
        },
      }
    );

    const { RSLT_CD, Message } = response.data;

    if (response.status == 200) {
      Alert.alert('성공', Message || '비밀번호가 성공적으로 변경되었습니다.');
    } else {
      Alert.alert('오류', Message || '비밀번호를 재설정할 수 없습니다.');
      console.error('서버 처리 오류:', response.data);
    }
  } catch (error: any) {
    // 네트워크 오류 로그
    if (error.response) {
      // 서버에서 에러 응답을 보낸 경우
      console.error('서버 응답 상태 코드:', error.response.status);
      console.error('서버 에러 메시지:', error.response.data);
      Alert.alert('오류', ` ${error.response.data.Message || '사용자 정보를 찾을 수 없습니다.'}`);
    } else if (error.request) {
      // 요청이 서버에 도달하지 못한 경우
      console.error('요청이 서버에 도달하지 못했습니다:', error.request);
      Alert.alert('오류', '서버와 연결할 수 없습니다. 인터넷 연결을 확인하세요.');
    } else {
      // 요청 설정 중 에러가 발생한 경우
      console.error('요청 설정 중 에러:', error.message);
      Alert.alert('오류', `요청 에러: ${error.message}`);
    }
  } finally {
    setLoading(false);
  }
};

  const userIdRef = useRef<TextInput>(null);
  const emailRef = useRef<TextInput>(null);
  const passwordRef = useRef<TextInput>(null); 
  const confirmPasswordRef = useRef<TextInput>(null); 
  

  return (
    <Background>
    <View style={styles.container}>
        <TouchableOpacity style={styles.backButton}>
        <Item iconType={'Feather'}
            iconName={'chevron-left'}
            iconColor={palette.gray[800]}
            path="Login"/>
      </TouchableOpacity>
      <Text style={styles.title}>비밀번호 재설정</Text>
      <TextInput
        style={styles.input}
        placeholder="아이디"
        value={user_id}
        onChangeText={setuser_id}
        autoCapitalize="none"
        ref={userIdRef}
        returnKeyType="next"
        onSubmitEditing={() => emailRef.current?.focus()}
      />
      <TextInput
        style={styles.input}
        placeholder="이메일"
        value={email}
        onChangeText={setemail}
        keyboardType="email-address"
        autoCapitalize="none"
        ref={emailRef}
        returnKeyType="next"
        onSubmitEditing={() => passwordRef.current?.focus()}
      />
      <TextInput
        style={styles.input}
        placeholder="비밀번호"
        value={password}
        secureTextEntry={true}
        onChangeText={setpassword}
        autoCapitalize="none"
        ref={passwordRef} 
        returnKeyType="next" 
        onSubmitEditing={() => confirmPasswordRef.current?.focus()}
      />
      <TextInput
        style={styles.input}
        placeholder="비밀번호 확인"
        secureTextEntry={true}
        value={confirmpassword}
        onChangeText={setconfirmpassword}
        autoCapitalize="none"
        ref={confirmPasswordRef} 
        returnKeyType="done" 
      />
      <TouchableOpacity style={styles.button} onPress={handleResetPassword}>
        <Text style={styles.buttonText}>비밀번호 변경</Text>
      </TouchableOpacity>
    </View>
    </Background>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f9f9f9',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 50,
  },
  backButton: {
    position: 'absolute',
    top: 10,
    left: 10,
    zIndex: 1,
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 20,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#4a90e2',
    paddingVertical: 15,
    width: '100%',
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 15,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Passfind;
