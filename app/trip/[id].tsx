import { ScrollView, StyleSheet, View } from 'react-native';
import { Button, Card, Chip, Divider, List, Text, useTheme } from 'react-native-paper';
import { router, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getTripById, statusColors, statusLabels } from '../../lib/trips';
import { formatCurrency, formatDistance } from '../../lib/format';

export default function TripDetail() {
  const theme = useTheme();
  const { id } = useLocalSearchParams();
  const trip = getTripById(id);

  if (!trip) {
    return (
      <SafeAreaView style={[styles.safe, { backgroundColor: theme.colors.background }]}>
        <View style={styles.container}>
          <Text variant="headlineSmall" style={styles.title}>
            Serviço não encontrado
          </Text>
          <Button mode="contained" onPress={() => router.back()}>
            Voltar
          </Button>
        </View>
      </SafeAreaView>
    );
  }

  const handleFinish = () => {
    router.push({ pathname: '/trip/[id]/finished', params: { id: trip.id } });
  };

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: theme.colors.background }]}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <View>
            <Text variant="titleLarge" style={styles.title}>
              {trip.id}
            </Text>
            <Text variant="bodyMedium" style={styles.subtitle}>
              {trip.pickupTime} • {trip.passenger}
            </Text>
          </View>
          <Chip
            textStyle={{ color: '#fff' }}
            style={[styles.status, { backgroundColor: statusColors[trip.status] }]}
          >
            {statusLabels[trip.status]}
          </Chip>
        </View>

        <Card mode="elevated" style={styles.card}>
          <Card.Title title="Resumo do serviço" />
          <Card.Content style={styles.cardContent}>
            <View style={styles.row}>
              <List.Icon icon="map-marker-outline" />
              <View style={styles.flex}>
                <Text variant="titleMedium">{trip.pickup}</Text>
                <Text variant="bodyMedium" style={styles.muted}>
                  Embarque previsto às {trip.pickupTime}
                </Text>
              </View>
            </View>
            <Divider />
            <View style={styles.row}>
              <List.Icon icon="flag-checkered" />
              <View style={styles.flex}>
                <Text variant="titleMedium">{trip.dropoff}</Text>
                <Text variant="bodyMedium" style={styles.muted}>
                  {formatDistance(trip.distanceKm)} estimados
                </Text>
              </View>
            </View>
          </Card.Content>
        </Card>

        <Card mode="elevated" style={styles.card}>
          <Card.Title title="Passageiro" />
          <Card.Content>
            <List.Item
              title={trip.passenger}
              description="Contato principal"
              left={(props) => <List.Icon {...props} icon="account-circle" />}
              right={() => <Chip mode="outlined">Contato: {trip.contact}</Chip>}
            />
            <Divider inset />
            <List.Item
              title="Veículo designado"
              description={trip.vehicle}
              left={(props) => <List.Icon {...props} icon="car-multiple" />}
            />
            <Divider inset />
            <List.Item
              title="Valor previsto"
              description={formatCurrency(trip.value)}
              left={(props) => <List.Icon {...props} icon="cash-multiple" />}
            />
            {trip.flight && (
              <>
                <Divider inset />
                <List.Item
                  title="Dados do voo"
                  description={`Número ${trip.flight}`}
                  left={(props) => <List.Icon {...props} icon="airplane" />}
                />
              </>
            )}
            {trip.notes && (
              <>
                <Divider inset />
                <List.Item
                  title="Observações"
                  description={trip.notes}
                  left={(props) => <List.Icon {...props} icon="chat-processing" />}
                />
              </>
            )}
          </Card.Content>
        </Card>

        <Card mode="elevated" style={styles.card}>
          <Card.Title title="Ações" />
          <Card.Content style={styles.actions}>
            <Button mode="outlined" icon="navigation-variant">
              Iniciar navegação
            </Button>
            <Button mode="contained" onPress={handleFinish}>
              Registrar conclusão
            </Button>
          </Card.Content>
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
  },
  container: {
    padding: 16,
    gap: 14,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontWeight: '700',
  },
  subtitle: {
    opacity: 0.7,
  },
  status: {
    paddingHorizontal: 8,
  },
  card: {
    borderRadius: 14,
  },
  cardContent: {
    gap: 12,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  flex: {
    flex: 1,
  },
  muted: {
    opacity: 0.7,
  },
  actions: {
    gap: 10,
  },
});
