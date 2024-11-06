//HomeScreen.js
import React from 'react';
import { View, Text, StyleSheet, Pressable, StatusBar, Image } from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import HeaderTab from '../components/HeaderTab'; // Adjust path as necessary

export default function HomeScreen({ navigation }) {
  const handlePress = (section) => {
    navigation.navigate(section);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f0f0f0" />
      <HeaderTab onMenuPress={() => navigation.toggleDrawer()} title="MVAL Business Area" />

      <View style={styles.content}>
        <Pressable style={styles.card} onPress={() => handlePress('Logger1')}>
          <View style={styles.barContainer}>
            <View style={[styles.bar, { backgroundColor: '#4CAF50', width: '100%' }]}>
              <Text style={styles.barText}>GP 98%</Text>
            </View>
          </View>
          <AnimatedCircularProgress
            size={120}
            width={12}
            fill={98}
            tintColor="#4CAF50"
            backgroundColor="#e0e0e0"
            style={styles.progress}
          >
            {(fill) => <Text style={styles.progressText}>{fill}%</Text>}
          </AnimatedCircularProgress>
        </Pressable>

        <Pressable style={styles.card} onPress={() => handlePress('Logger2')}>
          <View style={styles.barContainer}>
            <View style={[styles.bar, { backgroundColor: '#FFA500', width: '100%' }]}>
              <Text style={styles.barText}>PRV 67%</Text>
            </View>
          </View>
          <AnimatedCircularProgress
            size={120}
            width={12}
            fill={67}
            tintColor="#FFA500"
            backgroundColor="#e0e0e0"
            style={styles.progress}
          >
            {(fill) => <Text style={styles.progressText}>{fill}%</Text>}
          </AnimatedCircularProgress>
        </Pressable>

        <Pressable style={styles.card} onPress={() => handlePress('Logger3')}>
          <View style={styles.barContainer}>
            <View style={[styles.bar, { backgroundColor: '#F44336', width: '100%' }]}>
              <Text style={styles.barText}>DM 33%</Text>
            </View>
          </View>
          <AnimatedCircularProgress
            size={120}
            width={12}
            fill={33}
            tintColor="#F44336"
            backgroundColor="#e0e0e0"
            style={styles.progress}
          >
            {(fill) => <Text style={styles.progressText}>{fill}%</Text>}
          </AnimatedCircularProgress>
        </Pressable>
      </View>

      <View style={styles.imageContainer}>
        <Image
          source={require('../assets/Logo.png')} // Update the path to your image
          style={styles.image}
          resizeMode="contain"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#D1E3E8',
    padding: 20,
    marginVertical: 10,
    borderRadius: 8,
  },
  barContainer: {
    flex: 1,
    height: 60,
    marginRight: 16,
    justifyContent: 'center',
  },
  bar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '100%',
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  barText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 18,
  },
  progress: {
    alignSelf: 'center',
  },
  progressText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center', // Change this to 'flex-start' for top positioning
    padding: 20,
    marginBottom: -100, // Create space below the image
  },
  image: {
    width: 300, // Adjust the width as necessary
    height: 300, // Adjust the height as necessary
  },
});