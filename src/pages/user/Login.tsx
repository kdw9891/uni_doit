import React, {useEffect} from 'react';
import {View, Text, Alert, StyleSheet, TouchableOpacity, Image, KeyboardAvoidingView, ScrollView, Platform} from 'react-native';
import {ScreenProps} from '../../../App';
import api from '../../common/api';
import Input from '../../components/common/Input';
import {useFormRef} from '../../common/hooks';
import {globalContext} from '../../common/globalContext';
import axios from 'axios';
import {API_HOST} from '@env';
import {isNullOrWhitespace} from '../../common/utility';
import {Background} from '../../components/layout/Background';

interface LoginResponse {
  user_id: string;
  user_nickname: string;
  auth_token: string;
  email: string;
  use_yn: string;
}

const Login: React.FC<ScreenProps> = ({navigation}) => {
  const [form, setForm] = useFormRef();

  useEffect(() => {
    globalContext.navigation = navigation;
    axios.defaults.baseURL = API_HOST;
  }, []);

  const validateForm = () => {
    const {user_id, password} = form['data'];

    if (isNullOrWhitespace(user_id) || isNullOrWhitespace(password)) {
      Alert.alert('아이디와 비밀번호 입력해 주세요.');
      return false;
    }
    return true;
  };

  const login = async () => {
    if (!validateForm()) return;

    try {
      const response = await api<LoginResponse>(
        'get',
        '/user/login',
        form['data'],
      ); // 타입 추가
      console.log('Login response:', response);

      if (response && response.status === 200) {
        const {user_id, user_nickname, auth_token} = response.data;
        console.log(
          `User ID: ${user_id}, Nickname: ${user_nickname}, Token: ${auth_token}`,
        );

        if (user_id) {
          Alert.alert('로그인 성공', `환영합니다, ${user_nickname}!`);
          navigation.navigate('Home');
        } else {
          Alert.alert('로그인 실패', '아이디 또는 비밀번호가 잘못되었습니다.');
        }
      } else {
        Alert.alert('로그인 실패', '올바르지 않은 상태 코드');
      }
    } catch (error) {
      Alert.alert('로그인 실패', '네트워크 오류가 발생했습니다.');
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView
        contentContainerStyle={styles.contentContainer}
        keyboardShouldPersistTaps="handled">
        <Background>
          <View style={styles.innerContainer}>
            <Image
              source={require('../../assets/images/doit_logo.png')}
              style={styles.logo}
            />
            <Input
              style={styles.input}
              name="user_id"
              placeholder="아이디"
              form={form}
              required={true}
              keyboardType="ascii-capable"
              autoCapitalize="none"
            />

            <Input
              style={styles.input}
              name="password"
              placeholder="비밀번호"
              form={form}
              required={true}
              secureTextEntry={true}
              keyboardType="ascii-capable"
              autoCapitalize="none"
            />

            <TouchableOpacity style={styles.loginButton} onPress={login}>
              <Text style={styles.loginButtonText}>로그인</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.registerButton}
              onPress={() => navigation.navigate('Register')}>
              <Text style={styles.registerButtonText}>회원가입</Text>
            </TouchableOpacity>

            {/* <View style={styles.linkContainer}>
              <TouchableOpacity onPress={() => navigation.navigate('Idfind')}>
                <Text style={styles.linkText}>아이디 찾기</Text>
              </TouchableOpacity>
              <Text style={styles.separator}>|</Text>
              <TouchableOpacity onPress={() => navigation.navigate('Passfind')}>
                <Text style={styles.linkText}>비밀번호 찾기</Text>
              </TouchableOpacity>
            </View> */}
          </View>
        </Background>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    flexGrow: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    paddingHorizontal: 30,
    paddingTop: 20,
    backgroundColor: '#fff',
  },
  innerContainer: {
    width: '100%',
    alignItems: 'flex-start',
    backgroundColor: '#fff',
  },
  logo: {
    alignSelf: 'center',
    height: 70,
    width: 150,
    resizeMode: 'contain',
    marginBottom: 30,
  },
  input: {
    width: '100%',
    marginBottom: 20,
    borderRadius: 5,
  },
  loginButton: {
    backgroundColor: '#4a90e2',
    borderRadius: 5,
    paddingVertical: 12,
    alignItems: 'center',
    width: '100%',
    marginBottom: 20,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  linkContainer: {
    flexDirection: 'row',
    marginTop: 20,
    marginBottom: 20,
    alignSelf: 'flex-start',
  },
  linkText: {
    color: '#4a90e2',
    fontSize: 14,
  },
  separator: {
    marginHorizontal: 10,
    color: '#aaa',
    fontSize: 14,
  },
  registerButton: {
    backgroundColor: '#fff',
    borderColor: '#4a90e2',
    borderWidth: 1,
    borderRadius: 5,
    paddingVertical: 12,
    alignItems: 'center',
    width: '100%',
  },
  registerButtonText: {
    color: '#4a90e2',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Login;
