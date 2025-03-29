import React, { useState } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { Card, Text, Button, FAB, TextInput, Avatar, Surface } from 'react-native-paper';

interface StudyGroup {
  id: string;
  name: string;
  course: string;
  description: string;
  members: string[];
  meetingTime: string;
  location: string;
  capacity: number;
  tags: string[];
}

// Mock data - replace with Firebase data later
const mockStudyGroups: StudyGroup[] = [
  {
    id: '1',
    name: 'Data Structures Study Squad',
    course: 'CSCI 2125 - Introduction to Data Structures',
    description: 'Weekly study sessions focusing on programming fundamentals and algorithms.',
    members: ['Alice Johnson', 'Bob Wilson', 'Charlie Brown'],
    meetingTime: 'Tuesdays 4:00 PM',
    location: 'Library Room 417',
    capacity: 6,
    tags: ['Programming', 'Algorithms', 'Beginners'],
  },
  {
    id: '2',
    name: 'Machine Learning Study Group',
    course: 'CSCI 3000 - Machine Learning',
    description: 'Intensive study group for machine learning concepts and applications.',
    members: ['David Smith', 'Eva Martinez', 'Frank Lee'],
    meetingTime: 'Wednesdays 5:30 PM',
    location: 'Math Building 302',
    capacity: 5,
    tags: ['Data Structures', 'Advanced', 'Java'],
  },
  {
    id: '3',
    name: 'Operating Systems Study Group',
    course: 'CSCI 4000 - Operating Systems',
    description: 'Intensive study group for operating systems concepts and applications.',
    members: ['Grace Kim', 'Henry Chen', 'Isabel Rodriguez'],
    meetingTime: 'Thursdays 3:00 PM',
    location: 'Engineering Lab 105',
    capacity: 8,
    tags: ['Operating Systems', 'Advanced', 'Linux'],
  },
  {
    id: '4',
    name: 'Networking Study Group',
    course: 'CSCI 4000 - Networking',
    description: 'Intensive study group for networking concepts and applications.',
    members: ['Jack Thompson', 'Kelly White'],
    meetingTime: 'Fridays 2:00 PM',
    location: 'Virtual (Zoom)',
    capacity: 6,
    tags: ['Networking', 'Advanced', 'TCP/IP'],
  },
];

export default function StudyGroups() {
  const [groups, setGroups] = useState(mockStudyGroups);
  const [isCreating, setIsCreating] = useState(false);
  const [newGroup, setNewGroup] = useState<Partial<StudyGroup>>({
    name: '',
    course: '',
    description: '',
    meetingTime: '',
    location: '',
    capacity: 6,
    tags: [],
  });

  const handleCreate = () => {
    if (newGroup.name && newGroup.course && newGroup.description) {
      const group: StudyGroup = {
        id: Date.now().toString(),
        name: newGroup.name,
        course: newGroup.course,
        description: newGroup.description,
        members: ['Current User'], // TODO: Get actual user
        meetingTime: newGroup.meetingTime || 'TBD',
        location: newGroup.location || 'TBD',
        capacity: newGroup.capacity || 6,
        tags: newGroup.tags || [],
      };
      setGroups([...groups, group]);
      setIsCreating(false);
      setNewGroup({
        name: '',
        course: '',
        description: '',
        meetingTime: '',
        location: '',
        capacity: 6,
        tags: [],
      });
    }
  };

  const renderGroup = ({ item }: { item: StudyGroup }) => (
    <Card style={styles.card}>
      <Card.Content>
        <Text style={styles.groupName}>{item.name}</Text>
        <Text style={styles.course}>{item.course}</Text>
        <Text style={styles.description}>{item.description}</Text>
        
        <View style={styles.details}>
          <Text style={styles.detailText}>📅 {item.meetingTime}</Text>
          <Text style={styles.detailText}>📍 {item.location}</Text>
          <Text style={styles.detailText}>
            👥 {item.members.length}/{item.capacity} members
          </Text>
        </View>

        <View style={styles.tags}>
          {item.tags.map((tag, index) => (
            <Surface key={index} style={styles.tag}>
              <Text>{tag}</Text>
            </Surface>
          ))}
        </View>

        <View style={styles.members}>
          <Text style={styles.membersTitle}>Members:</Text>
          <View style={styles.avatarRow}>
            {item.members.map((member, index) => (
              <Avatar.Text
                key={index}
                size={30}
                label={member.split(' ').map(n => n[0]).join('')}
                style={styles.avatar}
              />
            ))}
          </View>
        </View>

        <Button
          mode="contained"
          onPress={() => {/* TODO: Implement join group */}}
          style={styles.joinButton}
        >
          {item.members.length >= item.capacity ? 'Group Full' : 'Join Group'}
        </Button>
      </Card.Content>
    </Card>
  );

  if (isCreating) {
    return (
      <View style={styles.container}>
        <Card style={styles.createCard}>
          <Card.Content>
            <TextInput
              label="Group Name"
              value={newGroup.name}
              onChangeText={name => setNewGroup({ ...newGroup, name })}
              style={styles.input}
            />
            <TextInput
              label="Course"
              value={newGroup.course}
              onChangeText={course => setNewGroup({ ...newGroup, course })}
              style={styles.input}
            />
            <TextInput
              label="Description"
              value={newGroup.description}
              onChangeText={description => setNewGroup({ ...newGroup, description })}
              style={styles.input}
            />
            <TextInput
              label="Meeting Time"
              value={newGroup.meetingTime}
              onChangeText={meetingTime => setNewGroup({ ...newGroup, meetingTime })}
              style={styles.input}
            />
            <TextInput
              label="Location"
              value={newGroup.location}
              onChangeText={location => setNewGroup({ ...newGroup, location })}
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
                onPress={handleCreate}
                style={styles.createButton}
              >
                Create Group
              </Button>
            </View>
          </Card.Content>
        </Card>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={groups}
        renderItem={renderGroup}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      />
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
    paddingBottom: 80,
  },
  card: {
    marginBottom: 16,
    elevation: 2,
  },
  groupName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  course: {
    fontSize: 16,
    color: '#666',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    marginBottom: 16,
  },
  details: {
    marginBottom: 16,
  },
  detailText: {
    fontSize: 14,
    marginBottom: 4,
    color: '#444',
  },
  tags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 16,
  },
  tag: {
    marginRight: 8,
    marginBottom: 8,
  },
  members: {
    marginBottom: 16,
  },
  membersTitle: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 8,
  },
  avatarRow: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  avatar: {
    marginRight: 8,
    backgroundColor: '#4299E1',
  },
  joinButton: {
    marginTop: 8,
  },
  createCard: {
    margin: 16,
    elevation: 2,
  },
  input: {
    marginBottom: 12,
    backgroundColor: '#fff',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 16,
  },
  cancelButton: {
    marginRight: 8,
  },
  createButton: {
    marginLeft: 8,
  },
  fab: {
    position: 'absolute',
    right: 16,
    bottom: 16,
    backgroundColor: '#4299E1',
  },
}); 