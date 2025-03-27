import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, ScrollView } from 'react-native';
import { Card, Text, Button, FAB, TextInput, List, Surface } from 'react-native-paper';
import { canvasAPI, ClassChannel, ChannelAnnouncement, ChannelEvent } from '../api/canvasAPI';

export default function ClassChannels({ courseId }: { courseId?: number }) {
  const [channels, setChannels] = useState<ClassChannel[]>([]);
  const [loading, setLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
  const [newChannel, setNewChannel] = useState<Partial<ClassChannel>>({
    name: '',
    description: '',
    announcements: [],
    events: [],
  });
  const [newAnnouncement, setNewAnnouncement] = useState<Partial<ChannelAnnouncement>>({
    title: '',
    content: '',
    author: 'Current User', // TODO: Get actual user
  });
  const [newEvent, setNewEvent] = useState<Partial<ChannelEvent>>({
    title: '',
    description: '',
    start_time: new Date().toISOString(),
    end_time: new Date(Date.now() + 3600000).toISOString(), // 1 hour later
    location: '',
    type: 'other',
    created_by: 'Current User', // TODO: Get actual user
  });

  useEffect(() => {
    loadChannels();
  }, [courseId]);

  const loadChannels = async () => {
    try {
      setLoading(true);
      const data = await canvasAPI.getClassChannels(courseId);
      setChannels(data);
    } catch (error) {
      console.error('Error loading class channels:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateChannel = async () => {
    if (newChannel.name && newChannel.description) {
      try {
        const channel = await canvasAPI.createClassChannel({
          name: newChannel.name,
          description: newChannel.description,
          course_id: courseId || 0,
          members: [],
        });
        setChannels([...channels, channel]);
        setIsCreating(false);
        setNewChannel({
          name: '',
          description: '',
          announcements: [],
          events: [],
          members: [],
        });
      } catch (error) {
        console.error('Error creating class channel:', error);
      }
    }
  };

  const handleAddAnnouncement = async (channelId: string) => {
    if (newAnnouncement.title && newAnnouncement.content) {
      try {
        const announcement = await canvasAPI.addChannelAnnouncement(channelId, {
          channel_id: channelId,
          title: newAnnouncement.title,
          content: newAnnouncement.content,
          author: newAnnouncement.author || 'Current User',
          attachments: [],
        });
        const updatedChannel = await canvasAPI.getClassChannels(courseId);
        setChannels(updatedChannel);
        setNewAnnouncement({
          title: '',
          content: '',
          author: 'Current User',
          attachments: [],
        });
      } catch (error) {
        console.error('Error adding announcement:', error);
      }
    }
  };

  const handleAddEvent = async (channelId: string) => {
    if (newEvent.title && newEvent.description && newEvent.start_time && newEvent.end_time && newEvent.location) {
      try {
        const event = await canvasAPI.addChannelEvent(channelId, {
          channel_id: channelId,
          title: newEvent.title,
          description: newEvent.description,
          start_time: newEvent.start_time,
          end_time: newEvent.end_time,
          location: newEvent.location,
          type: newEvent.type || 'other',
          created_by: newEvent.created_by || 'Current User',
        });
        const updatedChannel = await canvasAPI.getClassChannels(courseId);
        setChannels(updatedChannel);
        setNewEvent({
          title: '',
          description: '',
          start_time: new Date().toISOString(),
          end_time: new Date(Date.now() + 3600000).toISOString(),
          location: '',
          type: 'other',
          created_by: 'Current User',
        });
      } catch (error) {
        console.error('Error adding event:', error);
      }
    }
  };

  const renderChannelCard = ({ item }: { item: ClassChannel }) => (
    <Card style={styles.card}>
      <Card.Content>
        <View style={styles.header}>
          <Text style={styles.title}>{item.name}</Text>
          <View style={styles.actionButtons}>
            <Button
              mode="text"
              onPress={() => handleAddAnnouncement(item.id)}
              style={styles.actionButton}
            >
              Add Announcement
            </Button>
            <Button
              mode="text"
              onPress={() => handleAddEvent(item.id)}
              style={styles.actionButton}
            >
              Add Event
            </Button>
          </View>
        </View>
        <Text style={styles.description}>{item.description}</Text>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Announcements</Text>
          {item.announcements.map(announcement => (
            <List.Item
              key={announcement.id}
              title={announcement.title}
              description={announcement.content}
              left={props => <List.Icon {...props} icon="bullhorn" />}
            />
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Events</Text>
          {item.events.map(event => (
            <List.Item
              key={event.id}
              title={event.title}
              description={`${new Date(event.start_time).toLocaleDateString()} ${new Date(event.start_time).toLocaleTimeString()} - ${event.location}\n${event.description}`}
              left={props => <List.Icon {...props} icon="calendar" />}
            />
          ))}
        </View>
      </Card.Content>
    </Card>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={channels}
        renderItem={renderChannelCard}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
        refreshing={loading}
        onRefresh={loadChannels}
      />

      {isCreating && (
        <Surface style={styles.modal}>
          <Text style={styles.modalTitle}>Create Class Channel</Text>
          <TextInput
            label="Channel Name"
            value={newChannel.name}
            onChangeText={name => setNewChannel({ ...newChannel, name })}
            style={styles.input}
          />
          <TextInput
            label="Description"
            value={newChannel.description}
            onChangeText={description => setNewChannel({ ...newChannel, description })}
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
              onPress={handleCreateChannel}
              style={styles.createButton}
            >
              Create Channel
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
  section: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 8,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    marginLeft: 8,
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
}); 