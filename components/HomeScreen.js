import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, StatusBar, TextInput, FlatList, Modal, TouchableOpacity } from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { MaterialIcons } from '@expo/vector-icons';
import { faker } from '@faker-js/faker';
import HeaderTab from '../components/HeaderTab'; // Adjust path as necessary

export default function HomeScreen({ navigation }) {
  const [filterVisible, setFilterVisible] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState([]); // State to hold the selected filter types
  const [searchText, setSearchText] = useState(''); // State for managing search input

  const handlePress = (section) => {
    navigation.navigate(section);
  };

  // Function to determine color based on progress value
  const getColorBasedOnProgress = (progress) => {
    if (progress >= 70) {
      return '#4CAF50'; // Green for good condition (70-100)
    } else if (progress >= 35) {
      return '#FFA500'; // Yellow for warning condition (35-69)
    } else {
      return '#F44336'; // Red for critical warning (1-30)
    }
  };

  // Generate fake data for loggers with only progress being random
  const loggers = [
    { id: 'Logger1', label: 'Pressure Monitoring Pump', progress: faker.number.int({ min: 1, max: 100 }) },
    { id: 'Logger2', label: 'Pressure Regulation Valve', progress: faker.number.int({ min: 1, max: 100 }) },
    { id: 'Logger3', label: 'District Meter', progress: faker.number.int({ min: 1, max: 100 }) },
    { id: 'Logger4', label: 'Pressure Monitoring Pump', progress: faker.number.int({ min: 1, max: 100 }) },
    { id: 'Logger5', label: 'Pressure Regulation Valve', progress: faker.number.int({ min: 1, max: 100 }) },
    { id: 'Logger6', label: 'District Meter', progress: faker.number.int({ min: 1, max: 100 }) },
    { id: 'Logger7', label: 'Pressure Monitoring Pump', progress: faker.number.int({ min: 1, max: 100 }) },
  ];

  // Filtered data based on the selected filters and search text
  const filteredLoggers = loggers.filter((logger) => {
    const matchesFilter = selectedFilters.length > 0 ? selectedFilters.includes(logger.label) : true;
    const matchesSearch = logger.label.toLowerCase().includes(searchText.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const handleFilterSelection = (filter) => {
    if (selectedFilters.includes(filter)) {
      setSelectedFilters(selectedFilters.filter((item) => item !== filter));
    } else {
      setSelectedFilters([...selectedFilters, filter]);
    }
  };

  const renderLoggerItem = ({ item }) => {
    const color = getColorBasedOnProgress(item.progress);
    return (
      <Pressable style={styles.card} onPress={() => handlePress(item.id)}>
        <View style={styles.cardContent}>
          {/* Logger Information Section */}
          <View style={styles.loggerInfo}>
            {/* Name of the datalogger */}
            <Text style={styles.loggerName}>{item.label}</Text>

            {/* Data sent */}
            <Text style={styles.dataSent}>Data Sent: {item.progress}%</Text>

            {/* Condition of datalogger */}
            <Text style={[styles.conditionText, { color }]}>Condition: {item.progress >= 70 ? 'Good' : item.progress >= 35 ? 'Warning' : 'Critical'}</Text>
          </View>

          {/* Circular Progress Indicator Section */}
          <AnimatedCircularProgress
            size={120}
            width={12}
            fill={item.progress}
            tintColor={color}
            backgroundColor="#e0e0e0"
            style={styles.progress}
          >
            {(fill) => <Text style={styles.progressText}>{Math.round(fill)}%</Text>}
          </AnimatedCircularProgress>
        </View>
      </Pressable>
    );
  };

  // Get current date in the desired format
  const currentDate = new Date().toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f0f0f0" />
      <HeaderTab onMenuPress={() => navigation.toggleDrawer()} />

      {/* Custom Header Section */}
      <View style={styles.customHeader}>
        <Text style={styles.title}>Malabon-Valenzuela</Text>
        <Text style={styles.subtitle}>(MVL)</Text>
        <Text style={styles.updateText}>Last Update: {currentDate}</Text>
      </View>

      {/* Content Section */}
      <View style={styles.content}>
        {/* Search and Filter Section */}
        <View style={styles.searchFilterContainer}>
          <TextInput
            style={styles.searchBar}
            placeholder="Search"
            placeholderTextColor="#888"
            value={searchText}
            onChangeText={setSearchText}
          />
          <Pressable style={styles.filterButton} onPress={() => setFilterVisible(true)}>
            <MaterialIcons name="filter-list" size={28} color="black" />
          </Pressable>
        </View>

        {/* Scrollable Cards Section */}
        <FlatList
          data={filteredLoggers}
          renderItem={renderLoggerItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.flatListContent}
        />

        {/* Filter Modal */}
        <Modal
          visible={filterVisible}
          transparent={true}
          animationType="slide"
          onRequestClose={() => setFilterVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Select Logger Types</Text>
                <TouchableOpacity style={styles.doneButton} onPress={() => setFilterVisible(false)}>
                  <Text style={styles.doneButtonText}>Done</Text>
                </TouchableOpacity>
              </View>

              {/* Filter Options with Checkboxes */}
              {["Pressure Monitoring Pump", "Pressure Regulation Valve", "District Meter"].map((option) => (
                <TouchableOpacity key={option} style={styles.filterOption} onPress={() => handleFilterSelection(option)}>
                  <View style={styles.checkbox}>{selectedFilters.includes(option) && <View style={styles.checkedBox} />}</View>
                  <Text style={styles.filterOptionText}>{option}</Text>
                </TouchableOpacity>
              ))}

              {/* Reset Filter */}
              <TouchableOpacity style={styles.filterOption} onPress={() => setSelectedFilters([])}>
                <View style={styles.checkbox}>{selectedFilters.length === 0 && <View style={styles.checkedBox} />}</View>
                <Text style={styles.filterOptionText}>Show All</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#04364A',
  },
  customHeader: {
    backgroundColor: '#04364A',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 0,
    paddingBottom: 0,
  },
  title: {
    fontSize: 35,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 35,
    color: '#FFFFFF',
    marginVertical: 2,
  },
  updateText: {
    fontSize: 15,
    color: '#A8E6F7',
  },
  content: {
    flex: 1,
    borderTopRightRadius: 50,
    borderTopLeftRadius: 50,
    marginTop: 25,
    paddingHorizontal: 18,
    backgroundColor: '#DAFFFB',
    paddingTop: 30,
  },
  searchFilterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 2,
    paddingHorizontal: 10,
    height: 50,
  },
  searchBar: {
    flex: 1,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 16,
    marginRight: 10,
    color: '#000',
  },
  filterButton: {
    padding: 5,
  },
  flatListContent: {
    paddingBottom: 20,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FBFBFB',
    padding: 20,
    marginVertical: 2,
    borderRadius: 8,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 1,
  },
  loggerInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  loggerName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 5,
  },
  dataSent: {
    fontSize: 16,
    color: '#555',
    marginBottom: 5,
  },
  conditionText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  progress: {
    marginLeft: 10,
  },
  progressText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    width: 300,
    padding: 20,
    borderRadius: 10,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  doneButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 5,
    width: 65,
    alignItems: 'center',
  },
  doneButtonText: {
    color: '#fff',
    fontSize: 14,
  },
  filterOption: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  filterOptionText: {
    fontSize: 16,
    color: '#000',
    marginLeft: 10,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkedBox: {
    width: 16,
    height: 16,
    backgroundColor: '#000',
  },
});
