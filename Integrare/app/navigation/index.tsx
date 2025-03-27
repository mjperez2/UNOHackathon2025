import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Import screens
import LoginScreen from '../screens/LoginScreen.tsx';
import DashboardScreen from '../screens/DashboardScreen.tsx';
import CourseDetailsScreen from '../screens/CourseDetailsScreen.tsx';

// Define the type for our navigation parameters
export type RootStackParamList = {
  Login: undefined;
  Dashboard: undefined;
  CourseDetails: { courseId: number; courseName: string };
};

const Stack = createStackNavigator<RootStackParamList>();

export default function AppNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="Login"
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
          name="Login" 
          component={LoginScreen} 
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="Dashboard" 
          component={DashboardScreen} 
          options={{ title: 'Integrare' }}
        />
        <Stack.Screen 
          name="CourseDetails" 
          component={CourseDetailsScreen} 
          options={({ route }) => ({ title: route.params.courseName })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}