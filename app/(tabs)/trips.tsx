import { FlatList, StyleSheet, View } from 'react-native';
import { Button, Card, Chip, Text, useTheme } from 'react-native-paper';
import { Link } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { statusColors, statusLabels, trips } from '../../lib/trips';
import { formatCurrency, formatDistance } from '../../lib/format';

export default function Trips() {
  const theme = useTheme();

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: theme.colors.background }]}>
      <FlatList
        contentContainerStyle={styles.list}
        data={trips}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Card mode="elevated" style={styles.card}>
            <Card.Title title={item.id} subtitle={`${item.pickupTime} • ${item.passenger}`} />
            <Card.Content style={styles.cardContent}>
              <Text variant="titleMedium">{item.pickup}</Text>
              <Text variant="bodyMedium" style={styles.muted}>
                {item.dropoff}
              </Text>
              <View style={styles.infoRow}>
                <Chip
                  textStyle={{ color: '#fff' }}
                  style={[styles.status, { backgroundColor: statusColors[item.status] }]}
                >
                  {statusLabels[item.status]}
                </Chip>
                <Chip mode="outlined" style={styles.chip}>
                  {formatDistance(item.distanceKm)}
                </Chip>
                <Chip mode="outlined" style={styles.chip}>
                  {formatCurrency(item.value)}
                </Chip>
              </View>
            </Card.Content>
            <Card.Actions>
              <Link href={`/trip/${item.id}`} asChild>
                <Button mode="contained">Ver detalhes</Button>
              </Link>
            </Card.Actions>
          </Card>
        )}
        ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
  },
  list: {
    padding: 16,
    paddingBottom: 32,
  },
  card: {
    borderRadius: 14,
  },
  cardContent: {
    gap: 10,
  },
  muted: {
    opacity: 0.75,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flexWrap: 'wrap',
  },
  status: {
    paddingHorizontal: 6,
  },
  chip: {
    backgroundColor: 'transparent',
  },
});
