import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import RootStackNavigator from './RootNavigator';

const AppNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <RootStackNavigator />
    </NavigationContainer>
  );
};

export default AppNavigator;
