import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location'; // Make sure this import is correct06

const MapScreen = () => {
  const [userLocation, setUserLocation] = useState(null);
  const [dataLoggerLocations, setDataLoggerLocations] = useState([
    { id: '1', latitude: 14.688445, longitude: 120.957051, title: 'Data Logger 1', description: 'Status: Good' },
    { id: '2', latitude: 14.714729, longitude: 120.973008, title: 'Data Logger 2', description: 'Status: Warning' },
    { id: '3', latitude: 14.706994, longitude: 120.960775, title: 'Data Logger 3', description: 'Status: Needs Maintenance' },
    { id: '4', latitude: 14.681383812342407, longitude: 120.9719438630989, title: 'Data Logger 4', description: 'Status: Needs Maintenance' },
    { id: '5', latitude: 14.704487111943205, longitude: 120.99976485000862, title: 'Data Logger 5', description: 'Status: Needs Maintenance' },
    { id: '6', latitude: 14.662909807628932, longitude: 120.95734998774374, title: 'Data Logger 6', description: 'Status: Needs Maintenance' },
    { id: '7', latitude: 14.734475419778178, longitude: 120.98981331117588, title: 'Data Logger 7', description: 'Status: Needs Maintenance' },

    // Add more data logger locations here
  ]);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setUserLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
    })();
  }, []);

  if (!userLocation) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#6200ee" />
      </View>
    ); // Show a loading indicator
  }

  return (
    <MapView
      style={styles.map}
      initialRegion={userLocation}
      showsUserLocation={true}
    >
      {dataLoggerLocations.map(logger => (
        <Marker
          key={logger.id}
          coordinate={{ latitude: logger.latitude, longitude: logger.longitude }}
          title={logger.title}
          description={logger.description}
          image={require('../assets/LoggerIcon.png')}
        />
      ))}
    </MapView>
  );
};

const styles = StyleSheet.create({
  map: {
    width: '100%',
    height: '100%',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default MapScreen;
