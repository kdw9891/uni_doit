import React from 'react';
import {View} from 'react-native';
import {ScreenProps} from '../../../App';
import LottieView from 'lottie-react-native';

const Loading: React.FC<ScreenProps> = ({navigation}) => {
  const handleFinish = () => {
    navigation.navigate('Home');
  };

  return (
    <View
      style={{flex: 1, height: '100%', alignItems: 'center', justifyContent: 'center'}}>
      <LottieView
        style={{width: '100%', height: '100%'}}
        source={require('../../assets/lottie/Doit Splash.json')}
        autoPlay
        loop={false}
        onAnimationFinish={handleFinish}
      />
    </View>
  );
};

export default Loading;
