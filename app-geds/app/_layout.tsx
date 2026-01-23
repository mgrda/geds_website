import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack screenOptions={{ 
      headerShown: false,
      contentStyle: { backgroundColor: '#000000' }
    }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="projects" />
      <Stack.Screen name="settings" />
      <Stack.Screen name="(auth)/login" />
    </Stack>
  );
}
