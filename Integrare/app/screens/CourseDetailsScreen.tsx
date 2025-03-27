import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ActivityIndicator, 
  FlatList,
  TouchableOpacity,
  ScrollView
} from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation';
import { canvasAPI, CanvasAssignment, CanvasAnnouncement } from '../api/canvasAPI';

type CourseDetailsScreenRouteProp = RouteProp<RootStackParamList, 'CourseDetails'>;
type CourseDetailsScreenNavigationProp = StackNavigationProp<RootStackParamList, 'CourseDetails'>;

type Props = {
  route: CourseDetailsScreenRouteProp;
  navigation: CourseDetailsScreenNavigationProp;
};

export default function CourseDetailsScreen({ route, navigation }: Props) {
  const { courseId } = route.params;
  
  const [assignments, setAssignments] = useState<CanvasAssignment[]>([]);
  const [announcements, setAnnouncements] = useState<CanvasAnnouncement[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('assignments');

  useEffect(() => {
    loadCourseData();
  }, []);

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
      console.error('Failed to load course data:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
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
        <Text style={styles.loadingText}>Loading course information...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.tabContainer}>
        <TouchableOpacity 
          style={[
            styles.tab, 
            activeTab === 'assignments' && styles.activeTab
          ]}
          onPress={() => setActiveTab('assignments')}
        >
          <Text style={[
            styles.tabText,
            activeTab === 'assignments' && styles.activeTabText
          ]}>
            Assignments
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[
            styles.tab, 
            activeTab === 'announcements' && styles.activeTab
          ]}
          onPress={() => setActiveTab('announcements')}
        >
          <Text style={[
            styles.tabText,
            activeTab === 'announcements' && styles.activeTabText
          ]}>
            Announcements
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[
            styles.tab, 
            activeTab === 'study' && styles.activeTab
          ]}
          onPress={() => setActiveTab('study')}
        >
          <Text style={[
            styles.tabText,
            activeTab === 'study' && styles.activeTabText
          ]}>
            Study Tools
          </Text>
        </TouchableOpacity>
      </View>
      
      {activeTab === 'assignments' && (
        <>
          {assignments.length > 0 ? (
            <FlatList
              data={assignments}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <View style={styles.card}>
                  <Text style={styles.assignmentTitle}>{item.name}</Text>
                  <Text style={styles.assignmentDescription}>{item.description}</Text>
                  <View style={styles.assignmentMeta}>
                    <Text style={styles.dueDate}>Due: {formatDate(item.due_at)}</Text>
                    <Text style={styles.points}>Points: {item.points_possible}</Text>
                  </View>
                </View>
              )}
            />
          ) : (
            <Text style={styles.noContent}>No assignments found for this course.</Text>
          )}
        </>
      )}
      
      {activeTab === 'announcements' && (
        <>
          {announcements.length > 0 ? (
            <FlatList
              data={announcements}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <View style={styles.card}>
                  <Text style={styles.announcementTitle}>{item.title}</Text>
                  <Text style={styles.announcementDate}>Posted: {formatDate(item.posted_at)}</Text>
                  <Text style={styles.announcementMessage}>{item.message}</Text>
                </View>
              )}
            />
          ) : (
            <Text style={styles.noContent}>No announcements found for this course.</Text>
          )}
        </>
      )}
      
      {activeTab === 'study' && (
        <ScrollView>
          <View style={styles.studyToolsContainer}>
            <Text style={styles.sectionTitle}>Collaborative Study Tools</Text>
            <Text style={styles.featureDescription}>
              These features will be implemented during the hackathon:
            </Text>
            
            <TouchableOpacity style={styles.featureCard}>
              <Text style={styles.featureTitle}>Flashcards</Text>
              <Text style={styles.featureSubtitle}>
                Create and share study flashcards with classmates
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.featureCard}>
              <Text style={styles.featureTitle}>Study Groups</Text>
              <Text style={styles.featureSubtitle}>
                Form study groups and schedule sessions
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.featureCard}>
              <Text style={styles.featureTitle}>Q&A Forum</Text>
              <Text style={styles.featureSubtitle}>
                Ask and answer questions about course content
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#4299E1',
  },
  tabText: {
    color: '#718096',
    fontWeight: '500',
  },
  activeTabText: {
    color: '#4299E1',
    fontWeight: 'bold',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    margin: 10,
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
    marginBottom: 6,
  },
  assignmentDescription: {
    fontSize: 14,
    color: '#4A5568',
    marginBottom: 10,
  },
  assignmentMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
    paddingTop: 10,
    marginTop: 4,
  },
  dueDate: {
    fontSize: 12,
    color: '#E53E3E',
  },
  points: {
    fontSize: 12,
    color: '#718096',
  },
  announcementTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2D3748',
    marginBottom: 4,
  },
  announcementDate: {
    fontSize: 12,
    color: '#718096',
    marginBottom: 8,
  },
  announcementMessage: {
    fontSize: 14,
    color: '#4A5568',
  },
  noContent: {
    textAlign: 'center',
    color: '#718096',
    padding: 20,
  },
  studyToolsContainer: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2D3748',
    marginBottom: 8,
  },
  featureDescription: {
    fontSize: 14,
    color: '#718096',
    marginBottom: 16,
  },
  featureCard: {
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
  featureTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4299E1',
    marginBottom: 4,
  },
  featureSubtitle: {
    fontSize: 14,
    color: '#718096',
    marginTop: 4,
  },
});