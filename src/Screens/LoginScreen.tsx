import React, { useState } from 'react'; 
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native'; 
import { useNavigation, NavigationProp } from '@react-navigation/native'; // 네비게이션을 위한 훅 가져옴
import { RootStackParamList } from '../../App'; // 경로를 프로젝트에 맞게 수정하세요

const LoginScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const [userId, setUserId] = useState<string>('');  // 아이디를 저장
  const [password, setPassword] = useState<string>(''); // 비밀번호를 저장

  const correctUserId = 'myUserId'; // 아이디 백엔드로부터 받아오면 여기에 입력
  const correctPassword = 'myPassword'; // 비밀번호 백엔드로부터 받아오면 여기에 입력

  // 로그인 버튼을 눌렀을 때
  const handleLogin = () => {
    if (userId === '' || password === '') {
      Alert.alert('경고', '아이디 또는 패스워드를 다시 입력해 주십시오.');
    } else if (userId !== correctUserId || password !== correctPassword) {
      Alert.alert('경고', '아이디 또는 패스워드를 다시 입력해 주십시오.');
    } else {
      navigation.navigate('MainPageScreen');
    }
  };

  const handleSignUp = () => {
    navigation.navigate('SignUpId');
  };

  const handleFindMyId = () => {
    // 아이디 찾기 화면으로 이동
    navigation.navigate('FindMyId');
  };

  const handleFindMyPassword = () => {
    navigation.navigate('FindMyPassword');
  };

  return (
    <View style={styles.container}>
      {/* 로고 추가 */}
      <TextInput
        style={styles.input}
        placeholder="아이디 입력"
        value={userId}
        onChangeText={setUserId}
      />
      <TextInput
        style={styles.input}
        placeholder="비밀번호 입력"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <Button title="로그인" onPress={handleLogin} />
      <Button title="회원가입" onPress={handleSignUp} />
      
      {/* 아이디 찾기 */}
      <Button title="아이디 찾기" onPress={handleFindMyId} />
      <Button title="비밀번호 찾기" onPress={handleFindMyPassword} />
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

export default LoginScreen;
