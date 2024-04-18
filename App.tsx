import React, {useEffect, type PropsWithChildren} from 'react';
import {SafeAreaView, useColorScheme, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import AppStack from '@navigation/index';
import {QueryClient, QueryClientProvider} from 'react-query';
import SplashScreen from 'react-native-splash-screen';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  useEffect(() => {
    SplashScreen.hide();
  }, []);

  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <AppStack />
      </NavigationContainer>
    </QueryClientProvider>
  );
};

export default App;
