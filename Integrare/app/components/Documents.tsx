import React, { useState } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { Card, Text, Button, FAB } from 'react-native-paper';

interface Document {
  id: string;
  title: string;
  course: string;
  lastModified: string;
  sharedWith: string[];
  owner: string;
}

// Mock data - replace with Firebase data later
const mockDocuments: Document[] = [
  {
    id: '1',
    title: 'CS 2125 Notes - Week 1',
    course: 'CSC 2125 - Introduction to Asymptotic Analysis',
    lastModified: '2024-03-20T15:30:00',
    sharedWith: ['John Doe', 'Jane Smith', 'Mike Johnson', 'Jane Doe'],
    owner: 'Alice Johnson',
  },
  {
    id: '2',
    title: 'Project Proposal Ideas',
    course: 'CSCI 3000 - Machine Learning',
    lastModified: '2024-03-19T10:15:00',
    sharedWith: ['Bob Wilson', 'Johnny Depp', 'Mike Wazowski'],
    owner: 'Charlie Brown',
  },
  // Add more mock documents as needed
];

export default function Documents() {
  const [documents, setDocuments] = useState(mockDocuments);

  const handleEdit = (id: string) => {
    // TODO: Implement document editing
    console.log('Edit document:', id);
  };

  const handleShare = (id: string) => {
    // TODO: Implement sharing functionality
    console.log('Share document:', id);
  };

  const handleDelete = (id: string) => {
    // TODO: Implement delete functionality
    setDocuments(documents.filter(doc => doc.id !== id));
  };

  const renderDocumentCard = ({ item }: { item: Document }) => (
    <Card style={styles.card}>
      <Card.Content>
        <View style={styles.header}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.course}>{item.course}</Text>
          </View>
          <View style={styles.actions}>
            <Button
              mode="text"
              onPress={() => handleEdit(item.id)}
              style={styles.actionButton}
            >
              Edit
            </Button>
            <Button
              mode="text"
              onPress={() => handleShare(item.id)}
              style={styles.actionButton}
            >
              Share
            </Button>
            <Button
              mode="text"
              onPress={() => handleDelete(item.id)}
              style={styles.actionButton}
            >
              Delete
            </Button>
          </View>
        </View>
        <View style={styles.details}>
          <Text style={styles.detail}>Owner: {item.owner}</Text>
          <Text style={styles.detail}>
            Shared with: {item.sharedWith.join(', ')}
          </Text>
          <Text style={styles.detail}>
            Last modified: {new Date(item.lastModified).toLocaleString()}
          </Text>
        </View>
      </Card.Content>
    </Card>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={documents}
        renderItem={renderDocumentCard}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
      />
      <FAB
        icon="plus"
        style={styles.fab}
        onPress={() => {/* TODO: Implement new document creation */}}
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
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  titleContainer: {
    flex: 1,
    marginRight: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  course: {
    fontSize: 14,
    color: '#666',
  },
  actions: {
    flexDirection: 'row',
  },
  actionButton: {
    margin: 0,
    padding: 0,
  },
  details: {
    marginTop: 8,
  },
  detail: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
}); 