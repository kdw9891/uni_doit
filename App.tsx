import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator, StackNavigationProp} from '@react-navigation/stack';

import Home from './src/pages/home/Home';
import Store from './src/pages/store/Store';
import StudyTimer from './src/pages/study/time/StudyTimer';
import TodoList from './src/pages/study/todo/TodoList';

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
    ScreenItem('Home', Home, 'Home', false),
    ScreenItem('Store', Store, 'Store', false),
    ScreenItem('StudyTimer', StudyTimer, 'Study Timer', false),
    ScreenItem('TodoList', TodoList, 'Todo List', false),
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
