import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Avatar, Card, List, Button, useTheme } from 'react-native-paper';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';

type Props = NativeStackScreenProps<RootStackParamList, 'Profile'>;

// Mock user data - replace with actual user data from your backend
const mockUser = {
  id: '1',
  name: 'John Doe',
  email: 'john.doe@example.com',
  major: 'Computer Science',
  year: 3,
  courses: []
};

const ProfileScreen: React.FC<Props> = ({ navigation }) => {
  const theme = useTheme();

  return (
    <ScrollView style={styles.container}>
      {/* Profile Header */}
      <View style={styles.header}>
        <Avatar.Text 
          size={80} 
          label={mockUser.name.split(' ').map(n => n[0]).join('')} 
          style={styles.avatar}
        />
        <Text style={styles.name}>{mockUser.name}</Text>
        <Text style={styles.email}>{mockUser.email}</Text>
      </View>

      {/* Academic Information */}
      <Card style={styles.card}>
        <Card.Content>
          <Text style={styles.sectionTitle}>Academic Information</Text>
          <List.Item
            title="Major"
            description={mockUser.major}
            left={props => <List.Icon {...props} icon="school" />}
          />
          <List.Item
            title="Year"
            description={`${mockUser.year}${mockUser.year === 1 ? 'st' : mockUser.year === 2 ? 'nd' : mockUser.year === 3 ? 'rd' : 'th'} Year`}
            left={props => <List.Icon {...props} icon="calendar" />}
          />
          <List.Item
            title="Courses"
            description={`${mockUser.courses.length} enrolled`}
            left={props => <List.Icon {...props} icon="book" />}
          />
        </Card.Content>
      </Card>

      {/* Career Development */}
      <Card style={styles.card}>
        <Card.Content>
          <Text style={styles.sectionTitle}>Career Development</Text>
          <List.Item
            title="Resume"
            description="View and edit your resume"
            left={props => <List.Icon {...props} icon="file-document" />}
            onPress={() => {}}
          />
          <List.Item
            title="Portfolio"
            description="Manage your portfolio"
            left={props => <List.Icon {...props} icon="briefcase" />}
            onPress={() => {}}
          />
          <List.Item
            title="Career Goals"
            description="Set and track your career goals"
            left={props => <List.Icon {...props} icon="target" />}
            onPress={() => {}}
          />
        </Card.Content>
      </Card>

      {/* Settings */}
      <Card style={styles.card}>
        <Card.Content>
          <Text style={styles.sectionTitle}>Settings</Text>
          <List.Item
            title="Notifications"
            description="Manage notification preferences"
            left={props => <List.Icon {...props} icon="bell" />}
            onPress={() => {}}
          />
          <List.Item
            title="Privacy"
            description="Privacy and security settings"
            left={props => <List.Icon {...props} icon="shield-lock" />}
            onPress={() => {}}
          />
          <List.Item
            title="Account"
            description="Manage your account settings"
            left={props => <List.Icon {...props} icon="account-cog" />}
            onPress={() => {}}
          />
        </Card.Content>
      </Card>

      {/* Logout Button */}
      <Button
        mode="outlined"
        onPress={() => navigation.navigate('Login')}
        style={styles.logoutButton}
      >
        Logout
      </Button>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  avatar: {
    marginBottom: 10,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  email: {
    fontSize: 16,
    color: '#666',
  },
  card: {
    margin: 10,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
  },
  logoutButton: {
    margin: 20,
  },
});

export default ProfileScreen; 