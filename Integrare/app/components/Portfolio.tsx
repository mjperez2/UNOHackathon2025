import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Card, Text, Button, TextInput, FAB } from 'react-native-paper';

interface PortfolioItem {
  id: string;
  title: string;
  description: string;
  type: 'resume' | 'project' | 'certification';
  url?: string;
  date: string;
  course?: string;
}

// Mock data - replace with Firebase data later
const mockPortfolio: PortfolioItem[] = [
  {
    id: '1',
    title: 'Software Engineering Resume',
    description: 'My professional resume highlighting my experience and skills.',
    type: 'resume',
    url: 'https://example.com/resume.pdf',
    date: '2024-03-20',
  },
  {
    id: '2',
    title: 'Mobile App Project',
    description: 'A React Native app for task management with Firebase backend.',
    type: 'project',
    url: 'https://github.com/username/project',
    date: '2024-02-15',
  },
  // Add more mock items as needed
];

export default function Portfolio() {
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [newItem, setNewItem] = useState<Partial<PortfolioItem>>({
    title: '',
    description: '',
    type: 'project',
  });

  const handleAddItem = () => {
    // TODO: Implement Firebase upload
    setIsAddingNew(false);
    setNewItem({
      title: '',
      description: '',
      type: 'project',
    });
  };

  const renderPortfolioItem = (item: PortfolioItem) => (
    <Card key={item.id} style={styles.card}>
      <Card.Content>
        <View style={styles.header}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.type}>{item.type}</Text>
        </View>
        <Text style={styles.description}>{item.description}</Text>
        {item.url && (
          <Button 
            mode="outlined" 
            onPress={() => {/* TODO: Implement file preview */}}
            style={styles.urlButton}
          >
            View {item.type}
          </Button>
        )}
        <Text style={styles.date}>Added: {new Date(item.date).toLocaleDateString()}</Text>
      </Card.Content>
    </Card>
  );

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {mockPortfolio.map(renderPortfolioItem)}
      </ScrollView>

      {isAddingNew && (
        <Card style={styles.addCard}>
          <Card.Content>
            <TextInput
              label="Title"
              value={newItem.title}
              onChangeText={title => setNewItem({ ...newItem, title })}
              style={styles.input}
            />
            <TextInput
              label="Description"
              value={newItem.description}
              onChangeText={description => setNewItem({ ...newItem, description })}
              style={styles.multilineInput}
            />
            <TextInput
              label="Course"
              value={newItem.course}
              onChangeText={course => setNewItem({ ...newItem, course })}
              style={styles.input}
            />
            <View style={styles.buttonContainer}>
              <Button 
                mode="outlined" 
                onPress={() => setIsAddingNew(false)}
                style={styles.cancelButton}
              >
                Cancel
              </Button>
              <Button 
                mode="contained" 
                onPress={handleAddItem}
                style={styles.addButton}
              >
                Add Item
              </Button>
            </View>
          </Card.Content>
        </Card>
      )}

      <FAB
        icon="plus"
        style={styles.fab}
        onPress={() => setIsAddingNew(true)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollView: {
    flex: 1,
  },
  card: {
    margin: 16,
    marginBottom: 8,
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
  type: {
    fontSize: 14,
    color: '#666',
    textTransform: 'capitalize',
  },
  description: {
    fontSize: 14,
    marginBottom: 12,
    lineHeight: 20,
  },
  urlButton: {
    marginBottom: 8,
  },
  date: {
    fontSize: 12,
    color: '#666',
  },
  addCard: {
    margin: 16,
    marginTop: 8,
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
  addButton: {
    marginLeft: 8,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
  multilineInput: {
    height: 100,
    textAlignVertical: 'top',
  },
}); 