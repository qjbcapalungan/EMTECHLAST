import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import * as Progress from 'react-native-progress';
import Icon from 'react-native-vector-icons/FontAwesome';
import IconB from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { faker } from '@faker-js/faker';

faker.seed(123); // Set seed for reproducibility

// Generate static fake data outside of the component
const initialDataPoints = Array.from({ length: 16 }, () => faker.number.int({ min: 3, max: 15 }));
const staticFlowrate = faker.number.int({ min: 100, max: 150 });
const staticDataSent = faker.number.int({ min: 80, max: 100 });

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

const Logger2 = () => {
  const screenWidth = Dimensions.get('window').width;
  const navigation = useNavigation();

  // State to store data points
  const [dataPoints, setDataPoints] = useState(initialDataPoints);

  useEffect(() => {
    // Function to generate a new data point and update the array
    const addDataPoint = () => {
      setDataPoints((prevDataPoints) => {
        const newDataPoint = faker.number.int({ min: 3, max: 15 });
        const updatedDataPoints = [...prevDataPoints.slice(1), newDataPoint];
        return updatedDataPoints;
      });
    };

    // Set interval to update data points every 5 seconds
    const interval = setInterval(addDataPoint, 3000);

    // Clear interval on component unmount
    return () => clearInterval(interval);
  }, []);

  // The current psi value is the latest value in the dataPoints array
  const currentPsiValue = dataPoints[dataPoints.length - 1];

  return (
    <View style={styles.container}>
      <View style={styles.headerAndStatusContainer}>
        <Text style={styles.headerText}>Pressure Regulation Valve 1 Report</Text>
        <Text
          style={[
            styles.statusText,
            currentPsiValue < 7 ? styles.warningText : styles.workingText,
          ]}
        >
          {currentPsiValue < 7 ? 'STATUS: WARNING' : 'STATUS: WORKING'}
        </Text>
      </View>

      <View style={styles.chartAndProgressContainer}>
        {/* Circular Progress Bar Section */}
        <View style={styles.circularProgressContainer}>
          <CircularProgressBar value={currentPsiValue} maxValue={15} unit="psi" />
        </View>
        {/* Data Sent in a Box */}
        <View style={styles.dataSentContainer}>
          <Text style={styles.dataSentText}>Data Sent: {staticDataSent}%</Text>
          <IconB name="transfer" size={30} color="#007AFF" />
        </View>
      </View>

      <View style={styles.infoContainer}>
        {/* Flowrate Handler */}
        <View style={[styles.infoBox, styles.dataSentBox]}>
          <Text style={styles.infoText}>Flowrate: {staticFlowrate} L/min</Text>
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
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center',
    marginTop: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    borderWidth: 1,
    width: '100%',
  },
  warningText: {
    backgroundColor: '#FF0000', // Red background for WARNING
    color: '#FFFFFF', // White text for contrast
    borderColor: '#FF0000',
  },
  workingText: {
    backgroundColor: '#8AF19F', // Green background for WORKING
    color: '#000000', // Black text for contrast
    borderColor: '#04364A',
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
    width: '60%'
  },
  dataSentBox: {
    flexDirection: 'row',
    paddingVertical: 20,
    paddingHorizontal: 25,
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 5,
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

export default Logger2;
