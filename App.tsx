import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './src/Screens/LoginScreen'; // 로그인 화면
import SignUpIdScreen from './src/Screens/SignUpIdScreen'; // 아이디 입력 화면
import SignUpPasswordScreen from './src/Screens/SignUpPasswordScreen'; // 비밀번호 입력 화면
import SignUpEmailScreen from './src/Screens/SignUpEmailScreen'; // 이메일 입력 화면
import SignUpNicknameScreen from './src/Screens/SignUpNicknameScreen'; // 닉네임 입력 화면
import SignUpCompleteScreen from './src/Screens/SignUpCompleteScreen'; // 회원가입 성공 화면
import FindMyIdScreen from './src/Screens/FindMyIdScreen'; // 아이디 찾기 화면
import FindMyIdCompleteScreen from './src/Screens/FindMyIdCompleteScreen'; // 아이디 찾기 완료 화면 추가
import FindMyPasswordScreen from './src/Screens/FindMyPasswordScreen'; // 비밀번호 찾기 화면
import MainPageScreen from './src/Screens/MainPageScreen'; // 메인 페이지

// 네비게이션 스택에 사용할 타입 정의
export type RootStackParamList = {
  Login: undefined;
  SignUpId: { email: string }; // 이메일을 전달하기 위한 타입
  SignUpEmail: undefined;
  SignUpPassword: { email: string }; // 이메일을 전달하기 위한 타입
  SignUpNickname: undefined;
  SignUpComplete: undefined;
  FindMyId: { email: string }; // 이메일을 전달하기 위한 타입
  FindMyIdComplete: { email: string; id: string }; // 찾은 아이디를 전달하기 위한 타입
  FindMyPassword: undefined;
  MainPageScreen: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="SignUpId" component={SignUpIdScreen} />
        <Stack.Screen name="SignUpPassword" component={SignUpPasswordScreen} />
        <Stack.Screen name="SignUpEmail" component={SignUpEmailScreen} />
        <Stack.Screen name="SignUpNickname" component={SignUpNicknameScreen} />
        <Stack.Screen name="SignUpComplete" component={SignUpCompleteScreen} />
        <Stack.Screen name="FindMyId" component={FindMyIdScreen} />
        <Stack.Screen name="FindMyIdCompleteScreen" component={FindMyIdCompleteScreen} /> {/* 추가 */}
        <Stack.Screen name="FindMyPassword" component={FindMyPasswordScreen} />
        <Stack.Screen name="MainPageScreen" component={MainPageScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
