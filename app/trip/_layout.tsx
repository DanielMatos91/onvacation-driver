import { Stack } from 'expo-router';

export default function TripLayout() {
  return (
    <Stack screenOptions={{ headerTitleAlign: 'center' }}>
      <Stack.Screen name="[id]" options={{ title: 'Detalhes do serviço' }} />
      <Stack.Screen name="[id]/finished" options={{ title: 'Serviço concluído' }} />
    </Stack>
  );
}
