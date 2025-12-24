import { StyleSheet, View } from 'react-native';
import { Button, Card, List, Text, useTheme } from 'react-native-paper';
import { router, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function TripFinished() {
  const theme = useTheme();
  const { id } = useLocalSearchParams();

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: theme.colors.background }]}>
      <View style={styles.container}>
        <Card mode="elevated" style={styles.card}>
          <Card.Title title="Serviço encerrado" />
          <Card.Content style={styles.cardContent}>
            <Text variant="headlineSmall" style={styles.title}>
              Corrida {id} finalizada com sucesso
            </Text>
            <Text variant="bodyMedium" style={styles.subtitle}>
              Revise os dados e confirme o encerramento no painel do coordenador.
            </Text>
            <List.Item
              title="Confirmação enviada"
              description="Status atualizado para o time de operações"
              left={(props) => <List.Icon {...props} icon="check-circle" color={theme.colors.primary} />}
            />
            <List.Item
              title="Próximo passo"
              description="Voltar para a lista e escolher o próximo serviço"
              left={(props) => <List.Icon {...props} icon="clipboard-list-outline" />}
            />
          </Card.Content>
          <Card.Actions style={styles.actions}>
            <Button mode="outlined" onPress={() => router.back()}>
              Voltar
            </Button>
            <Button mode="contained" onPress={() => router.replace('/(tabs)/trips')}>
              Abrir lista
            </Button>
          </Card.Actions>
        </Card>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
  },
  card: {
    borderRadius: 14,
  },
  cardContent: {
    gap: 12,
  },
  title: {
    fontWeight: '700',
  },
  subtitle: {
    opacity: 0.75,
  },
  actions: {
    justifyContent: 'flex-end',
  },
});
