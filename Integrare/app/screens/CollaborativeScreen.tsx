import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

// Import our components
import Documents from '../components/Documents';
import QA from '../components/QA';
import StudyGroups from '../components/StudyGroups';

const Tab = createMaterialTopTabNavigator();

export default function CollaborativeScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Collaborative Learning</Text>
      </View>
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
          name="Study Groups"
          component={StudyGroups}
          options={{ title: 'Study Groups' }}
        />
        <Tab.Screen 
          name="QA" 
          component={QA}
          options={{ title: 'Q&A' }}
        />
      </Tab.Navigator>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#fff',
    elevation: 0,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    paddingTop: 24,
  },
  backButton: {
    padding: 8,
    marginRight: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
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