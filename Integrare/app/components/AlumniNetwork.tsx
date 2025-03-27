import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { Card, Text, Avatar, Button } from 'react-native-paper';

interface AlumniProfile {
  id: string;
  name: string;
  graduationYear: number;
  currentRole: string;
  company: string;
  major: string;
  bio: string;
}

// Mock data - replace with Firebase data later
const mockAlumni: AlumniProfile[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    graduationYear: 2020,
    currentRole: 'Software Engineer',
    company: 'Google',
    major: 'Computer Science',
    bio: 'Passionate about building scalable applications and mentoring students.',
  },
  {
    id: '2',
    name: 'Michael Chen',
    graduationYear: 2019,
    currentRole: 'Product Manager',
    company: 'Microsoft',
    major: 'Business & Computer Science',
    bio: 'Leading product development for cloud services.',
  },
  // Add more mock profiles as needed
];

export default function AlumniNetwork() {
  const renderAlumniCard = ({ item }: { item: AlumniProfile }) => (
    <Card style={styles.card}>
      <Card.Content>
        <View style={styles.header}>
          <Avatar.Text 
            size={50} 
            label={item.name.split(' ').map(n => n[0]).join('')} 
            style={styles.avatar}
          />
          <View style={styles.headerText}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.role}>{item.currentRole} at {item.company}</Text>
          </View>
        </View>
        <View style={styles.details}>
          <Text style={styles.detail}>Class of {item.graduationYear}</Text>
          <Text style={styles.detail}>Major: {item.major}</Text>
        </View>
        <Text style={styles.bio}>{item.bio}</Text>
        <Button 
          mode="contained" 
          onPress={() => {/* TODO: Implement connection request */}}
          style={styles.connectButton}
        >
          Connect
        </Button>
      </Card.Content>
    </Card>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={mockAlumni}
        renderItem={renderAlumniCard}
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
  list: {
    padding: 16,
  },
  card: {
    marginBottom: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  avatar: {
    marginRight: 12,
  },
  headerText: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  role: {
    fontSize: 14,
    color: '#666',
  },
  details: {
    marginBottom: 8,
  },
  detail: {
    fontSize: 14,
    color: '#666',
    marginBottom: 2,
  },
  bio: {
    fontSize: 14,
    marginBottom: 12,
    lineHeight: 20,
  },
  connectButton: {
    marginTop: 8,
  },
}); 