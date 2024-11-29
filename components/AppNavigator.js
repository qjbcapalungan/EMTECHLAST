// AppNavigator.js
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import NavBar from '../components/NavBar'; // Import the NavBar
import Logger1 from '../components/Logger1';
import Logger2 from '../components/Logger2';
import Logger3 from '../components/Logger3';

const Stack = createNativeStackNavigator();

const AppNavigator = () => (
  <Stack.Navigator initialRouteName="Home">
    <Stack.Screen name="HomePage" component={NavBar} options={{ headerShown: false }} />
    <Stack.Screen
      name="Logger1"
      component={Logger1}
      options={{
        title: 'Logger 1 Report',
        headerTitleAlign: 'center',
        headerStyle: { backgroundColor: 'white' },
        headerTitleStyle: { color: 'black' },
        headerTintColor: 'black',
      }}
    />
    <Stack.Screen
      name="Logger2"
      component={Logger2}
      options={{
        title: 'Logger 2 Report',
        headerTitleAlign: 'center',
        headerStyle: { backgroundColor: 'white' },
        headerTitleStyle: { color: 'black' },
        headerTintColor: 'black',
      }}
    />
    <Stack.Screen
      name="Logger3"
      component={Logger3}
      options={{
        title: 'Logger 3 Report',
        headerTitleAlign: 'center',
        headerStyle: { backgroundColor: 'white' },
        headerTitleStyle: { color: 'black' },
        headerTintColor: 'black',
      }}
    />


    
  </Stack.Navigator>
);

export default AppNavigator;
