import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text } from 'react-native-paper';

// Import our components
import AlumniNetwork from '../components/AlumniNetwork';
import JobBoard from '../components/JobBoard';
import Portfolio from '../components/Portfolio';

export default function CareerScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Job Board</Text>
        <JobBoard />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Alumni Network</Text>
        <AlumniNetwork />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Portfolio</Text>
        <Portfolio />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  section: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#2D3748',
  },
}); 