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
import {palette} from '../../common/palette';
import {fontSize, fontStyle, setHeight} from '../../common/deviceUtils';
import api from '../../common/api';
import Input from '../../components/common/Input';
import {useFormRef} from '../../common/hooks';
import { onPressBackBtn } from '../../common/physicalBackBtn';
import { globalContext } from '../../common/globalContext';
import axios from 'axios';
import { API_HOST } from '@env';
import { fromStorage } from '../../common/utility';

const Login: React.FC<ScreenProps> = ({navigation}) => {
  const [form, setForm] = useFormRef();

  useEffect(() => {
    onPressBackBtn(true);

    globalContext.navigation = navigation;
    axios.defaults.baseURL = API_HOST;

  }, []);

  const result = async () => {
    const data = await api('get', '/user/login', form['data']);
    console.log("data", data);
    console.log("form", form['data']);
  }

  return (
    <>
      <View
        style={{
          flex: 1,
          width: '100%',
          height: '100%',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Input
          style={{width: '80%', marginBottom: setHeight(20)}}
          name={'user_id'}
          placeholder={'ID'}
          form={form}
          required={true}
          onPress={() => {}}
          keyboardType="ascii-capable"
          autoCapitalize="none"
        />
        <Input
          style={{width: '80%', marginBottom: setHeight(20)}}
          name={'password'}
          placeholder={'Password'}
          form={form}
          required={true}
          onPress={() => {}}
          keyboardType="ascii-capable"
          autoCapitalize="none"
          secureTextEntry={true}
        />
        <Button title="Login" onPress={() => result()} />
      </View>
    </>
  );
};

export default Login;
