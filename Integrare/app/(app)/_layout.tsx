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
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: 'Dashboard',
        }}
      />
      <Stack.Screen
        name="career"
        options={{
          title: 'Career Development',
        }}
      />
      <Stack.Screen
        name="collaborative"
        options={{
          title: 'Collaborative Learning',
        }}
      />
      <Stack.Screen
        name="course/[id]"
        options={{
          title: 'Course Details',
        }}
      />
    </Stack>
  );
} 