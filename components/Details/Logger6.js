import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { LineChart, BarChart } from 'react-native-chart-kit'; // Import BarChart
import * as Progress from 'react-native-progress';
import Icon from 'react-native-vector-icons/FontAwesome';
import IconB from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { faker } from '@faker-js/faker';

faker.seed(123); // Set seed for reproducibility

const CircularProgressBar = ({ value, maxValue, unit }) => {
  const progress = value / maxValue;

  return (
    <View style={styles.progressContainer}>
      <Progress.Circle
        progress={progress}
        size={100}
        borderWidth={5}
        color="#007AFF"
        unfilledColor="#fff"
      />
      <Text style={styles.valueText}>{value}</Text>
      <Text style={styles.unitText}>{unit}</Text>
      <Text style={styles.minValueText}>0</Text>
      <Text style={styles.maxValueText}>{maxValue}</Text>
    </View>
  );
};

const Logger6 = () => {
  const screenWidth = Dimensions.get('window').width;
  const navigation = useNavigation();

  // State to store data points
  const [dataPoints, setDataPoints] = useState(Array.from({ length: 16 }, () => faker.number.int({ min: 3, max: 15 })));

  useEffect(() => {
    // Function to generate new data points
    const generateDataPoints = () => {
      setDataPoints(Array.from({ length: 16 }, () => faker.number.int({ min: 3, max: 15 })));
    };

    // Set interval to update data points every 5 seconds
    const interval = setInterval(generateDataPoints, 5000);

    // Clear interval on component unmount
    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.headerAndStatusContainer}>
        <Text style={styles.headerText}>District Meter 2 Report</Text>
        <Text style={[styles.statusText, dataPoints[0] < 7 ? styles.warningText : null]}>
          {dataPoints[0] < 7 ? 'STATUS: WARNING' : 'STATUS: WORKING'}
        </Text>
      </View>

      <View style={styles.chartAndProgressContainer}>
        {/* Circular Progress Bar Section */}
        <View style={styles.circularProgressContainer}>
          <CircularProgressBar value={dataPoints[0]} maxValue={15} unit="psi" />
        </View>
        {/* Data Sent in a Box */}
        <View style={styles.dataSentContainer}>
          <Text style={styles.dataSentText}>Data Sent: {faker.number.int({ min: 80, max: 100 })}%</Text>
          <IconB name="transfer" size={30} color="#007AFF" />
        </View>
      </View>

      <View style={styles.infoContainer}>
        {/* Flowrate Handler */}
        <View style={[styles.infoBox, styles.dataSentBox]}>
          <Text style={styles.infoText}>Flowrate: {faker.number.int({ min: 100, max: 150 })} L/min</Text>
          <Icon name="tint" size={30} color="#007AFF" />
        </View>
      </View>

      {/* LineChart without ScrollView */}
      <View style={styles.chartContainer}>
        <LineChart
          data={{
            labels: [], // Empty labels array to remove x-axis labels
            datasets: [{ data: dataPoints }],
          }}
          width={screenWidth - 20} // Made the chart larger
          height={250} // Increased height
          chartConfig={{
            backgroundColor: '#ffffff',
            backgroundGradientFrom: '#ffffff',
            backgroundGradientTo: '#ffffff',
            color: () => '#ff735e',
            labelColor: () => '#000',
            style: { borderRadius: 16 },
          }}
          bezier
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: '#DAFFFB',
  },
  headerAndStatusContainer: {
    alignItems: 'center',
    margin: 0,
    padding: 0,
    backgroundColor: '#04364A',
    paddingVertical: 30,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  headerText: {
    fontSize: 32,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#FFFFFF',
    backgroundColor: 'transparent',
  },
  
  statusText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 35,
    textAlign: 'center',
    marginTop: 20,
    backgroundColor: '#8AF19F',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#04364A',
    width: 350,
    height: 75,
    
  },
  warningText: {
    backgroundColor: '#FF0000',
    color: '#FFFFFF',
  },
  chartAndProgressContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginVertical: 20,
  },
  circularProgressContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
    width: 150,
    height: 150,
    marginRight: 10,
    
  },
  chartContainer: {
    flex: 1,
    height: 250,
    borderRadius: 16,
    overflow: 'hidden',
  },
  progressContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  valueText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  unitText: {
    fontSize: 14,
    color: '#007AFF',
  },
  minValueText: {
    fontSize: 10,
    color: '#999',
    position: 'absolute',
    bottom: 10,
    left: 10,
  },
  maxValueText: {
    fontSize: 10,
    color: '#999',
    position: 'absolute',
    bottom: 10,
    right: 10,
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  infoBox: {
    backgroundColor: '#fff',
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    width: '48%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 20,
  },
  dataSentContainer: {
    backgroundColor: '#fff',
    paddingVertical: 59,
    paddingHorizontal: 40,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  dataSentBox: {
    flexDirection: 'row', // Aligning icon and text horizontally
    paddingVertical: 20, // Increase padding vertically
    paddingHorizontal: 25, // Increase padding horizontally
    justifyContent: 'space-between', // Align content to the edges
    width: '100%', // Make it full width
    marginTop: 5
  },
  warningBackground: {
    backgroundColor: '#FF0000',
  },
  infoText: {
    fontSize: 16,
    color: '#007AFF',
    marginLeft: 10,
  },
  dataSentText: {
    fontSize: 20,
    color: '#007AFF',
    marginRight: 10,
  },
});

export default Logger6;
