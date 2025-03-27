import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, ScrollView } from 'react-native';
import { Card, Text, Button, FAB, TextInput, List, Surface } from 'react-native-paper';
import { canvasAPI, StudyGroup, StudyGroupSchedule } from '../api/canvasAPI';

const DAYS_OF_WEEK = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export default function StudyGroups({ courseId }: { courseId?: number }) {
  const [groups, setGroups] = useState<StudyGroup[]>([]);
  const [loading, setLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
  const [newGroup, setNewGroup] = useState<Partial<StudyGroup>>({
    name: '',
    description: '',
    members: [],
    schedule: [],
  });
  const [newSchedule, setNewSchedule] = useState<Partial<StudyGroupSchedule>>({
    day_of_week: 1,
    start_time: '09:00',
    end_time: '10:30',
    location: '',
    recurring: true,
  });

  useEffect(() => {
    loadGroups();
  }, [courseId]);

  const loadGroups = async () => {
    try {
      setLoading(true);
      const data = await canvasAPI.getStudyGroups(courseId);
      setGroups(data);
    } catch (error) {
      console.error('Error loading study groups:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateGroup = async () => {
    if (newGroup.name && newGroup.description) {
      try {
        const group = await canvasAPI.createStudyGroup({
          ...newGroup as Omit<StudyGroup, 'id' | 'created_at'>,
          course_id: courseId || 0,
          created_by: 'Current User', // TODO: Get actual user
        });
        setGroups([...groups, group]);
        setIsCreating(false);
        setNewGroup({
          name: '',
          description: '',
          members: [],
          schedule: [],
        });
      } catch (error) {
        console.error('Error creating study group:', error);
      }
    }
  };

  const handleAddSchedule = async (groupId: string) => {
    if (newSchedule.location) {
      try {
        const updatedGroup = await canvasAPI.updateStudyGroup(groupId, {
          schedule: [...(groups.find(g => g.id === groupId)?.schedule || []), newSchedule as StudyGroupSchedule],
        });
        setGroups(groups.map(g => g.id === groupId ? updatedGroup : g));
        setNewSchedule({
          day_of_week: 1,
          start_time: '09:00',
          end_time: '10:30',
          location: '',
          recurring: true,
        });
      } catch (error) {
        console.error('Error adding schedule:', error);
      }
    }
  };

  const renderGroupCard = ({ item }: { item: StudyGroup }) => (
    <Card style={styles.card}>
      <Card.Content>
        <View style={styles.header}>
          <Text style={styles.title}>{item.name}</Text>
          <Button
            mode="text"
            onPress={() => handleAddSchedule(item.id)}
            style={styles.addButton}
          >
            Add Schedule
          </Button>
        </View>
        <Text style={styles.description}>{item.description}</Text>
        
        <View style={styles.scheduleSection}>
          <Text style={styles.sectionTitle}>Schedule</Text>
          {item.schedule.map(schedule => (
            <List.Item
              key={schedule.id}
              title={`${DAYS_OF_WEEK[schedule.day_of_week]} ${schedule.start_time} - ${schedule.end_time}`}
              description={schedule.location}
              left={props => <List.Icon {...props} icon="calendar" />}
            />
          ))}
        </View>

        <View style={styles.membersSection}>
          <Text style={styles.sectionTitle}>Members</Text>
          <Text>{item.members.length} members</Text>
        </View>
      </Card.Content>
    </Card>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={groups}
        renderItem={renderGroupCard}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
        refreshing={loading}
        onRefresh={loadGroups}
      />

      {isCreating && (
        <Surface style={styles.modal}>
          <Text style={styles.modalTitle}>Create Study Group</Text>
          <TextInput
            label="Group Name"
            value={newGroup.name}
            onChangeText={name => setNewGroup({ ...newGroup, name })}
            style={styles.input}
          />
          <TextInput
            label="Description"
            value={newGroup.description}
            onChangeText={description => setNewGroup({ ...newGroup, description })}
            style={styles.input}
          />
          <View style={styles.buttonContainer}>
            <Button 
              mode="outlined" 
              onPress={() => setIsCreating(false)}
              style={styles.cancelButton}
            >
              Cancel
            </Button>
            <Button 
              mode="contained" 
              onPress={handleCreateGroup}
              style={styles.createButton}
            >
              Create Group
            </Button>
          </View>
        </Surface>
      )}

      <FAB
        icon="plus"
        style={styles.fab}
        onPress={() => setIsCreating(true)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  list: {
    padding: 16,
  },
  card: {
    marginBottom: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
  },
  scheduleSection: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 8,
  },
  membersSection: {
    marginTop: 8,
  },
  modal: {
    backgroundColor: 'white',
    padding: 20,
    margin: 20,
    borderRadius: 8,
    elevation: 4,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  input: {
    marginBottom: 12,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 8,
  },
  cancelButton: {
    marginRight: 8,
  },
  createButton: {
    marginLeft: 8,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
  addButton: {
    marginLeft: 8,
  },
}); 