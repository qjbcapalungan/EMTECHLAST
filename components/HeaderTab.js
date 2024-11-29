// HeaderTab.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons, FontAwesome } from '@expo/vector-icons'; 

export default function HeaderTab({ onMenuPress, title }) {
  return (
    <View style={styles.header}>
      <TouchableOpacity 
        onPress={onMenuPress} 
        accessibilityLabel="Open menu" 
        accessibilityRole="button"
      >
        <MaterialIcons name="menu" size={32} color="white" />
      </TouchableOpacity>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.userIconContainer}>
        <FontAwesome name="user" size={28} color="white" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: 'transparent', // Set background to transparent
    elevation: 0, // Remove shadow for full transparency
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 16,
    color: 'black', // Ensure text is visible on transparent background
  },
  userIconContainer: {
    marginRight: 10,
  },
});
