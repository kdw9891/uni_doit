import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator, StackNavigationProp} from '@react-navigation/stack';

import Login from './src/pages/user/Login';

import ItemStore from './src/pages/store/ItemStore';

import Home from './src/pages/home/Home';
import Loading from './src/pages/Loading/Loading';
import Store from './src/pages/store/Store';
import Inventory from './src/pages/Inventory/Inventory';
import TodoList from './src/pages/todo/TodoList';
import Rank from './src/pages/rank/Rank';

export type ScreenProps = {
  route: any;
  navigation: StackNavigationProp<any>;
};

const Stack = createStackNavigator();

const ScreenItem = (
  name: string,
  component: any,
  title?: string,
  shown?: boolean,
) => {
  return (
    <Stack.Screen
      name={name}
      component={component}
      options={{title: title, headerShown: shown}}
    />
  );
};

function App(): React.JSX.Element {
  const ScreenList: any[] = [
    ScreenItem('Login', Login, 'Login', false),

    ScreenItem('Loading', Loading, 'Loading', false),
    ScreenItem('Home', Home, 'Home', false),
    ScreenItem('Store', Store, 'Store', false),
    ScreenItem('ItemStore', ItemStore, 'ItemStore', false),
    ScreenItem('Inventory', Inventory, 'Inventory', false),
    ScreenItem('TodoList', TodoList, 'TodoList', false),
    ScreenItem('Rank', Rank, 'Rank', false),
  ];
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          {ScreenList.map((component: any, index: number) => {
            return (
              <React.Fragment key={`screenitem-${index}`}>
                {component}
              </React.Fragment>
            );
          })}
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

export default App;
