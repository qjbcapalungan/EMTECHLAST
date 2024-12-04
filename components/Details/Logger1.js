import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import * as Progress from 'react-native-progress';
import Icon from 'react-native-vector-icons/FontAwesome';
import IconB from 'react-native-vector-icons/MaterialCommunityIcons';
import firebase from './firebaseConfig'; // Corrected import path

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

  const [dataPoints, setDataPoints] = useState([0]);
  const [latestPsi, setLatestPsi] = useState(0);
  const [flowrate, setFlowrate] = useState(0); // State to store flowrate

  useEffect(() => {
    const psiReference = firebase.database().ref('/psi');
    const flowrateReference = firebase.database().ref('/flowrate');

    try {
      // Fetching psi data
      psiReference.on('value', (snapshot) => {
        const data = snapshot.val();
        if (data !== null) {
          const psiValues = Object.values(data);
          let index = 0;
          const interval = setInterval(() => {
            if (index < psiValues.length) {
              setDataPoints((prevDataPoints) => [...prevDataPoints, psiValues[index]]);
              setLatestPsi(psiValues[index]);
              index++;
            } else {
              clearInterval(interval);
            }
          }, 1000);
        } else {
          setDataPoints([0]);
          setLatestPsi(0);
        }
      });

      // Fetching flowrate data
      flowrateReference.on('value', (snapshot) => {
        const data = snapshot.val();
        if (data !== null) {
          const flowrateValues = Object.values(data);
          let index = 0;
          const interval = setInterval(() => {
            if (index < flowrateValues.length) {
              setFlowrate(flowrateValues[index]);
              index++;
            } else {
              clearInterval(interval);
            }
          }, 1000);
        } else {
          setFlowrate(0);
        }
      });
    } catch (error) {
      console.error('Error fetching data from Firebase:', error);
    }

    return () => {
      psiReference.off('value');
      flowrateReference.off('value');
    };
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.headerAndStatusContainer}>
        <Text style={styles.headerText}>Pressure Monitoring Pump 1 Report</Text>
        <Text
          style={[
            styles.statusText,
            latestPsi < 7 ? styles.warningText : styles.workingText,
          ]}
        >
          {latestPsi < 7 ? 'STATUS: WARNING' : 'STATUS: WORKING'}
        </Text>
      </View>

      <View style={styles.chartAndProgressContainer}>
        <View style={styles.circularProgressContainer}>
          <CircularProgressBar value={latestPsi} maxValue={17} unit="psi" />
        </View>
        <View style={styles.dataSentContainer}>
          <Text style={styles.dataSentText}>
            Data Sent: {Math.min(Math.max(Math.floor((dataPoints.length / 16) * 20), 5), 100)}%
          </Text>
          <IconB name="transfer" size={30} color="#007AFF" />
        </View>
      </View>

      <View style={styles.infoContainer}>
        <View style={[styles.infoBox, styles.dataSentBox]}>
          <Text style={styles.infoText}>Flowrate: {flowrate} L/min</Text>
          <Icon name="tint" size={30} color="#007AFF" />
        </View>
      </View>

      <View style={styles.chartContainer}>
        <LineChart
          data={{
            labels: dataPoints.map((_, index) => (index % 5 === 0 ? `T${index}` : '')),
            datasets: [{ data: dataPoints }],
          }}
          width={screenWidth - 20}
          height={250}
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
    height: 170,
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
    fontSize: 15,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  unitText: {
    fontSize: 15,
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
    paddingHorizontal: 30,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
    width: '60%',
    height: '100%'
  },
  dataSentBox: {
    flexDirection: 'row',
    paddingVertical: 20,
    paddingHorizontal: 20,
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

export default Logger1;