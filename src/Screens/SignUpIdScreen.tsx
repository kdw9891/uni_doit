import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack'; 
import { RootStackParamList } from '../../App';

type SignUpIdScreenProp = StackNavigationProp<RootStackParamList, 'SignUpId'>;

const SignUpIdScreen: React.FC = () => {
  const [id, setId] = useState('');
  const [idCheckMessage, setIdCheckMessage] = useState<string | null>(null);
  const [isIdChecked, setIsIdChecked] = useState(false); 

  const navigation = useNavigation<SignUpIdScreenProp>();

  const checkIdDuplicate = async () => {
    try {
      const response = await fetch('http://138.2.41.118:9005/DOIT/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });

      const result = await response.json();
      if (result.exists) {
        setIdCheckMessage('이미 사용 중인 아이디입니다.');
        setIsIdChecked(false);
      } else {
        setIdCheckMessage('사용 가능한 아이디입니다.');
        setIsIdChecked(true); 
      }
    } catch (error) {
      console.error('아이디 중복 확인 중 오류 발생:', error);
      setIdCheckMessage('아이디 중복 확인에 실패했습니다.');
      setIsIdChecked(false);
    }
  };
  
  const handleNext = async () => {
    if (!isIdChecked || idCheckMessage !== '사용 가능한 아이디입니다.') {
      Alert.alert('아이디 중복 확인을 해주세요.');
      return;
    }

    try {
      await fetch('http://138.2.41.118:9005/DOIT/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),  
      });

      // 비밀번호 설정 페이지로 이동
      navigation.navigate('SignUpPassword', { email }); 
    } catch (error) {
      Alert.alert('저장 실패', '아이디 등록에 실패했습니다.');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="아이디 입력"
        value={id}
        onChangeText={(text) => {
          setId(text);
          setIsIdChecked(false); 
        }}
      />
      <Button title="중복 확인" onPress={checkIdDuplicate} />
      {idCheckMessage && (
        <Text style={[styles.message, idCheckMessage.includes('가능') ? styles.success : styles.error]}>
          {idCheckMessage}
        </Text>
      )}
      <Button title="다음" onPress={handleNext} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  input: {
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
    fontSize: 16,
  },
  message: {
    marginVertical: 10,
    fontSize: 14,
  },
  success: {
    color: 'green',
  },
  error: {
    color: 'red',
  },
});


export default SignUpIdScreen;
