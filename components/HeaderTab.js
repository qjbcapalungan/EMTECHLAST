import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import firebase from '../firebaseConfig'; // Adjust the path to your Firebase config

const HeaderTab = ({ onMenuPress }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [email, setEmail] = useState(''); // State to store the user's email
  const navigation = useNavigation();

  useEffect(() => {
    // Fetch the email of the currently logged-in user
    const user = firebase.auth().currentUser;
    if (user) {
      setEmail(user.email); // Set the email in state
    }
  }, []);

  const handleLogout = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        Alert.alert('Logout', 'You have been logged out.');
        navigation.replace('Login'); // Navigate back to login
      })
      .catch((error) => {
        console.error('Logout Error:', error);
        Alert.alert('Error', 'Failed to log out. Please try again.');
      });
  };

  return (
    <View style={styles.headerContainer}>
      <Text style={styles.headerTitle}></Text>
      <TouchableOpacity
        onPress={() => setModalVisible(true)}
        style={styles.iconContainer}
      >
        <Ionicons name="person-circle-outline" size={30} color="white" />
      </TouchableOpacity>

      {/* Modal for user information and menu */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>User Information</Text>
              <TouchableOpacity
                onPress={() => setModalVisible(false)}
                style={styles.closeButton}
              >
                <Ionicons name="close" size={24} color="white" />
              </TouchableOpacity>
            </View>

            <View style={styles.userDetails}>
              <Ionicons name="person-circle-outline" size={80} color="white" />
              <Text style={styles.userInfo}>Email: {email}</Text>
            </View>

            <View style={styles.actionButtons}>
              <TouchableOpacity
                style={styles.logoutButton}
                onPress={handleLogout}
              >
                <Text style={styles.buttonText}>Logout</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 60,
    paddingHorizontal: 16,
    backgroundColor: '#04364A',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  iconContainer: {
    padding: 5,
  },
  modalContainer: {
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '90%',
    backgroundColor: '#D4EDDA',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    borderRadius: 35,
  },
  modalHeader: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'black',
  },
  closeButton: {
    backgroundColor: '#FF6347',
    borderRadius: 20,
    padding: 5,
  },
  userDetails: {
    alignItems: 'center',
    marginBottom: 20,
  },
  userInfo: {
    fontSize: 16,
    color: 'black',
    marginTop: 10,
  },
  actionButtons: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  logoutButton: {
    backgroundColor: '#FF6347',
    padding: 10,
    borderRadius: 5,
    width: '40%',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default HeaderTab;
