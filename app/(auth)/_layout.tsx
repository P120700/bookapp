import { useFirebaseConfigBackground } from '@src/api/useFirebaseConfigBackground';
import { Stack } from 'expo-router';
import React from 'react';

export default function AuthLayout() {
  useFirebaseConfigBackground();
  return (
    <>
      <Stack
        screenOptions={{
          title: '',
          headerShadowVisible: false,
          headerBackVisible: false,
          headerShown: false,
        }}
      >
        <Stack.Screen name='index' />
        <Stack.Screen name='book' />
      </Stack>
    </>
  );
}
