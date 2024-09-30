import React from 'react';
import {ScreenProps} from '../../App';
import {Button, View} from 'react-native';

const Dev1: React.FC<ScreenProps> = ({navigation}) => {
  return (
    <>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          width: '100%',
          height: '100%',
          justifyContent: 'space-evenly',
          alignItems: 'center',
        }}>
        <Button
          title="Go to Dev2"
          onPress={() => navigation.navigate('Dev2')}
        />
        <Button
          title="Go to Dev3"
          onPress={() => navigation.navigate('Dev3')}
        />
        <Button
          title="Go to Dev4"
          onPress={() => navigation.navigate('Dev4')}
        />
      </View>
    </>
  );
};

export default Dev1;
