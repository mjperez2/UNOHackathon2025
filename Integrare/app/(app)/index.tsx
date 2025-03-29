import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { Text, Card, Button } from 'react-native-paper';
import { useRouter } from 'expo-router';
import { canvasAPI, CanvasCourse } from '../api/canvasAPI';

export default function DashboardScreen() {
  const router = useRouter();
  const [courses, setCourses] = useState<CanvasCourse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadCourses();
  }, []);

  const loadCourses = async () => {
    try {
      setLoading(true);
      setError(null);
      const fetchedCourses = await canvasAPI.getCourses();
      setCourses(fetchedCourses);
    } catch (err) {
      setError('Failed to load courses. Please try again later.');
      console.error('Error loading courses:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.sectionTitle}>Your Courses</Text>
        {loading ? (
          <ActivityIndicator size="large" style={styles.loader} />
        ) : error ? (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{error}</Text>
            <Button mode="contained" onPress={loadCourses} style={styles.retryButton}>
              Retry
            </Button>
          </View>
        ) : courses.length === 0 ? (
          <Text style={styles.noCourses}>No courses found. Enroll in courses to see them here.</Text>
        ) : (
          courses.map(course => (
            <Card 
              key={course.id} 
              style={styles.card}
              onPress={() => router.push({
                pathname: '/course/[id]',
                params: { id: course.id }
              })}
            >
              <Card.Content style={styles.cardContent}>
                <Text style={styles.cardTitle}>{course.name}</Text>
                <Text style={styles.courseInfo}>{course.course_code}</Text>
                <Text style={styles.courseInfo}>
                  {new Date(course.start_at).toLocaleDateString()} - {new Date(course.end_at).toLocaleDateString()}
                </Text>
              </Card.Content>
            </Card>
          ))
        )}

        <Text style={styles.sectionTitle}>Features</Text>
        <Card style={styles.card}>
          <Card.Content style={styles.cardContent}>
            <Text style={styles.cardTitle}>Career Development</Text>
            <Text>Access career resources, alumni network, and job board</Text>
            <Button 
              mode="contained"
              onPress={() => router.push('/career')}
              style={styles.button}
            >
              View
            </Button>
          </Card.Content>
        </Card>

        <Card style={styles.card}>
          <Card.Content style={styles.cardContent}>
            <Text style={styles.cardTitle}>Collaborative Learning</Text>
            <Text>Join study groups, access shared resources, and participate in discussions</Text>
            <Button 
              mode="contained"
              onPress={() => router.push('/collaborative')}
              style={styles.button}
            >
              View
            </Button>
          </Card.Content>
        </Card>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    marginTop: 8,
    color: '#2D3748',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#2D3748',
  },
  courseInfo: {
    fontSize: 14,
    color: '#4A5568',
    marginBottom: 4,
  },
  card: {
    marginBottom: 16,
    backgroundColor: '#ffffff',
  },
  cardContent: {
    backgroundColor: '#ffffff',
  },
  button: {
    marginTop: 16,
  },
  loader: {
    marginVertical: 24,
  },
  errorContainer: {
    alignItems: 'center',
    padding: 16,
  },
  errorText: {
    color: '#E53E3E',
    marginBottom: 12,
    textAlign: 'center',
  },
  retryButton: {
    marginTop: 8,
  },
  noCourses: {
    textAlign: 'center',
    color: '#718096',
    marginVertical: 24,
  },
});
 
 