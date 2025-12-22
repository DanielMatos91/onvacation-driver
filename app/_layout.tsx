import React, { useMemo, useState } from 'react';
import { Slot } from 'expo-router';
import { Provider as PaperProvider, MD3LightTheme as LightTheme, MD3DarkTheme as DarkTheme } from 'react-native-paper';
import { useColorScheme } from 'react-native';

export const ThemeContext = React.createContext({
  mode: 'auto' as 'light' | 'dark' | 'auto',
  setMode: (_mode: 'light' | 'dark' | 'auto') => {},
});

export default function RootLayout() {
  const systemScheme = useColorScheme();
  const [mode, setMode] = useState<'light' | 'dark' | 'auto'>('auto');

  const theme = useMemo(() => {
    const scheme = mode === 'auto' ? systemScheme : mode;
    return scheme === 'dark' ? { ...DarkTheme } : { ...LightTheme };
  }, [mode, systemScheme]);

  return (
    <ThemeContext.Provider value={{ mode, setMode }}>
      <PaperProvider theme={theme}>
        <Slot />
      </PaperProvider>
    </ThemeContext.Provider>
  );
}
