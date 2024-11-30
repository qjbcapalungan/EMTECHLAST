// AppNavigator.js
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import NavBar from '../components/NavBar';
import Logger1 from '../components/Details/Logger1';
import Logger2 from '../components/Details/Logger2';
import Logger3 from '../components/Details/Logger3';
import Logger4 from '../components/Details/Logger4';
import Logger5 from '../components/Details/Logger5';
import Logger6 from '../components/Details/Logger6';
import Logger7 from '../components/Details/Logger7';

const Stack = createNativeStackNavigator();

const headerStyle = {
  backgroundColor: '#04364A',
  elevation: 0,
  shadowOpacity: 0,
  borderBottomWidth: 0,
};

const headerTitleStyle = {
  color: 'black',
};

const AppNavigator = () => (
  <Stack.Navigator initialRouteName="Home">
    <Stack.Screen name="HomePage" component={NavBar} options={{ headerShown: false }} />
    <Stack.Screen
      name="Logger1"
      component={Logger1}
      options={{
        headerTitle: '',
        headerTitleAlign: 'center',
        headerStyle,
        headerTintColor: 'white',
      }}
    />
    <Stack.Screen
      name="Logger2"
      component={Logger2}
      options={{
        headerTitle: '',
        headerTitleAlign: 'center',
        headerStyle,
        headerTitleStyle,
        headerTintColor: 'white',
      }}
    />
    <Stack.Screen
      name="Logger3"
      component={Logger3}
      options={{
        headerTitle: '',
        headerTitleAlign: 'center',
        headerStyle,
        headerTitleStyle,
        headerTintColor: 'white',
      }}
    />

    <Stack.Screen
      name="Logger4"
      component={Logger4}
      options={{
        headerTitle: '',
        headerTitleAlign: 'center',
        headerStyle,
        headerTitleStyle,
        headerTintColor: 'white',
      }}
    />


<Stack.Screen
      name="Logger5"
      component={Logger5}
      options={{
        headerTitle: '',
        headerTitleAlign: 'center',
        headerStyle,
        headerTitleStyle,
        headerTintColor: 'white',
      }}
    />

<Stack.Screen
      name="Logger6"
      component={Logger6}
      options={{
        headerTitle: '',
        headerTitleAlign: 'center',
        headerStyle,
        headerTitleStyle,
        headerTintColor: 'white',
      }}
    />

<Stack.Screen
      name="Logger7"
      component={Logger7}
      options={{
        headerTitle: '',
        headerTitleAlign: 'center',
        headerStyle,
        headerTitleStyle,
        headerTintColor: 'white',
      }}
    />
  </Stack.Navigator>
);

export default AppNavigator;
