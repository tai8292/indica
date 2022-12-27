import AppNavigator from '@Navigation';
import store from '@Store';
import { StoreProvider } from 'easy-peasy';
import React, { useEffect, FC } from 'react';
import SplashScreen from 'react-native-splash-screen';

const App: FC = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <StoreProvider store={store}>
      <AppNavigator />
    </StoreProvider>
  );
};

export default App;
