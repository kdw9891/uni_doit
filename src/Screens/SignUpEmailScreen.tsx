import React, { useState } from 'react'; 
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native'; 
import { useNavigation } from '@react-navigation/native'; 
import { StackNavigationProp } from '@react-navigation/stack'; 
import { RootStackParamList } from '../../App';

type SignUpEmailScreenProp = StackNavigationProp<RootStackParamList, 'SignUpEmail'>;

// 이메일 입력 화면 
const SignUpEmailScreen: React.FC = () => {
  const [email, setEmail] = useState(''); // 사용자가 입력한 이메일을 저장
  const navigation = useNavigation<SignUpEmailScreenProp>(); 

  // "다음" 버튼을 눌렀을 때 
  const handleNext = async () => {
    // 이메일 유효성 검사
    if (!/\S+@\S+\.\S+/.test(email)) {
      Alert.alert('유효한 이메일을 입력하세요.'); 
      return;
    }

    // 이메일이 유효할 때, 백엔드로 이메일 저장
    try {
      const response = await fetch('백엔드서버/이메일저장', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }), // 이메일을 JSON 형태로 전송
      });

      if (!response.ok) {
        throw new Error('이메일 저장에 실패했습니다.');
      }

      // 이메일 저장 성공 시 회원가입 완료 페이지로 이동
      navigation.navigate('SignUpComplete'); 
    } catch (error) {
      // error가 Error 객체인지 확인
      const errorMessage = error instanceof Error ? error.message : '알 수 없는 오류가 발생했습니다.';
      Alert.alert('저장 실패', errorMessage);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input} 
        placeholder="이메일 입력" 
        value={email} 
        onChangeText={(text) => setEmail(text)} 
        keyboardType="email-address"
      />

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
});

export default SignUpEmailScreen; 
