import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '@Screens/Home';
import { ChatDetail, ListChat } from '@Screens/Chat';

const Stack = createStackNavigator();

const RootStackNavigator = (): React.ReactElement => {
  return (
    <Stack.Navigator
      initialRouteName={'MainTab'}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen component={Home} name={'Home'} />
      <Stack.Screen component={ListChat} name={'ListChat'} />
      <Stack.Screen options={{ headerShown: true }} component={ChatDetail} name={'ChatDetail'} />
    </Stack.Navigator>
  );
};

export default RootStackNavigator;
