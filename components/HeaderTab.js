import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'; 

export default function HeaderTab({ onMenuPress, title }) {
  return (
    <View style={styles.header}>
      <TouchableOpacity 
        onPress={onMenuPress} 
        accessibilityLabel="Open menu" 
        accessibilityRole="button"
      >
        <MaterialIcons name="menu" size={28} color="black" />
      </TouchableOpacity>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#fff',
    elevation: 2, 
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 16,
  },
});
