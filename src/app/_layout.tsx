import { DarkTheme, DefaultTheme, ThemeProvider, Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useColorScheme, Platform } from 'react-native';
import '../global.css';

if (typeof window === 'undefined') {
    (globalThis as any).requestAnimationFrame = (callback: any) => setTimeout(callback, 1000 / 60);
    (globalThis as any).cancelAnimationFrame = (id: any) => clearTimeout(id);
}

import { AnimatedSplashOverlay } from '@/components/animated-icon';
import { AuthProvider, useAuth } from '@/hooks/useAuth';

SplashScreen.preventAutoHideAsync();

function RootNavigator() {
    const { token, isLoading } = useAuth();
    if (isLoading) return null;

    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Protected guard={!!token}>
                <Stack.Screen name="(tabs)" />
            </Stack.Protected>
            <Stack.Protected guard={!token}>
                <Stack.Screen name="login" />
                <Stack.Screen name="register" />
            </Stack.Protected>
        </Stack>
    );
}

export default function RootLayout() {
    const colorScheme = useColorScheme();

    return (
        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
            {Platform.OS !== 'web' || typeof window !== 'undefined' ? (
                <AnimatedSplashOverlay />
            ) : null}
            <AuthProvider>
                <RootNavigator />
            </AuthProvider>
        </ThemeProvider>
    );
}