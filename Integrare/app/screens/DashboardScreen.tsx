import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  FlatList, 
  StyleSheet, 
  TouchableOpacity, 
  ActivityIndicator,
  RefreshControl
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation';
import { canvasAPI, CanvasCourse, CanvasAssignment } from '../api/canvasAPI';

type DashboardScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Dashboard'>;

type Props = {
  navigation: DashboardScreenNavigationProp;
};

export default function DashboardScreen({ navigation }: Props) {
  const [courses, setCourses] = useState<CanvasCourse[]>([]);
  const [upcomingAssignments, setUpcomingAssignments] = useState<CanvasAssignment[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      const [coursesData, assignmentsData] = await Promise.all([
        canvasAPI.getCourses(),
        canvasAPI.getUpcomingAssignments()
      ]);
      
      setCourses(coursesData);
      setUpcomingAssignments(assignmentsData.slice(0, 5)); // Show only top 5
    } catch (error) {
      console.error('Failed to load dashboard data:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    loadDashboardData();
  };

  const formatDueDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4299E1" />
        <Text style={styles.loadingText}>Loading your dashboard...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <RefreshControl refreshing={refreshing} onRefresh={onRefresh}>
        <Text style={styles.sectionTitle}>Upcoming Assignments</Text>
        
        {upcomingAssignments.length > 0 ? (
          <View style={styles.assignmentsContainer}>
            {upcomingAssignments.map((assignment) => (
              <View key={assignment.id} style={styles.assignmentCard}>
                <Text style={styles.assignmentTitle}>{assignment.name}</Text>
                <Text style={styles.courseName}>
                  {courses.find(c => c.id === assignment.course_id)?.name || 'Unknown Course'}
                </Text>
                <Text style={styles.dueDate}>Due: {formatDueDate(assignment.due_at)}</Text>
              </View>
            ))}
          </View>
        ) : (
          <Text style={styles.noContent}>No upcoming assignments</Text>
        )}
        
        <Text style={styles.sectionTitle}>My Courses</Text>
        
        <FlatList
          data={courses}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity 
              style={styles.courseCard}
              onPress={() => navigation.navigate('CourseDetails', { 
                courseId: item.id, 
                courseName: item.name 
              })}
            >
              <Text style={styles.courseCode}>{item.course_code}</Text>
              <Text style={styles.courseName}>{item.name}</Text>
              <View style={styles.cardFooter}>
                <Text style={styles.viewDetails}>View details →</Text>
              </View>
            </TouchableOpacity>
          )}
          contentContainerStyle={styles.listContainer}
        />
      </RefreshControl>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 16,
    color: '#718096',
    fontSize: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 12,
    color: '#2D3748',
  },
  assignmentsContainer: {
    marginBottom: 10,
  },
  assignmentCard: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  assignmentTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2D3748',
    marginBottom: 4,
  },
  dueDate: {
    fontSize: 14,
    color: '#E53E3E',
    marginTop: 4,
  },
  noContent: {
    textAlign: 'center',
    color: '#718096',
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 20,
  },
  listContainer: {
    paddingBottom: 20,
  },
  courseCard: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  courseCode: {
    fontSize: 14,
    color: '#718096',
    marginBottom: 4,
  },
  courseName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2D3748',
    marginBottom: 4,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
  },
  viewDetails: {
    color: '#4299E1',
    fontWeight: 'bold',
  },
});
