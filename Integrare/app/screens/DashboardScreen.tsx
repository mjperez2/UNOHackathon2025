import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  FlatList, 
  StyleSheet, 
  TouchableOpacity, 
  ActivityIndicator,
  RefreshControl,
  ScrollView,
  Pressable
} from 'react-native';
import { useRouter } from 'expo-router';
import { canvasAPI, CanvasCourse, CanvasAssignment, CanvasAnnouncement } from '../api/canvasAPI';
import { Button, Card, List } from 'react-native-paper';

export default function DashboardScreen() {
  const router = useRouter();
  const [courses, setCourses] = useState<CanvasCourse[]>([]);
  const [assignments, setAssignments] = useState<CanvasAssignment[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [hoveredCourseId, setHoveredCourseId] = useState<number | null>(null);
  const [courseDetails, setCourseDetails] = useState<{
    [key: number]: {
      assignments: CanvasAssignment[];
      announcements: CanvasAnnouncement[];
    }
  }>({});

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

  const loadCourseDetails = async (course: CanvasCourse) => {
    try {
      if (!courseDetails[course.id]) {
        const [assignmentsData, announcementsData] = await Promise.all([
          canvasAPI.getAssignmentsForCourse(course.id),
          canvasAPI.getAnnouncementsForCourse(course.id)
        ]);
        setCourseDetails(prev => ({
          ...prev,
          [course.id]: {
            assignments: assignmentsData,
            announcements: announcementsData
          }
        }));
      }
      setHoveredCourseId(course.id);
    } catch (error) {
      console.error('Error loading course details:', error);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    loadDashboardData();
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  const getCourseDescription = (course: CanvasCourse) => {
    const startDate = new Date(course.start_at).toLocaleDateString();
    const endDate = new Date(course.end_at).toLocaleDateString();
    return `${course.course_code}\n${startDate} - ${endDate}`;
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
        {courses.map(course => (
          <View key={course.id} style={styles.courseContainer}>
            <Pressable
              style={[
                styles.courseCard,
                hoveredCourseId === course.id && styles.courseCardHovered
              ]}
              onHoverIn={() => loadCourseDetails(course)}
              onHoverOut={() => setHoveredCourseId(null)}
              onPress={() => router.push({
                pathname: '/course/[id]',
                params: {
                  id: course.id,
                  name: course.name
                }
              })}
            >
              <Text style={styles.courseName}>{course.name}</Text>
              <Text style={styles.courseDescription}>
                {getCourseDescription(course)}
              </Text>
            </Pressable>

            {hoveredCourseId === course.id && courseDetails[course.id] && (
              <View style={styles.courseDetailsContainer}>
                {/* Announcements Section */}
                <View style={styles.detailsSection}>
                  <Text style={styles.detailsSectionTitle}>Announcements</Text>
                  {courseDetails[course.id].announcements.map(announcement => (
                    <Card key={announcement.id} style={styles.detailsCard}>
                      <Card.Content>
                        <Text style={styles.detailsCardTitle}>{announcement.title}</Text>
                        <Text style={styles.detailsCardContent}>{announcement.message}</Text>
                        <Text style={styles.detailsCardDate}>
                          Posted: {formatDate(announcement.posted_at)}
                        </Text>
                      </Card.Content>
                    </Card>
                  ))}
                </View>

                {/* Assignments Section */}
                <View style={styles.detailsSection}>
                  <Text style={styles.detailsSectionTitle}>Assignments</Text>
                  {courseDetails[course.id].assignments.map(assignment => (
                    <Card key={assignment.id} style={styles.detailsCard}>
                      <Card.Content>
                        <Text style={styles.detailsCardTitle}>{assignment.name}</Text>
                        <Text style={styles.detailsCardContent}>{assignment.description}</Text>
                        <Text style={styles.detailsCardDate}>
                          Due: {formatDate(assignment.due_at)}
                        </Text>
                      </Card.Content>
                    </Card>
                  ))}
                </View>
              </View>
            )}
          </View>
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
  courseContainer: {
    marginBottom: 16,
  },
  courseCard: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  courseCardHovered: {
    backgroundColor: '#f8f9fa',
    transform: [{ scale: 1.02 }],
  },
  courseDetailsContainer: {
    marginTop: 8,
    padding: 16,
    backgroundColor: '#e6f3ff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  detailsSection: {
    marginBottom: 16,
  },
  detailsSectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#2d3748',
  },
  detailsCard: {
    marginBottom: 8,
    backgroundColor: '#f0f7ff',
  },
  detailsCardTitle: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
    color: '#2d3748',
  },
  detailsCardContent: {
    fontSize: 14,
    color: '#4a5568',
    marginBottom: 4,
  },
  detailsCardDate: {
    fontSize: 12,
    color: '#718096',
  },
  courseName: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 8,
  },
  courseDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
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