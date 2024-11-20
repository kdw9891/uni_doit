import React, {useEffect} from 'react';
import {
  View,
  Text,
  Alert,
  Button,
  StyleSheet,
  TouchableOpacity,
  Image
} from 'react-native';
import {ScreenProps} from '../../../App';
import api from '../../common/api';
import Input from '../../components/common/Input';
import {useFormRef} from '../../common/hooks';
import {globalContext} from '../../common/globalContext';
import axios from 'axios';
import {API_HOST} from '@env';
import {isNullOrWhitespace} from '../../common/utility';
import {Background} from '../../components/layout/Background';

const Login: React.FC<ScreenProps> = ({navigation}) => {
  const [form, setForm] = useFormRef();

  useEffect(() => {
    globalContext.navigation = navigation;
    axios.defaults.baseURL = API_HOST;
  }, []);

  const validateForm = () => {
    const {user_id, password} = form['data'];

    if (isNullOrWhitespace(user_id) || isNullOrWhitespace(password)) {
      Alert.alert('아이디와 비밀번호를 모두 입력해 주세요.');
      return false;
    }
    return true;
  };

  const login = async () => {
    if (!validateForm()) return;

    try {
      const data = await api('get', '/user/login', form['data']);
      console.log('Login data:', data);

      if (data.status === 200) {
        Alert.alert('로그인 성공', '환영합니다!');
        navigation.navigate('Home'); // 성공 시 홈 화면으로 이동
      }
    } catch (error) {
      console.error('Login error:', error);
      Alert.alert('로그인 실패', '아이디 또는 비밀번호가 잘못되었습니다.');
    }
  };

  return (
    <Background>
    <View style={styles.container}>
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

      <View style={styles.linkContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('Idfind')}>
          <Text style={styles.linkText}>아이디 찾기</Text>
        </TouchableOpacity>
        <Text style={styles.separator}>|</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Passfind')}>
          <Text style={styles.linkText}>비밀번호 찾기</Text>
        </TouchableOpacity>
      </View>
    </View>
    </Background>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
    backgroundColor: '#f5f7fa',
  },
  logo:{
    height:'20%',
    width: '60%',
    justifyContent: 'center',
    resizeMode: 'contain',
    marginBottom:30,
  },
  input: {
    width: '100%',
    marginBottom: 20,
    borderRadius: 5,
    backgroundColor: '#f5f7f',
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
    marginTop: 30,
    marginBottom: 20,
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
