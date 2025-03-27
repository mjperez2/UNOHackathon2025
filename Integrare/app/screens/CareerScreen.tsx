import React from 'react';
import { View, StyleSheet } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

// Import our components
import AlumniNetwork from '../components/AlumniNetwork';
import JobBoard from '../components/JobBoard';
import Portfolio from '../components/Portfolio';

const Tab = createMaterialTopTabNavigator();

export default function CareerScreen() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: styles.tabBar,
        tabBarLabelStyle: styles.tabLabel,
        tabBarIndicatorStyle: styles.tabIndicator,
      }}
    >
      <Tab.Screen 
        name="AlumniNetwork" 
        component={AlumniNetwork}
        options={{ title: 'Alumni Network' }}
      />
      <Tab.Screen 
        name="JobBoard" 
        component={JobBoard}
        options={{ title: 'Job Board' }}
      />
      <Tab.Screen 
        name="Portfolio" 
        component={Portfolio}
        options={{ title: 'Portfolio' }}
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