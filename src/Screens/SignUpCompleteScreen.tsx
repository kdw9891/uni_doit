import React from 'react'; 
import { View, Text, Button, StyleSheet, Image } from 'react-native'; 
import { useNavigation, NavigationProp } from '@react-navigation/native'; // 네비게이션을 위한 훅 가져옴
import { RootStackParamList } from '../../App';

// 회원가입 완료 화면 
const SignUpCompleteScreen: React.FC = () => {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  // "로그인 페이지로 이동" 버튼을 눌렀을 때 
  const handleGoToLogin = () => {
    navigation.navigate('Login'); 
  };

  return (
    
    <View style={styles.container}>
      {/* 사진추가는 여기에 하시길 */}
      {/* <Image source={require('사진추가여기에!!')} style={styles.image} /> */}

      <Text style={styles.text}>회원가입이 완료되었습니다.</Text>

      <Button title="로그인 페이지로 이동" onPress={handleGoToLogin} />
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    paddingHorizontal: 20, 
  },
  text: {
    fontSize: 20, 
    marginBottom: 20, 
  },
  image: {

  },
});

export default SignUpCompleteScreen;
