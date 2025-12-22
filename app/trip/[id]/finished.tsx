import { Text, Button } from 'react-native-paper';
import { router, useLocalSearchParams } from 'expo-router';

export default function TripFinished() {
  const { id } = useLocalSearchParams();
  return (
    <>
      <Text>Serviço {id} terminado!</Text>
      <Button mode="contained" onPress={() => router.back()}>
        Fechar
      </Button>
    </>
  );
}
