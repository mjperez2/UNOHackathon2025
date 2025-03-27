import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button, Text, Surface } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types';

type LoginScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, 'Login'>;
};

const LoginScreen: React.FC<LoginScreenProps> = ({ navigation }) => {
  const [schoolUrl, setSchoolUrl] = useState<string>('');
  const [apiKey, setApiKey] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const handleLogin = async (): Promise<void> => {
    setLoading(true);
    setError('');

    try {
      // TODO: Implement Canvas authentication
      // For now, we'll just navigate to Home
      navigation.replace('Home');
    } catch (err) {
      setError('Failed to authenticate with Canvas. Please check your credentials.');
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
            label="School Canvas URL"
            value={schoolUrl}
            onChangeText={setSchoolUrl}
            mode="outlined"
            style={styles.input}
            placeholder="https://your-school.instructure.com"
            autoCapitalize="none"
            keyboardType="url"
          />

          <TextInput
            label="Canvas API Key"
            value={apiKey}
            onChangeText={setApiKey}
            mode="outlined"
            style={styles.input}
            secureTextEntry
            placeholder="Enter your Canvas API key"
          />

          {error ? <Text style={styles.error}>{error}</Text> : null}

          <Button
            mode="contained"
            onPress={handleLogin}
            loading={loading}
            style={styles.button}
          >
            Login with Canvas
          </Button>

          <Button
            mode="text"
            onPress={() => navigation.navigate('Home')}
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