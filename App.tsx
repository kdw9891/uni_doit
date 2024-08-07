import React from 'react';

import {fontPercentage} from './src/common/deviceUtils';
import {palette} from './src/common/palette';
import {createStackNavigator} from '@react-navigation/stack';
import {StackNavigationProp} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import {HeaderButton} from './src/components/layout/Header';

import headerStyles from './src/components/layout/HeaderStyles';

import Dev1 from './src/pages/Dev1';
import Dev2 from './src/pages/Dev2';
import Dev3 from './src/pages/Dev3';
import Dev4 from './src/pages/Dev4';

export type ScreenProps = {
  route: any;
  navigation: StackNavigationProp<any>;
};

const Stack = createStackNavigator<any>();

const MenuItem = (name: string, component: any, title?: string) => {
  return (
    <Stack.Screen
      name={name}
      component={component}
      options={({navigation}) => ({
        headerShown: true,
        title: title,
        headerBackTitleVisible: false,
        headerRight: () => (
          <HeaderButton navigation={navigation} home={false} />
        ),
      })}
    />
  );
};

function App(): React.JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Dev1"
        screenOptions={{
          headerStyle: headerStyles.headerColor,
          headerTintColor: palette.white,
          headerTitleStyle: {fontWeight: 'bold', fontSize: fontPercentage(50)},
        }}>
        {MenuItem('Dev1', Dev1, '개발자용1')}
        {MenuItem('Dev2', Dev2, '개발자용2')}
        {MenuItem('Dev3', Dev3, '개발자용3')}
        {MenuItem('Dev4', Dev4, '개발자용4')}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
