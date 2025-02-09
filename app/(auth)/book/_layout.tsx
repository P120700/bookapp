import { Stack, useNavigationContainerRef } from 'expo-router';
import React from 'react';

export default function AuthLayout() {
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
        <Stack.Screen
          name='[id]'
          options={{
            headerShown: false,
          }}
        />
      </Stack>
    </>
  );
}
