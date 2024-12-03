import React, { useState } from 'react';
import {
  Button,
  View,
  Text,
  TextInput,
  StyleSheet,
  Alert,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AppNavigator from './components/AppNavigator';
import firebase from './firebaseConfig'; // Import Firebase config

// Login Screen Component
const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // Function to get email by username from Realtime Database
  const getEmailByUsername = async (username) => {
    try {
      const snapshot = await firebase
        .database()
        .ref('users')
        .orderByChild('username')
        .equalTo(username)
        .once('value');

      if (snapshot.exists()) {
        const userData = Object.values(snapshot.val())[0];
        return userData.email;
      } else {
        throw new Error('Username not found');
      }
    } catch (error) {
      console.error('Error getting email by username:', error);
      throw error;
    }
  };

  const handleLogin = async () => {
    try {
      const email = await getEmailByUsername(username);
      await firebase.auth().signInWithEmailAndPassword(email, password);
      console.log('Login successful');
      navigation.replace('MainApp'); // Navigate to MainApp if credentials match
    } catch (error) {
      console.error('Login Error:', error);
      Alert.alert('Login Failed', error.message);
    }
  };

  const handleRegister = async () => {
    try {
      // Check if username already exists
      const snapshot = await firebase
        .database()
        .ref('users')
        .orderByChild('username')
        .equalTo(username)
        .once('value');

      if (snapshot.exists()) {
        throw new Error('Username already exists. Please choose a different one.');
      }

      // Create a new user in Firebase Authentication
      const email = `${username}@example.com`; // Create a pseudo-email using the username
      const newUser = await firebase.auth().createUserWithEmailAndPassword(email, password);

      // Add the new user's username and email to Realtime Database
      await firebase.database().ref('users').push({
        username: username,
        email: email,
        userId: newUser.user.uid, // Optional: Store Firebase user ID
      });

      Alert.alert('Registration Successful', 'You can now log in.');
    } catch (error) {
      console.error('Registration Error:', error);
      Alert.alert('Registration Failed', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login / Register</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={(text) => setUsername(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry
      />
      <Button title="Login" onPress={handleLogin} />
      <Button
        title="Register"
        onPress={handleRegister}
        color="#888"
      />
    </View>
  );
};

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="MainApp"
          component={AppNavigator}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    width: '80%',
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
});

export default App;
