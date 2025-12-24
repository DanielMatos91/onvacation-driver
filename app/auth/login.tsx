import { useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, StyleSheet, View } from 'react-native';
import { Button, Card, HelperText, Text, TextInput, useTheme } from 'react-native-paper';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Login() {
  const theme = useTheme();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [touched, setTouched] = useState(false);

  const hasErrors = touched && (!email || !password);

  const handleSubmit = () => {
    setTouched(true);
    if (!email || !password) return;
    router.replace('/(tabs)');
  };

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: theme.colors.background }]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.container}
      >
        <View style={styles.header}>
          <Text variant="headlineMedium" style={styles.title}>
            Motorista OnVacation
          </Text>
          <Text variant="bodyMedium" style={styles.subtitle}>
            Acesse para acompanhar os serviços do dia
          </Text>
        </View>

        <Card mode="elevated" style={styles.card}>
          <Card.Content style={styles.cardContent}>
            <TextInput
              label="E-mail corporativo"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              mode="outlined"
              style={styles.input}
              returnKeyType="next"
            />
            <TextInput
              label="Senha"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              mode="outlined"
              style={styles.input}
              returnKeyType="done"
              onSubmitEditing={handleSubmit}
            />
            <HelperText type="error" visible={hasErrors} style={styles.helper}>
              Informe e-mail e senha para continuar.
            </HelperText>
            <Button mode="contained" onPress={handleSubmit} style={styles.button}>
              Entrar
            </Button>
            <Button
              mode="text"
              textColor={theme.colors.primary}
              onPress={() => Alert.alert('Acesso', 'Contate o coordenador para redefinir seu acesso.')}
            >
              Precisa de ajuda com o acesso?
            </Button>
          </Card.Content>
        </Card>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    gap: 16,
  },
  header: {
    gap: 8,
  },
  title: {
    fontWeight: '700',
  },
  subtitle: {
    opacity: 0.8,
  },
  card: {
    borderRadius: 12,
  },
  cardContent: {
    gap: 12,
  },
  input: {
    backgroundColor: 'transparent',
  },
  helper: {
    minHeight: 20,
  },
  button: {
    marginTop: 4,
  },
});
