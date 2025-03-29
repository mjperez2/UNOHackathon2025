import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button, Text, Surface } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

const LoginScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async () => {
    setLoading(true);
    setError('');

    try {
      // Simple validation
      if (!username || !password) {
        throw new Error('Please enter both username and password');
      }

      // For demo purposes, accept any non-empty username/password
      // In a real app, you would validate against your backend
      
      // Navigate to dashboard
      router.replace('/(app)');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Surface style={styles.surface}>
        <View style={styles.logoContainer}>
          <Text style={styles.title}>Integrare</Text>
          <Text style={styles.subtitle}>Academic Collaboration Platform</Text>
        </View>

        <View style={styles.formContainer}>
          <TextInput
            label="Username"
            value={username}
            onChangeText={setUsername}
            mode="outlined"
            style={styles.input}
            placeholder="Enter your username"
            autoCapitalize="none"
          />

          <TextInput
            label="Password"
            value={password}
            onChangeText={setPassword}
            mode="outlined"
            style={styles.input}
            secureTextEntry
            placeholder="Enter your password"
          />

          {error ? <Text style={styles.error}>{error}</Text> : null}

          <Button
            mode="contained"
            onPress={handleLogin}
            loading={loading}
            style={styles.button}
          >
            Login
          </Button>

          <Button
            mode="text"
            onPress={() => router.replace('/(app)')}
            style={styles.button}
          >
            Skip Login (Demo Mode)
          </Button>
        </View>
      </Surface>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  surface: {
    flex: 1,
    margin: 16,
    padding: 16,
    elevation: 4,
    borderRadius: 8,
    backgroundColor: '#ffffff',
  },
  logoContainer: {
    alignItems: 'center',
    marginVertical: 32,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#6200ee',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginTop: 8,
  },
  formContainer: {
    flex: 1,
  },
  input: {
    marginBottom: 16,
    backgroundColor: '#ffffff',
  },
  button: {
    marginTop: 8,
  },
  error: {
    color: '#B00020',
    marginBottom: 16,
  },
});

export default LoginScreen; 