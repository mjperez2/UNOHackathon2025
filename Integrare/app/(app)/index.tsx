import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Card, Button } from 'react-native-paper';
import { useRouter } from 'expo-router';

export default function DashboardScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.welcomeText}>Welcome to Integrare</Text>
        
        <Card style={styles.card}>
          <Card.Content style={styles.cardContent}>
            <Text style={styles.cardTitle}>Career Development</Text>
            <Text>Access career resources, alumni network, and job board</Text>
            <Button 
              mode="contained"
              onPress={() => router.push('/career')}
              style={styles.button}
            >
              View
            </Button>
          </Card.Content>
        </Card>

        <Card style={styles.card}>
          <Card.Content style={styles.cardContent}>
            <Text style={styles.cardTitle}>Collaborative Learning</Text>
            <Text>Join study groups, access shared resources, and participate in discussions</Text>
            <Button 
              mode="contained"
              onPress={() => router.push('/collaborative')}
              style={styles.button}
            >
              View
            </Button>
          </Card.Content>
        </Card>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    padding: 16,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#2D3748',
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#2D3748',
  },
  card: {
    marginBottom: 16,
    backgroundColor: '#ffffff',
  },
  cardContent: {
    backgroundColor: '#ffffff',
  },
  button: {
    marginTop: 16,
  },
});
 
 