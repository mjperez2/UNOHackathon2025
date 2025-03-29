import React, { useState } from 'react';
import { View, StyleSheet, FlatList, TextInput } from 'react-native';
import { Card, Text, Button, Surface } from 'react-native-paper';

interface JobListing {
  id: string;
  title: string;
  company: string;
  location: string;
  type: 'internship' | 'full-time' | 'part-time';
  major: string[];
  description: string;
  postedDate: string;
  deadline: string;
}

// Mock data - replace with Firebase data later
const mockJobs: JobListing[] = [
  {
    id: '1',
    title: 'Software Engineering Intern',
    company: 'Amazon',
    location: 'Seattle, WA',
    type: 'internship',
    major: ['Computer Science', 'Software Engineering'],
    description: 'Join our team to build next-generation cloud services...',
    postedDate: '2024-03-20',
    deadline: '2024-04-20',
  },
  {
    id: '2',
    title: 'Full Stack Developer',
    company: 'StartupX',
    location: 'Remote',
    type: 'full-time',
    major: ['Computer Science', 'Information Systems'],
    description: 'Looking for a passionate developer to join our growing team...',
    postedDate: '2024-03-19',
    deadline: '2024-04-19',
  },
  // Add more mock listings as needed
];

export default function JobBoard() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string | null>(null);

  const filteredJobs = mockJobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         job.company.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = !selectedType || job.type === selectedType;
    return matchesSearch && matchesType;
  });

  const renderJobCard = ({ item }: { item: JobListing }) => (
    <Card style={styles.card}>
      <Card.Content>
        <View style={styles.header}>
          <Text style={styles.title}>{item.title}</Text>
          <Surface style={[
            styles.typeBadge,
            { backgroundColor: item.type === 'internship' ? '#E3F2FD' : '#F3E5F5' }
          ] as any}>
            <Text style={styles.typeText}>
              {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
            </Text>
          </Surface>
        </View>
        <Text style={styles.company}>{item.company}</Text>
        <Text style={styles.location}>{item.location}</Text>
        <View style={styles.majors}>
          {item.major.map(m => (
            <Surface key={m} style={styles.majorBadge}>
              <Text style={styles.majorText}>{m}</Text>
            </Surface>
          ))}
        </View>
        <Text style={styles.description}>
          {item.description}
        </Text>
        <View style={styles.footer}>
          <Text style={styles.deadline}>Deadline: {new Date(item.deadline).toLocaleDateString()}</Text>
          <Button 
            mode="contained" 
            onPress={() => {/* TODO: Implement application process */}}
            style={styles.applyButton}
          >
            Apply
          </Button>
        </View>
      </Card.Content>
    </Card>
  );

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Surface style={styles.searchBar}>
          <TextInput
            placeholder="Search jobs..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            style={styles.searchInput}
          />
        </Surface>
        <View style={styles.filterContainer}>
          <Button 
            mode={selectedType === null ? "contained" : "outlined"}
            onPress={() => setSelectedType(null)}
            style={styles.filterButton}
          >
            All
          </Button>
          <Button 
            mode={selectedType === 'internship' ? "contained" : "outlined"}
            onPress={() => setSelectedType('internship')}
            style={styles.filterButton}
          >
            Internships
          </Button>
          <Button 
            mode={selectedType === 'full-time' ? "contained" : "outlined"}
            onPress={() => setSelectedType('full-time')}
            style={styles.filterButton}
          >
            Full Time
          </Button>
        </View>
      </View>
      <FlatList
        data={filteredJobs}
        renderItem={renderJobCard}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  searchContainer: {
    padding: 16,
    backgroundColor: '#fff',
  },
  searchBar: {
    marginBottom: 12,
    borderRadius: 8,
    elevation: 2,
    backgroundColor: '#fff',
  },
  searchInput: {
    padding: 8,
    fontSize: 16,
  },
  filterContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  filterButton: {
    marginRight: 8,
  },
  list: {
    padding: 16,
  },
  card: {
    marginBottom: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
    marginRight: 8,
  },
  typeBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 16,
    elevation: 1,
    backgroundColor: '#E3F2FD',
  },
  typeText: {
    fontSize: 12,
    fontWeight: '500',
  },
  company: {
    fontSize: 16,
    color: '#666',
    marginBottom: 4,
  },
  location: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  majors: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 8,
  },
  majorBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 16,
    backgroundColor: '#E8F5E9',
    elevation: 1,
  },
  majorText: {
    fontSize: 12,
    color: '#2E7D32',
  },
  description: {
    fontSize: 14,
    marginBottom: 12,
    lineHeight: 20,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  deadline: {
    fontSize: 14,
    color: '#666',
  },
  applyButton: {
    marginLeft: 8,
  },
}); 