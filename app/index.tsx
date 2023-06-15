import { Stack, useRouter } from 'expo-router';
import React, { useCallback } from 'react';
import { Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import LandingScreen from '../components/screens/LandingScreen';

function Index() {
  return (
    <>
      <Stack.Screen options={{ header: () => null }} />
      <LandingScreen />
    </>
  );
}

export default Index;
