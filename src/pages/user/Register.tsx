import React, {useEffect, useRef} from 'react';
import {View, Text, Alert, StyleSheet, TouchableOpacity, Image, TextInput} from 'react-native';
import {ScreenProps} from '../../../App';
import api from '../../common/api';
import Input from '../../components/common/Input';
import {useFormRef} from '../../common/hooks';
import {globalContext} from '../../common/globalContext';
import axios from 'axios';
import {API_HOST} from '@env';
import {isNullOrWhitespace} from '../../common/utility';
import {Background} from '../../components/layout/Background';
import ScrollArea from '../../components/layout/ScrollArea';
import {Item} from '../../components/common/DynamicIcon';
import {palette} from '../../common/palette';


const Register: React.FC<ScreenProps> = ({navigation}) => {
  const [form, setForm] = useFormRef();

  useEffect(() => {
    globalContext.navigation = navigation;
    axios.defaults.baseURL = API_HOST;
  }, []);

  const validateForm = () => {
    const {user_id, password, confirmPassword, user_nickname, email} =
      form['data'];

    if (
      isNullOrWhitespace(user_id) ||
      isNullOrWhitespace(password) ||
      isNullOrWhitespace(confirmPassword) ||
      isNullOrWhitespace(user_nickname) ||
      isNullOrWhitespace(email)
    ) {
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

    if (password !== confirmPassword) {
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

  const register = async () => {
    if (!validateForm()) return;

    try {
      const requestData =form['data']; 
      delete requestData.confirmPassword;
      
      const data = await axios.post('http://138.2.41.118:9005/doit/user/register', 
        {user_id:form['data'].user_id,
          password:form['data'].password,
          user_nickname:form['data'].user_nickname,
          email:form['data'].email,
        }, {
        headers:{
          "Content-Type":"application/json",
        },
      }
    );
    console.log(data.data);
      

      if (data.status === 200) {
        Alert.alert('회원가입 성공', '환영합니다!');
        navigation.navigate('Login');
      }
    } catch (error: any) {
      if (error.response) {
        console.log('서버 응답:', error.response.data);
        console.log('HTTP 상태 코드:', error.response.status);
        console.log('Registration data:', form[0]);
        Alert.alert('오류', error.response.data.message || '회원가입에 실패했습니다.');
      } else {
        console.error('네트워크 오류:', error.message);
        Alert.alert('오류', '서버에 연결할 수 없습니다.');
      }
    }
  };

  const userIdRef = useRef<TextInput>(null); 
  const passwordRef = useRef<TextInput>(null); 
  const confirmPasswordRef = useRef<TextInput>(null); 
  const nicknameRef = useRef<TextInput>(null); 
  const emailRef = useRef<TextInput>(null);

  return (
    <Background>
      <ScrollArea>
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton}>
        <Item iconType={'Feather'}
            iconName={'chevron-left'}
            iconColor={palette.gray[800]}
            path="Login"/>
      </TouchableOpacity>
    <View style={{flex:3, alignItems: 'center'}}>
      <Image
            source={require('../../assets/images/doit_logo.png')}
            style={{
              marginTop:-50,
              marginBottom:-90,
              width: '50%',
              justifyContent: 'center',
              resizeMode: 'contain',
            }}
          />
          </View>
      <View style={{flex:7}}>
        <Input
          style={styles.input}
          name="user_id"
          placeholder="아이디"
          form={form}
          required={true}
          keyboardType="ascii-capable"
          autoCapitalize="none"
          ref={userIdRef}
          returnKeyType="next"
            onSubmitEditing={() => passwordRef.current?.focus()}
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
          ref={passwordRef} 
          returnKeyType="next" 
          onSubmitEditing={() => confirmPasswordRef.current?.focus()}
        />

        <Input
          style={styles.input}
          name="confirmPassword"
          placeholder="비밀번호 확인"
          form={form}
          required={true}
          secureTextEntry={true}
          keyboardType="ascii-capable"
          autoCapitalize="none"
          ref={confirmPasswordRef} 
          returnKeyType="next" 
          onSubmitEditing={() => nicknameRef.current?.focus()}
        />

        <Input
          style={styles.input}
          name="user_nickname"
          placeholder="닉네임"
          form={form}
          required={true}
          keyboardType="default"
          autoCapitalize="none"
          ref={nicknameRef} 
          returnKeyType="next" 
          onSubmitEditing={() => emailRef.current?.focus()}
        />

        <Input
          style={styles.input}
          name="email"
          placeholder="이메일"
          form={form}
          required={true}
          keyboardType="email-address"
          autoCapitalize="none"
          error={'이메일을 입력하세요'}
          ref={emailRef}
          returnKeyType="done"
        />

        <TouchableOpacity style={styles.button} onPress={register}>
          <Text style={styles.buttonText}>회원가입</Text>
        </TouchableOpacity>
      </View>
    </View>
    </ScrollArea>
    </Background>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 10,
    justifyContent: 'center',
    paddingHorizontal: 30,
    backgroundColor: '#f5f7fa',
  },
  backButton: {
    position: 'absolute',
    top: 10,
    left: 10,
    zIndex: 1,
  },
  input: {
    width: '100%',
    marginBottom: 20,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    backgroundColor: '#f5f7fa',
  },
  button: {
    width: '100%',
    backgroundColor: '#4a90e2',
    borderRadius: 5,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Register;
