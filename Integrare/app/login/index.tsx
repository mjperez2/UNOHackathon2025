import React, { useState } from 'react';
import { View, StyleSheet, KeyboardAvoidingView, Platform, TextInput as RNTextInput } from 'react-native';
import { Button, Text, Surface } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useAuth } from '../context/AuthContext';

export default function LoginScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();
  const { login } = useAuth();

  const handleLogin = async () => {
    if (!username || !password) {
      setError('Please enter both username and password');
      return;
    }

    setLoading(true);
    try {
      // Simply log in and navigate to dashboard
      await login();
      router.replace('/(app)');
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <Surface style={styles.surface}>
          <View style={styles.logoContainer}>
            <Text style={styles.title}>Integrare</Text>
            <Text style={styles.subtitle}>Academic Collaboration Platform</Text>
          </View>

          <View style={styles.formContainer}>
            <RNTextInput
              placeholder="Username"
              value={username}
              onChangeText={setUsername}
              style={styles.input}
              autoCapitalize="none"
              onSubmitEditing={handleLogin}
            />

            <RNTextInput
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              style={styles.input}
              secureTextEntry
              onSubmitEditing={handleLogin}
            />

            {error ? <Text style={styles.error}>{error}</Text> : null}

            <View style={styles.buttonContainer}>
              <Button
                mode="contained"
                onPress={handleLogin}
                loading={loading}
                style={styles.button}
              >
                Log In
              </Button>

              <Button
                mode="outlined"
                onPress={() => {
                  login();
                  router.replace('/(app)');
                }}
                style={styles.button}
              >
                Skip Login (Demo Mode)
              </Button>
            </View>
          </View>
        </Surface>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  keyboardView: {
    flex: 1,
  },
  surface: {
    flex: 1,
    margin: 16,
    padding: 16,
    elevation: 4,
    borderRadius: 8,
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
    padding: 12,
    backgroundColor: '#fff',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  buttonContainer: {
    marginTop: 16,
  },
  button: {
    marginBottom: 12,
    height: 48,
  },
  error: {
    color: '#B00020',
    marginBottom: 16,
  },
}); 