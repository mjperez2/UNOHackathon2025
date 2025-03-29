import React from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity, Text } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

// Import our components
import AlumniNetwork from '../components/AlumniNetwork';
import JobBoard from '../components/JobBoard';
import Portfolio from '../components/Portfolio';

type Section = {
  id: string;
  title: string;
  component: React.ComponentType;
};

const sections: Section[] = [
  { id: '1', title: 'Job Board', component: JobBoard },
  { id: '2', title: 'Alumni Network', component: AlumniNetwork },
  { id: '3', title: 'Portfolio', component: Portfolio },
];

export default function CareerScreen() {
  const router = useRouter();

  const renderSection = ({ item }: { item: Section }) => {
    const Component = item.component;
    return (
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{item.title}</Text>
        <Component />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Career Development</Text>
      </View>
      <FlatList
        data={sections}
        renderItem={renderSection}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.contentContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#fff',
    elevation: 0,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    paddingTop: 24,
  },
  backButton: {
    padding: 8,
    marginRight: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  contentContainer: {
    paddingBottom: 20,
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