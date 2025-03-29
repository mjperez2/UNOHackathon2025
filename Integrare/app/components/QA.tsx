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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  list: {
    padding: 16,
    paddingBottom: 80, // Add padding for FAB
  },
  card: {
    marginBottom: 16,
    elevation: 2,
  },
  questionHeader: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  avatar: {
    marginRight: 12,
    backgroundColor: '#4299E1',
  },
  questionMeta: {
    flex: 1,
    justifyContent: 'center',
  },
  author: {
    fontSize: 16,
    fontWeight: '500',
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
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  content: {
    fontSize: 16,
    marginBottom: 16,
  },
  answersSection: {
    marginTop: 16,
  },
  answersTitle: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 12,
  },
  answerCard: {
    marginBottom: 12,
    backgroundColor: '#fafafa',
  },
  answerHeader: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  answerAvatar: {
    marginRight: 8,
    backgroundColor: '#718096',
  },
  answerMeta: {
    flex: 1,
    justifyContent: 'center',
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
    marginBottom: 8,
  },
  answerFooter: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  answerInput: {
    marginTop: 16,
  },
  input: {
    marginBottom: 12,
    backgroundColor: '#fff',
  },
  multilineInput: {
    marginBottom: 12,
    backgroundColor: '#fff',
    minHeight: 100,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 16,
  },
  answerButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 8,
  },
  cancelButton: {
    marginRight: 8,
  },
  submitButton: {
    marginLeft: 8,
  },
  addAnswerButton: {
    marginTop: 16,
  },
  createCard: {
    margin: 16,
    elevation: 2,
  },
  fab: {
    position: 'absolute',
    right: 16,
    bottom: 16,
    backgroundColor: '#4299E1',
  },
});

export default function QA() {
  const [questions, setQuestions] = useState(mockQuestions);
  const [isCreating, setIsCreating] = useState(false);
  const [newQuestion, setNewQuestion] = useState({
    title: '',
    content: '',
    course: '',
  });
  const [answerText, setAnswerText] = useState('');
  const [activeQuestionId, setActiveQuestionId] = useState<string | null>(null);

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

        {activeQuestionId === item.id ? (
          <View style={styles.answerInput}>
            <TextInput
              label="Your answer"
              value={answerText}
              onChangeText={setAnswerText}
              style={styles.multilineInput}
            />
            <View style={styles.answerButtons}>
              <Button 
                mode="outlined" 
                onPress={() => {
                  setActiveQuestionId(null);
                  setAnswerText('');
                }}
                style={styles.cancelButton}
              >
                Cancel
              </Button>
              <Button 
                mode="contained" 
                onPress={() => {
                  if (answerText.trim()) {
                    handleAddAnswer(item.id, answerText);
                    setActiveQuestionId(null);
                    setAnswerText('');
                  }
                }}
                style={styles.submitButton}
              >
                Submit Answer
              </Button>
            </View>
          </View>
        ) : (
          <Button 
            mode="outlined" 
            onPress={() => setActiveQuestionId(item.id)}
            style={styles.addAnswerButton}
          >
            Add Answer
          </Button>
        )}
      </Card.Content>
    </Card>
  );

  if (isCreating) {
    return (
      <View style={styles.container}>
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
                onPress={() => {
                  if (newQuestion.title && newQuestion.content && newQuestion.course) {
                    handleCreateQuestion();
                  }
                }}
                style={styles.submitButton}
              >
                Post Question
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
        data={questions}
        renderItem={renderQuestion}
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