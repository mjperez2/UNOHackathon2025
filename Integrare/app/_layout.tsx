import { Stack } from "expo-router";
import { Provider as PaperProvider } from 'react-native-paper';

export default function Layout() {
  return (
    <PaperProvider>
      <Stack>
        <Stack.Screen 
          name="index" 
          options={{ 
            title: 'Integrare',
            headerShown: true 
          }} 
        />
        <Stack.Screen 
          name="career" 
          options={{ 
            title: 'Career Development',
            headerShown: true 
          }} 
        />
        <Stack.Screen 
          name="collaborative" 
          options={{ 
            title: 'Collaborative Learning',
            headerShown: true 
          }} 
        />
        <Stack.Screen 
          name="screens/CourseDetailsScreen" 
          options={{ 
            title: 'Course Details',
            headerShown: true 
          }} 
        />
        <Stack.Screen 
          name="screens/LoginScreen" 
          options={{ 
            title: 'Login',
            headerShown: true 
          }} 
        />
      </Stack>
    </PaperProvider>
  );
}
