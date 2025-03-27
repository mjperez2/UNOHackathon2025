import React from 'react';
import { View, StyleSheet } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

// Import our components
import Documents from '../components/Documents';
import Flashcards from '../components/Flashcards';
import QA from '../components/QA';

const Tab = createMaterialTopTabNavigator();

export default function CollaborativeScreen() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: styles.tabBar,
        tabBarLabelStyle: styles.tabLabel,
        tabBarIndicatorStyle: styles.tabIndicator,
      }}
    >
      <Tab.Screen 
        name="Documents" 
        component={Documents}
        options={{ title: 'Documents' }}
      />
      <Tab.Screen 
        name="Flashcards" 
        component={Flashcards}
        options={{ title: 'Flashcards' }}
      />
      <Tab.Screen 
        name="QA" 
        component={QA}
        options={{ title: 'Q&A' }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#fff',
    elevation: 0,
    shadowOpacity: 0,
  },
  tabLabel: {
    textTransform: 'none',
    fontSize: 14,
    fontWeight: '500',
  },
  tabIndicator: {
    backgroundColor: '#4299E1',
    height: 3,
  },
}); 