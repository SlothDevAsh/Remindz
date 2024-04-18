import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {RootStackParamList} from 'src/types/navigation';
import Home from '@screens/home';
import Create from '@screens/create';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
        animation: 'simple_push',
        gestureDirection: 'horizontal',
      }}
      initialRouteName="Home">
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Create" component={Create} />
    </Stack.Navigator>
  );
}
