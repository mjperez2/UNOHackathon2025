import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
// Update the path to match your structure
import AppNavigationContent from './app/navigation/index.tsx';

export default function App() {
  return (
    <NavigationContainer>
      <AppNavigationContent />
    </NavigationContainer>
  );
}