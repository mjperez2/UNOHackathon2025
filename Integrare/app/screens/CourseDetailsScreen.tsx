import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ActivityIndicator, 
  FlatList,
  TouchableOpacity,
  ScrollView,
  RefreshControl
} from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { canvasAPI, CanvasAssignment, CanvasAnnouncement } from '../api/canvasAPI';

export default function CourseDetailsScreen() {
  const params = useLocalSearchParams<{ id: string; name: string }>();
  const courseId = parseInt(params.id);
  const courseName = params.name;

  const [assignments, setAssignments] = useState<CanvasAssignment[]>([]);
  const [announcements, setAnnouncements] = useState<CanvasAnnouncement[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadCourseData();
  }, [courseId]);

  const loadCourseData = async () => {
    try {
      setLoading(true);
      const [assignmentsData, announcementsData] = await Promise.all([
        canvasAPI.getAssignmentsForCourse(courseId),
        canvasAPI.getAnnouncementsForCourse(courseId)
      ]);
      setAssignments(assignmentsData);
      setAnnouncements(announcementsData);
    } catch (error) {
      console.error('Error loading course data:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    loadCourseData();
  };

  const formatDate = (dateString: string) => {
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
      <Text style={styles.courseTitle}>{courseName}</Text>

      {/* Announcements Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Announcements</Text>
        {announcements.map(announcement => (
          <View key={announcement.id} style={styles.announcementCard}>
            <Text style={styles.announcementTitle}>{announcement.title}</Text>
            <Text style={styles.announcementContent}>{announcement.message}</Text>
            <Text style={styles.announcementDate}>
              Posted: {formatDate(announcement.posted_at)}
            </Text>
          </View>
        ))}
      </View>

      {/* Assignments Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Assignments</Text>
        {assignments.map(assignment => (
          <TouchableOpacity
            key={assignment.id}
            style={styles.assignmentCard}
            onPress={() => {/* TODO: Navigate to assignment details */}}
          >
            <Text style={styles.assignmentTitle}>{assignment.name}</Text>
            <Text style={styles.assignmentDue}>
              Due: {formatDate(assignment.due_at)}
            </Text>
          </TouchableOpacity>
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
  courseTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    padding: 16,
    backgroundColor: '#fff',
    marginBottom: 8,
  },
  section: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  announcementCard: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  announcementTitle: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 8,
  },
  announcementContent: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  announcementDate: {
    fontSize: 12,
    color: '#999',
  },
  assignmentCard: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  assignmentTitle: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },
  assignmentDue: {
    fontSize: 14,
    color: '#4299E1',
  },
});