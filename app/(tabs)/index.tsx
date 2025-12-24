import { Alert, ScrollView, StyleSheet, View } from 'react-native';
import { Avatar, Button, Card, Chip, Divider, List, Text, useTheme } from 'react-native-paper';
import { Link, router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { trips } from '../../lib/trips';
import { formatCurrency } from '../../lib/format';

const nextTrips = trips.filter((trip) => trip.status === 'scheduled' || trip.status === 'waiting');
const completedTrips = trips.filter((trip) => trip.status === 'completed').length;
const revenueForecast = trips.reduce((total, trip) => total + trip.value, 0);

export default function Home() {
  const theme = useTheme();

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: theme.colors.background }]}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <View>
            <Text variant="titleLarge" style={styles.greeting}>
              Bem-vindo de volta
            </Text>
            <Text variant="bodyMedium" style={styles.subtitle}>
              Acompanhe seus serviços e produtividade
            </Text>
          </View>
          <Avatar.Text label="OV" size={44} style={{ backgroundColor: theme.colors.primary }} />
        </View>

        <Card mode="elevated" style={styles.card}>
          <Card.Title title="Próximo serviço" subtitle="Priorize chegadas sem atraso" />
          <Card.Content style={styles.cardContent}>
            {nextTrips.length > 0 ? (
              nextTrips.slice(0, 1).map((trip) => (
                <View key={trip.id} style={styles.row}>
                  <View style={styles.flex}>
                    <Text variant="titleMedium">{trip.pickup}</Text>
                    <Text variant="bodyMedium" style={styles.muted}>
                      {trip.dropoff}
                    </Text>
                    <Chip mode="flat" compact style={styles.chip}>
                      {trip.pickupTime} • {trip.passenger}
                    </Chip>
                  </View>
                  <Link href={`/trip/${trip.id}`} asChild>
                    <Button mode="contained">Detalhes</Button>
                  </Link>
                </View>
              ))
            ) : (
              <Text variant="bodyMedium" style={styles.muted}>
                Nenhum serviço agendado para hoje.
              </Text>
            )}
          </Card.Content>
        </Card>

        <Card mode="elevated" style={styles.card}>
          <Card.Title title="Seu desempenho hoje" subtitle="Atualizado em tempo real" />
          <Card.Content style={styles.metrics}>
            <View style={styles.metric}>
              <Text variant="headlineSmall" style={styles.metricValue}>
                {completedTrips.toString().padStart(2, '0')}
              </Text>
              <Text variant="bodyMedium" style={styles.muted}>
                Serviços concluídos
              </Text>
            </View>
            <View style={[styles.divider, { backgroundColor: theme.colors.outlineVariant }]} />
            <View style={styles.metric}>
              <Text variant="headlineSmall" style={styles.metricValue}>
                {formatCurrency(revenueForecast)}
              </Text>
              <Text variant="bodyMedium" style={styles.muted}>
                Receita prevista
              </Text>
            </View>
            <View style={[styles.divider, { backgroundColor: theme.colors.outlineVariant }]} />
            <View style={styles.metric}>
              <Text variant="headlineSmall" style={styles.metricValue}>
                94%
              </Text>
              <Text variant="bodyMedium" style={styles.muted}>
                Pontualidade
              </Text>
            </View>
          </Card.Content>
        </Card>

        <Card mode="elevated" style={styles.card}>
          <Card.Title title="Ações rápidas" />
          <Card.Content>
            <Link href="/(tabs)/trips" asChild>
              <List.Item
                title="Visualizar lista completa de serviços"
                left={(props) => <List.Icon {...props} icon="format-list-bulleted" />}
                right={(props) => <List.Icon {...props} icon="chevron-right" />}
              />
            </Link>
            <Divider inset />
            <List.Item
              title="Abrir chat de apoio"
              description="Suporte operacional 24/7"
              left={(props) => <List.Icon {...props} icon="headset" />}
              right={(props) => <List.Icon {...props} icon="open-in-new" />}
              onPress={() =>
                Alert.alert('Chat de apoio', 'O canal de suporte será aberto no dispositivo.')
              }
            />
            <Divider inset />
            <List.Item
              title="Ver escala de veículos"
              description="Modelo e placa confirmados"
              left={(props) => <List.Icon {...props} icon="car-outline" />}
              right={(props) => <List.Icon {...props} icon="chevron-right" />}
              onPress={() => router.push('/(tabs)/profile')}
            />
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
    padding: 20,
    gap: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  greeting: {
    fontWeight: '700',
  },
  subtitle: {
    opacity: 0.7,
  },
  card: {
    borderRadius: 16,
  },
  cardContent: {
    gap: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  flex: {
    flex: 1,
    gap: 6,
  },
  chip: {
    alignSelf: 'flex-start',
  },
  metrics: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  metric: {
    flex: 1,
    gap: 4,
  },
  divider: {
    width: 1,
    alignSelf: 'stretch',
    opacity: 0.7,
  },
  metricValue: {
    fontWeight: '700',
  },
  muted: {
    opacity: 0.7,
  },
});
