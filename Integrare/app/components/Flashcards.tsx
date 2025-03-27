import React, { useState } from 'react';
import { View, StyleSheet, FlatList, Animated } from 'react-native';
import { Card, Text, Button, FAB, TextInput } from 'react-native-paper';

interface Flashcard {
  id: string;
  front: string;
  back: string;
  course: string;
  createdBy: string;
  createdAt: string;
}

// Mock data - replace with Firebase data later
const mockFlashcards: Flashcard[] = [
  {
    id: '1',
    front: 'What is React Native?',
    back: 'A framework for building native mobile applications using React.',
    course: 'Mobile Development',
    createdBy: 'Alice Johnson',
    createdAt: '2024-03-20T15:30:00',
  },
  {
    id: '2',
    front: 'What is Firebase?',
    back: 'A platform developed by Google for creating mobile and web applications.',
    course: 'Mobile Development',
    createdBy: 'Bob Wilson',
    createdAt: '2024-03-19T10:15:00',
  },
  // Add more mock flashcards as needed
];

export default function Flashcards() {
  const [flashcards, setFlashcards] = useState(mockFlashcards);
  const [isCreating, setIsCreating] = useState(false);
  const [newCard, setNewCard] = useState<Partial<Flashcard>>({
    front: '',
    back: '',
    course: '',
  });
  const [flippedCards, setFlippedCards] = useState<Set<string>>(new Set());

  const handleFlip = (id: string) => {
    setFlippedCards(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const handleCreate = () => {
    if (newCard.front && newCard.back && newCard.course) {
      const card: Flashcard = {
        id: Date.now().toString(),
        front: newCard.front,
        back: newCard.back,
        course: newCard.course,
        createdBy: 'Current User', // TODO: Get actual user
        createdAt: new Date().toISOString(),
      };
      setFlashcards([...flashcards, card]);
      setIsCreating(false);
      setNewCard({ front: '', back: '', course: '' });
    }
  };

  const renderFlashcard = ({ item }: { item: Flashcard }) => {
    const isFlipped = flippedCards.has(item.id);
    const flipAnimation = new Animated.Value(isFlipped ? 180 : 0);

    return (
      <Card style={styles.card}>
        <Card.Content>
          <Animated.View
            style={[
              styles.cardContent,
              {
                transform: [{ rotateY: flipAnimation.interpolate({
                  inputRange: [0, 180],
                  outputRange: ['0deg', '180deg'],
                })}],
              },
            ]}
          >
            <Text style={styles.cardText}>
              {isFlipped ? item.back : item.front}
            </Text>
            <Text style={styles.cardCourse}>{item.course}</Text>
            <Text style={styles.cardMeta}>
              Created by {item.createdBy} on {new Date(item.createdAt).toLocaleDateString()}
            </Text>
          </Animated.View>
        </Card.Content>
      </Card>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={flashcards}
        renderItem={renderFlashcard}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
      />

      {isCreating && (
        <Card style={styles.createCard}>
          <Card.Content>
            <TextInput
              label="Front"
              value={newCard.front}
              onChangeText={front => setNewCard({ ...newCard, front })}
              style={styles.input}
            />
            <TextInput
              label="Back"
              value={newCard.back}
              onChangeText={back => setNewCard({ ...newCard, back })}
              style={styles.input}
            />
            <TextInput
              label="Course"
              value={newCard.course}
              onChangeText={course => setNewCard({ ...newCard, course })}
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
                Create Card
              </Button>
            </View>
          </Card.Content>
        </Card>
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
  cardContent: {
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 200,
  },
  cardText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
  },
  cardCourse: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  cardMeta: {
    fontSize: 12,
    color: '#999',
  },
  createCard: {
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