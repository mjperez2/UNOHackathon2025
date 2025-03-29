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
import { useLocalSearchParams, useRouter } from 'expo-router';
import { canvasAPI, CanvasAssignment, CanvasAnnouncement } from '../api/canvasAPI';
import { Ionicons } from '@expo/vector-icons';

export default function CourseDetailsScreen() {
  const router = useRouter();
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
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity 
            onPress={() => router.back()}
            style={styles.backButton}
          >
            <Ionicons name="arrow-back" size={24} color="#000" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{courseName}</Text>
        </View>
        <View style={styles.centered}>
          <ActivityIndicator size="large" color="#4299E1" />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{courseName}</Text>
      </View>
      <ScrollView 
        style={styles.content}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
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
    flex: 1,
  },
  content: {
    flex: 1,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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