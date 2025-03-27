import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Card, Button, FAB, useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList, Course } from '../types';

type CourseScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, 'Course'>;
  route: RouteProp<RootStackParamList, 'Course'>;
};

type TabType = 'overview' | 'assignments' | 'studyGroups';

const CourseScreen: React.FC<CourseScreenProps> = ({ route, navigation }) => {
  const theme = useTheme();
  const { courseId } = route.params;
  const [activeTab, setActiveTab] = useState<TabType>('overview');

  // Mock data for demonstration
  const course: Course = {
    id: courseId,
    name: 'Introduction to Computer Science',
    code: 'CS101',
    instructor: 'Dr. Smith',
    description: 'An introduction to the fundamental concepts of computer science and programming.',
    schedule: 'Mon/Wed 10:00 AM - 11:30 AM',
    location: 'Room 101',
    assignments: [
      { id: 1, title: 'Programming Assignment 1', dueDate: '2024-04-01', status: 'pending' },
      { id: 2, title: 'Midterm Project', dueDate: '2024-04-15', status: 'pending' },
    ],
    studyGroups: [
      { id: 1, name: 'Monday Study Group', time: '2:00 PM', members: 5 },
      { id: 2, name: 'Wednesday Review', time: '4:00 PM', members: 3 },
    ],
  };

  const renderOverview = (): JSX.Element => (
    <View style={styles.section}>
      <Card style={styles.card}>
        <Card.Content>
          <Text style={styles.sectionTitle}>Course Information</Text>
          <Text style={styles.infoText}>Schedule: {course.schedule}</Text>
          <Text style={styles.infoText}>Location: {course.location}</Text>
          <Text style={styles.infoText}>Instructor: {course.instructor}</Text>
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <Text style={styles.sectionTitle}>Description</Text>
          <Text style={styles.description}>{course.description}</Text>
        </Card.Content>
      </Card>
    </View>
  );

  const renderAssignments = (): JSX.Element => (
    <View style={styles.section}>
      {course.assignments.map((assignment) => (
        <Card key={assignment.id} style={styles.card}>
          <Card.Content>
            <Text style={styles.cardTitle}>{assignment.title}</Text>
            <Text style={styles.infoText}>Due: {assignment.dueDate}</Text>
            <Text style={styles.infoText}>Status: {assignment.status}</Text>
          </Card.Content>
        </Card>
      ))}
    </View>
  );

  const renderStudyGroups = (): JSX.Element => (
    <View style={styles.section}>
      {course.studyGroups.map((group) => (
        <Card key={group.id} style={styles.card}>
          <Card.Content>
            <Text style={styles.cardTitle}>{group.name}</Text>
            <Text style={styles.infoText}>Time: {group.time}</Text>
            <Text style={styles.infoText}>Members: {group.members}</Text>
          </Card.Content>
        </Card>
      ))}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <Text style={styles.courseCode}>{course.code}</Text>
          <Text style={styles.courseName}>{course.name}</Text>
        </View>

        <View style={styles.tabs}>
          <Button
            mode={activeTab === 'overview' ? 'contained' : 'outlined'}
            onPress={() => setActiveTab('overview')}
            style={styles.tabButton}
          >
            Overview
          </Button>
          <Button
            mode={activeTab === 'assignments' ? 'contained' : 'outlined'}
            onPress={() => setActiveTab('assignments')}
            style={styles.tabButton}
          >
            Assignments
          </Button>
          <Button
            mode={activeTab === 'studyGroups' ? 'contained' : 'outlined'}
            onPress={() => setActiveTab('studyGroups')}
            style={styles.tabButton}
          >
            Study Groups
          </Button>
        </View>

        {activeTab === 'overview' && renderOverview()}
        {activeTab === 'assignments' && renderAssignments()}
        {activeTab === 'studyGroups' && renderStudyGroups()}
      </ScrollView>

      <FAB
        style={styles.fab}
        icon="plus"
        onPress={() => {
          // TODO: Implement new study group creation
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    padding: 16,
    backgroundColor: '#6200ee',
  },
  courseCode: {
    fontSize: 20,
    color: '#fff',
    opacity: 0.8,
  },
  courseName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  tabs: {
    flexDirection: 'row',
    padding: 8,
    backgroundColor: '#fff',
    elevation: 2,
  },
  tabButton: {
    flex: 1,
    marginHorizontal: 4,
  },
  section: {
    padding: 16,
  },
  card: {
    marginBottom: 16,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  infoText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});

export default CourseScreen; 