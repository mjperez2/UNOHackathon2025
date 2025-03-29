import { Stack } from "expo-router";
import { Provider as PaperProvider } from 'react-native-paper';
import { Slot } from 'expo-router';

export default function Layout() {
  return (
    <PaperProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="login" options={{ headerShown: false }} />
        <Stack.Screen 
          name="(app)" 
          options={{ headerShown: false }} 
        />
      </Stack>
    </PaperProvider>
  );
}
