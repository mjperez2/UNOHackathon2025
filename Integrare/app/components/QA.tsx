import React, { useState } from 'react';
import { View, StyleSheet, FlatList, ScrollView } from 'react-native';
import { Card, Text, Button, FAB, TextInput, Avatar } from 'react-native-paper';

interface Question {
  id: string;
  title: string;
  content: string;
  course: string;
  author: string;
  createdAt: string;
  answers: Answer[];
}

interface Answer {
  id: string;
  content: string;
  author: string;
  createdAt: string;
  upvotes: number;
}

// Mock data - replace with Firebase data later
const mockQuestions: Question[] = [
  {
    id: '1',
    title: 'How do I implement authentication in Firebase?',
    content: 'I\'m trying to add user authentication to my React Native app using Firebase. Can someone help me with the implementation?',
    course: 'Mobile Development',
    author: 'Alice Johnson',
    createdAt: '2024-03-20T15:30:00',
    answers: [
      {
        id: '1',
        content: 'Here\'s a step-by-step guide to implement Firebase authentication...',
        author: 'Bob Wilson',
        createdAt: '2024-03-20T16:00:00',
        upvotes: 5,
      },
    ],
  },
  {
    id: '2',
    title: 'Canvas API Integration Help',
    content: 'I\'m having trouble with the Canvas API integration. The authentication is working, but I can\'t fetch the course data.',
    course: 'Software Engineering',
    author: 'Charlie Brown',
    createdAt: '2024-03-19T10:15:00',
    answers: [],
  },
  // Add more mock questions as needed
];

export default function QA() {
  const [questions, setQuestions] = useState(mockQuestions);
  const [isCreating, setIsCreating] = useState(false);
  const [newQuestion, setNewQuestion] = useState({
    title: '',
    content: '',
    course: '',
  });

  const handleCreateQuestion = () => {
    if (newQuestion.title && newQuestion.content && newQuestion.course) {
      const question: Question = {
        id: Date.now().toString(),
        title: newQuestion.title,
        content: newQuestion.content,
        course: newQuestion.course,
        author: 'Current User', // TODO: Get actual user
        createdAt: new Date().toISOString(),
        answers: [],
      };
      setQuestions([question, ...questions]);
      setIsCreating(false);
      setNewQuestion({ title: '', content: '', course: '' });
    }
  };

  const handleAddAnswer = (questionId: string, answer: string) => {
    if (answer.trim()) {
      const newAnswer: Answer = {
        id: Date.now().toString(),
        content: answer,
        author: 'Current User', // TODO: Get actual user
        createdAt: new Date().toISOString(),
        upvotes: 0,
      };
      setQuestions(questions.map(q => 
        q.id === questionId 
          ? { ...q, answers: [...q.answers, newAnswer] }
          : q
      ));
    }
  };

  const renderQuestion = ({ item }: { item: Question }) => (
    <Card style={styles.card}>
      <Card.Content>
        <View style={styles.questionHeader}>
          <Avatar.Text 
            size={40} 
            label={item.author.split(' ').map(n => n[0]).join('')} 
            style={styles.avatar}
          />
          <View style={styles.questionMeta}>
            <Text style={styles.author}>{item.author}</Text>
            <Text style={styles.course}>{item.course}</Text>
            <Text style={styles.date}>
              {new Date(item.createdAt).toLocaleDateString()}
            </Text>
          </View>
        </View>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.content}>{item.content}</Text>

        <View style={styles.answersSection}>
          <Text style={styles.answersTitle}>
            {item.answers.length} {item.answers.length === 1 ? 'Answer' : 'Answers'}
          </Text>
          {item.answers.map(answer => (
            <Card key={answer.id} style={styles.answerCard}>
              <Card.Content>
                <View style={styles.answerHeader}>
                  <Avatar.Text 
                    size={30} 
                    label={answer.author.split(' ').map(n => n[0]).join('')} 
                    style={styles.answerAvatar}
                  />
                  <View style={styles.answerMeta}>
                    <Text style={styles.answerAuthor}>{answer.author}</Text>
                    <Text style={styles.answerDate}>
                      {new Date(answer.createdAt).toLocaleDateString()}
                    </Text>
                  </View>
                </View>
                <Text style={styles.answerContent}>{answer.content}</Text>
                <View style={styles.answerFooter}>
                  <Button 
                    mode="text" 
                    onPress={() => {/* TODO: Implement upvote */}}
                  >
                    Upvote ({answer.upvotes})
                  </Button>
                </View>
              </Card.Content>
            </Card>
          ))}
        </View>

        <View style={styles.answerInput}>
          <TextInput
            label="Your answer"
            value=""
            onChangeText={(text) => handleAddAnswer(item.id, text)}
            style={styles.multilineInput}
          />
          <Button 
            mode="contained" 
            onPress={() => {/* TODO: Implement answer submission */}}
            style={styles.submitButton}
          >
            Submit Answer
          </Button>
        </View>
      </Card.Content>
    </Card>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={questions}
        renderItem={renderQuestion}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
      />

      {isCreating && (
        <Card style={styles.createCard}>
          <Card.Content>
            <TextInput
              label="Question Title"
              value={newQuestion.title}
              onChangeText={title => setNewQuestion({ ...newQuestion, title })}
              style={styles.input}
            />
            <TextInput
              label="Question Content"
              value={newQuestion.content}
              onChangeText={content => setNewQuestion({ ...newQuestion, content })}
              style={styles.multilineInput}
            />
            <TextInput
              label="Course"
              value={newQuestion.course}
              onChangeText={course => setNewQuestion({ ...newQuestion, course })}
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
                onPress={handleCreateQuestion}
                style={styles.createButton}
              >
                Post Question
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
  questionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  avatar: {
    marginRight: 12,
  },
  questionMeta: {
    flex: 1,
  },
  author: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  course: {
    fontSize: 14,
    color: '#666',
  },
  date: {
    fontSize: 12,
    color: '#999',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  content: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 16,
  },
  answersSection: {
    marginTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 16,
  },
  answersTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  answerCard: {
    marginBottom: 12,
  },
  answerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  answerAvatar: {
    marginRight: 8,
  },
  answerMeta: {
    flex: 1,
  },
  answerAuthor: {
    fontSize: 14,
    fontWeight: '500',
  },
  answerDate: {
    fontSize: 12,
    color: '#999',
  },
  answerContent: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 8,
  },
  answerFooter: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  answerInput: {
    marginTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 16,
  },
  input: {
    marginBottom: 12,
  },
  submitButton: {
    marginTop: 8,
  },
  createCard: {
    margin: 16,
    marginTop: 8,
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
  multilineInput: {
    height: 100,
    textAlignVertical: 'top',
  },
}); 