import { useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import { Avatar, Button, Divider, List, SegmentedButtons, Text, useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ThemeContext } from '../_layout';

export default function Profile() {
  const theme = useTheme();
  const { mode, setMode } = useContext(ThemeContext);

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: theme.colors.background }]}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Avatar.Text label="JR" size={64} style={{ backgroundColor: theme.colors.primary }} />
          <View style={styles.headerText}>
            <Text variant="titleLarge" style={styles.name}>
              João Ribeiro
            </Text>
            <Text variant="bodyMedium" style={styles.muted}>
              Motorista credenciado • OnVacation
            </Text>
          </View>
        </View>

        <List.Section>
          <List.Subheader>Preferências</List.Subheader>
          <List.Item
            title="Tema do app"
            description="Escolha entre claro, escuro ou seguir o sistema"
            right={() => (
              <SegmentedButtons
                value={mode}
                onValueChange={(value) => setMode(value as typeof mode)}
                buttons={[
                  { value: 'light', label: 'Claro' },
                  { value: 'dark', label: 'Escuro' },
                  { value: 'auto', label: 'Auto' },
                ]}
              />
            )}
          />
          <Divider />
          <List.Item
            title="Notificações"
            description="Alertas sobre atrasos e confirmações"
            left={(props) => <List.Icon {...props} icon="bell-outline" />}
            right={(props) => <List.Icon {...props} icon="chevron-right" />}
          />
          <Divider inset />
          <List.Item
            title="Conta OnVacation"
            description="Dados pessoais e documentos"
            left={(props) => <List.Icon {...props} icon="account-outline" />}
            right={(props) => <List.Icon {...props} icon="chevron-right" />}
          />
        </List.Section>

        <View style={styles.actions}>
          <Button mode="outlined">Solicitar ajuda</Button>
          <Button mode="text" textColor={theme.colors.error}>
            Sair da conta
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
  },
  container: {
    padding: 16,
    gap: 12,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  headerText: {
    flex: 1,
    gap: 4,
  },
  name: {
    fontWeight: '700',
  },
  muted: {
    opacity: 0.75,
  },
  actions: {
    marginTop: 'auto',
    gap: 8,
  },
});
