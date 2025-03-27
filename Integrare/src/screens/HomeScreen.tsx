import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Card, FAB, useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList, Course } from '../types';

type HomeScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, 'Home'>;
};

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const theme = useTheme();

  const renderCourseCard = (course: Course) => (
    <Card
      key={course.id}
      style={styles.card}
      onPress={() => navigation.navigate('Course', { courseId: course.id })}
    >
      <Card.Content>
        <Text style={styles.courseTitle}>{course.name}</Text>
        <Text style={styles.courseCode}>{course.code}</Text>
        <Text style={styles.courseInstructor}>Instructor: {course.instructor}</Text>
      </Card.Content>
    </Card>
  );

  // Mock data for demonstration
  const mockCourses: Course[] = [
    { 
      id: 1, 
      name: 'Introduction to Computer Science', 
      code: 'CS101', 
      instructor: 'Dr. Smith',
      description: 'An introduction to programming',
      schedule: 'Mon/Wed 10:00 AM',
      location: 'Room 101',
      assignments: [],
      studyGroups: []
    },
    { 
      id: 2, 
      name: 'Data Structures', 
      code: 'CS201', 
      instructor: 'Prof. Johnson',
      description: 'Advanced data structures and algorithms',
      schedule: 'Tue/Thu 2:00 PM',
      location: 'Room 202',
      assignments: [],
      studyGroups: []
    },
    { 
      id: 3, 
      name: 'Software Engineering', 
      code: 'CS301', 
      instructor: 'Dr. Williams',
      description: 'Software development methodologies',
      schedule: 'Mon/Wed 3:30 PM',
      location: 'Room 303',
      assignments: [],
      studyGroups: []
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <Text style={styles.welcomeText}>Welcome to Integrare</Text>
          <Text style={styles.subtitle}>Your Academic Hub</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Your Courses</Text>
          {mockCourses.map(renderCourseCard)}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Study Groups</Text>
          <Card style={styles.card}>
            <Card.Content>
              <Text style={styles.cardTitle}>CS101 Study Group</Text>
              <Text>Next meeting: Tomorrow at 2 PM</Text>
            </Card.Content>
          </Card>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Upcoming Deadlines</Text>
          <Card style={styles.card}>
            <Card.Content>
              <Text style={styles.cardTitle}>CS201 Project</Text>
              <Text>Due: Friday, 5 PM</Text>
            </Card.Content>
          </Card>
        </View>
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
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  subtitle: {
    fontSize: 16,
    color: '#fff',
    opacity: 0.8,
  },
  section: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
  },
  card: {
    marginBottom: 16,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  courseTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  courseCode: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  courseInstructor: {
    fontSize: 14,
    color: '#666',
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});

export default HomeScreen; 