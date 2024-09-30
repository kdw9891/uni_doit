// 로그인 - 아이디 찾기 페이지

import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack'; 
import { RootStackParamList } from '../../App'; 

type FindMyIdScreenProp = StackNavigationProp<RootStackParamList, 'FindMyId'>;

const FindMyIdScreen: React.FC = () => {
  const [email, setEmail] = useState<string>(''); // 이메일 저장
  const navigation = useNavigation<FindMyIdScreenProp>();

  const handleFindId = async () => {
    if (!email) {
      Alert.alert('경고', '이메일을 입력해 주세요.');
      return;
    }

    try {
      const response = await fetch('백엔드서버/아이디찾기', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const result = await response.json();
      if (result.success) {
        // 이메일과 찾은 아이디를 FindMyIdCompleteScreen으로 전달
        navigation.navigate('FindMyIdComplete', { email, id: result.id });
      } else {
        Alert.alert('경고', '이메일에 해당하는 아이디가 없습니다.');
      }
    } catch (error) {
      Alert.alert('오류', '아이디 찾기에 실패했습니다.');
      console.error('아이디 찾기 중 오류 발생:', error);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="이메일 입력"
        value={email}
        onChangeText={setEmail}
      />
      <Button title="다음" onPress={handleFindId} />
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

export default FindMyIdScreen;
