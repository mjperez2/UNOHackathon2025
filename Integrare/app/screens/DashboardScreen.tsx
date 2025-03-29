import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  FlatList, 
  StyleSheet, 
  TouchableOpacity, 
  ActivityIndicator,
  RefreshControl,
  ScrollView
} from 'react-native';
import { useRouter } from 'expo-router';
import { canvasAPI, CanvasCourse, CanvasAssignment } from '../api/canvasAPI';
import { Button, Card } from 'react-native-paper';

export default function DashboardScreen() {
  const router = useRouter();
  const [courses, setCourses] = useState<CanvasCourse[]>([]);
  const [assignments, setAssignments] = useState<CanvasAssignment[]>([]);
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
      setAssignments(assignmentsData);
    } catch (error) {
      console.error('Error loading dashboard data:', error);
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
    return new Date(dateString).toLocaleDateString();
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#4299E1" />
      </View>
    );
  }

  return (
    <ScrollView 
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      {/* Feature Navigation Cards */}
      <View style={styles.featureCards}>
        <Card style={styles.featureCard} onPress={() => router.push('/career')}>
          <Card.Content>
            <Text style={styles.featureTitle}>Career Development</Text>
            <Text style={styles.featureSubtitle}>Connect with alumni and find opportunities</Text>
          </Card.Content>
        </Card>

        <Card style={styles.featureCard} onPress={() => router.push('/collaborative')}>
          <Card.Content>
            <Text style={styles.featureTitle}>Collaborative Learning</Text>
            <Text style={styles.featureSubtitle}>Study tools and shared resources</Text>
          </Card.Content>
        </Card>
      </View>

      {/* Courses Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Your Courses</Text>
        <FlatList
          data={courses}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.courseCard}
              onPress={() => router.push({
                pathname: '/course/[id]',
                params: {
                  id: item.id,
                  name: item.name
                }
              })}
            >
              <Text style={styles.courseName}>{item.name}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={item => item.id.toString()}
        />
      </View>

      {/* Upcoming Assignments Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Upcoming Assignments</Text>
        {assignments.map(assignment => (
          <Card key={assignment.id} style={styles.assignmentCard}>
            <Card.Content>
              <Text style={styles.assignmentTitle}>{assignment.name}</Text>
              <Text style={styles.assignmentCourse}>
                {courses.find(c => c.id === assignment.course_id)?.name || 'Unknown Course'}
              </Text>
              <Text style={styles.assignmentDue}>Due: {formatDueDate(assignment.due_at)}</Text>
            </Card.Content>
          </Card>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  featureCards: {
    padding: 16,
    gap: 16,
  },
  featureCard: {
    marginBottom: 8,
  },
  featureTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  featureSubtitle: {
    fontSize: 14,
    color: '#666',
  },
  section: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  courseCard: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    marginRight: 12,
    width: 200,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  courseName: {
    fontSize: 16,
    fontWeight: '500',
  },
  assignmentCard: {
    marginBottom: 8,
  },
  assignmentTitle: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },
  assignmentCourse: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  assignmentDue: {
    fontSize: 14,
    color: '#4299E1',
  },
});