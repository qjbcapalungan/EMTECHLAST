import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { LineChart, BarChart } from 'react-native-chart-kit'; // Import BarChart
import * as Progress from 'react-native-progress';
import Icon from 'react-native-vector-icons/FontAwesome';
import IconB from 'react-native-vector-icons/MaterialCommunityIcons';

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

const Logger1 = () => {
  const screenWidth = Dimensions.get('window').width;

  // Updated data to match x-axis values
  const dataPoints = [13, 14, 13, 11, 13, 12, 11, 14, 15, 12, 13, 11, 13, 14, 15, 12];

  // Bar chart data
  const flowRates = [120, 140, 130, 150, 160, 155, 145]; // Sample flow rates for each day
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']; // Days of the week

  return (
    <View style={styles.container}>
      <View style={styles.statusContainer}>
        <Text style={styles.statusText}>STATUS: WORKING</Text>
      </View>

      <View style={styles.chartAndProgressContainer}>
        {/* Circular Progress Bar Section */}
        <View style={styles.circularProgressContainer}>
          <CircularProgressBar value={35} maxValue={100} unit="psi" />
        </View>
        {/* LineChart without ScrollView */}
        <View style={styles.chartContainer}>
          <LineChart
            data={{
              labels: [], // Empty labels array to remove x-axis labels
              datasets: [{ data: dataPoints }],
            }}
            width={screenWidth - 200}
            height={150}
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

      {/* Battery Percentage and Flowrate Handler Section */}
      <View style={styles.infoContainer}>
        {/* Battery Percentage */}
        <View style={styles.infoBox}>
          <Icon name="battery-half" size={30} color="#007AFF" />
          <Text style={styles.infoText}>Battery: 65%</Text>
        </View>

        {/* Flowrate Handler */}
        <View style={styles.infoBox}>
          <Icon name="tint" size={30} color="#007AFF" />
          <Text style={styles.infoText}>Flowrate: 120 L/min</Text>
        </View>
      </View>

      {/* Data sent */}
      <View style={[styles.infoBox, styles.dataSentBox]}>
        <Text style={styles.infoText}>Data Sent: 65%</Text>
        <IconB name="transfer" size={30} color="#007AFF" />
      </View>

      {/* Bar Chart Section for Flow Rates */}
      <View style={styles.barChartContainer}>
        <BarChart
          data={{
            labels: days,
            datasets: [{
              data: flowRates,
            }],
          }}
          width={screenWidth -20  } 
          height={220}
          chartConfig={{
            backgroundColor: '#ffffff',
            backgroundGradientFrom: '#ffffff',
            backgroundGradientTo: '#ffffff',
            color: (opacity = 1) => `rgba(0, 122, 255, ${opacity})`, // Bar color
            labelColor: () => '#000',
            style: {
              borderRadius: 16,
            },
          }}
          style={{
            marginVertical: 8,
            borderRadius: 16,
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f0f0f0',
  },
  statusContainer: {
    backgroundColor: '#4CAF50',
    borderRadius: 8,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statusText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
  chartAndProgressContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
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
    height: 150,
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
  },
  dataSentBox: {
    flexDirection: 'row', // Aligning icon and text horizontally
    paddingVertical: 20, // Increase padding vertically
    paddingHorizontal: 25, // Increase padding horizontally
    justifyContent: 'space-between', // Align content to the edges
    width: '100%', // Make it full width
    marginTop: 20, // Add spacing at the top
  },
  infoText: {
    fontSize: 16,
    color: '#007AFF',
    marginLeft: 10,
  },
  barChartContainer: {
    marginTop: 20,
    borderRadius: 16,
    overflow: 'scroll',
  },
});

export default Logger1;
