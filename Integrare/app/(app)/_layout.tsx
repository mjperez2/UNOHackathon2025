import React from 'react';
import { Stack } from 'expo-router';

export default function AppLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: '#4299E1',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        headerTitleAlign: 'center',
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: 'Welcome to Integrare',
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="career"
        options={{
          title: 'Career Development',
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="collaborative"
        options={{
          title: 'Collaborative Learning',
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="course/[id]"
        options={{
          title: 'Course Details',
          headerShown: true,
        }}
      />
    </Stack>
  );
} 