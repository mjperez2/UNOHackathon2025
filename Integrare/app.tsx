import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Provider as PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
// Update the path to match your structure
import AppNavigationContent from './app/navigation';

export default function App() {
  return (
    <SafeAreaProvider>
      <PaperProvider>
        <NavigationContainer>
          <AppNavigationContent />
        </NavigationContainer>
      </PaperProvider>
    </SafeAreaProvider>
  );
}