// Navbar.js
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Octicons, FontAwesome5 } from '@expo/vector-icons';
import { StyleSheet } from 'react-native';
import HomeScreen from '../components/HomeScreen'; // This will be a tab for Home
import MapScreen from '../components/MapScreen'; // This will be a tab for Map

const Tab = createBottomTabNavigator();

const NavBar = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: styles.tabBarActiveTintColor.color,
        headerShown: false,
        tabBarStyle: styles.tabBarStyle,
        tabBarLabelStyle: styles.tabBarLabelStyle,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: 'Telemetry',
          tabBarIcon: ({ color }) => (
            <Octicons name="graph" size={24} color={styles.tabBarIcon.color} />
          ),
        }}
      />
      <Tab.Screen
        name="Loggers"
        component={MapScreen}
        options={{
          title: 'Data Logger Locations',
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="map-marked" size={24} color={styles.tabBarIcon.color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBarActiveTintColor: {
    color: '#000000', // Set active tint color to black
  },
  tabBarStyle: {
    height: 70, // Increased the height to make it a little bit larger
    backgroundColor: '#176B87', // Set background color
  },
  tabBarIcon: {
    color: '#ffffff', // Set icon color to white
  },
  tabBarLabelStyle: {
    fontSize: 16, // Make the text larger
    color: '#ffffff', // Set text color to white
  },
});

export default NavBar;
