import React, { useState } from 'react'; 
import { View, TextInput, Button, Text, StyleSheet, Alert } from 'react-native'; 
import { useNavigation } from '@react-navigation/native'; 
import { StackNavigationProp } from '@react-navigation/stack'; 
import { RootStackParamList } from '../../App';

type SignUpNicknameScreenProp = StackNavigationProp<RootStackParamList, 'SignUpNickname'>;

// 닉네임 입력 및 중복 확인
const SignUpNicknameScreen: React.FC = () => {
  const [nickname, setNickname] = useState('');
  const [nicknameCheckMessage, setNicknameCheckMessage] = useState<string | null>(null); 
  const navigation = useNavigation<SignUpNicknameScreenProp>();

  // 닉네임 중복 확인
  const checkNicknameDuplicate = async () => {
    try {
      const response = await fetch('백엔드서버 엔드포인트/닉네임중복확인', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nickname }), 
      });

      if (!response.ok) {
        throw new Error('서버 오류'); 
      }

      const result = await response.json();
      if (result.exists) {
        setNicknameCheckMessage('이미 사용 중인 닉네임입니다.'); 
      } else {
        setNicknameCheckMessage('사용 가능한 닉네임입니다.'); 
      }
    } catch (error) {
      console.error('닉네임 중복 확인 중 오류 발생:', error);
      setNicknameCheckMessage('닉네임 중복 확인에 실패했습니다.'); 
    }
  };

  // "다음" 버튼 클릭
  const handleNext = () => {
    if (!nicknameCheckMessage || nicknameCheckMessage === '이미 사용 중인 닉네임입니다.') {
      Alert.alert('닉네임 중복 확인을 해주세요.'); 
      return;
    }
  
    // 이메일을 state로 유지하고 SignUpEmail 화면으로 전달
    navigation.navigate('SignUpEmail', { email: '이메일주소' }); // 여기서 '이메일주소'를 적절한 이메일 값으로 대체해야 합니다.
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input} 
        placeholder="닉네임 입력" 
        value={nickname}
        onChangeText={(text) => setNickname(text)} 
      />

      <Button title="중복 확인" onPress={checkNicknameDuplicate} /> 
   
      {nicknameCheckMessage && <Text style={styles.message}>{nicknameCheckMessage}</Text>}

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
    color: 'red', 
    marginVertical: 10, 
  },
});

export default SignUpNicknameScreen; 
