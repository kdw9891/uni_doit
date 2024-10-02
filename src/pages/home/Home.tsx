import React from 'react';
import {View} from 'react-native';
import {ScreenProps} from '../../../App';
import {Header} from './Header';
import {Text} from 'react-native';

const Home: React.FC<ScreenProps> = ({navigation}) => {
  return (
    <>
      <View style={{flex: 9}}>
        <View style={{flex: 1, alignItems: 'center'}}>
          <Header title="DOIT" />
        </View>
        <View style={{flex: 8, justifyContent: 'center'}}>
          <Text>{'123'}</Text>
        </View>
      </View>
    </>
  );
};

export default Home;
