// Navbar.js
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Octicons, FontAwesome5 } from '@expo/vector-icons';
import HomeScreen from '../components/HomeScreen'; // This will be a tab for Home
import MapScreen from '../components/MapScreen'; // This will be a tab for Home

const Tab = createBottomTabNavigator();

const NavBar = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#6200ee', // Customize your color
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: 'Telemetry',
          tabBarIcon: ({ color }) => (
            <Octicons name="graph" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Loggers"
        component={MapScreen}
        options={{
          title: 'Data Logger Locations',
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="map-marked" size={24} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default NavBar;
