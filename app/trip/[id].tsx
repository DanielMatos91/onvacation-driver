import { Text } from 'react-native-paper';
import { useLocalSearchParams } from 'expo-router';

export default function TripDetail() {
  const { id } = useLocalSearchParams();
  return <Text>Trip detail for {id}</Text>;
}
