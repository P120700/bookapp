import { Slot } from 'expo-router';
import { useEffect, useState } from 'react';
import { useFonts } from 'expo-font';
import SplashScreen from '@screens/Splash';
import { INITIAL_REMOTE_CONFIG } from '@src/services/constants';
import { firebaseRemoteConfig } from '@src/services/firebase';

const preloadFirebase = async () => {
  await firebaseRemoteConfig.setConfigSettings({
    minimumFetchIntervalMillis: 6 * 60 * 60_000,
  });

  await firebaseRemoteConfig
    .setDefaults(INITIAL_REMOTE_CONFIG)
    .then(() => firebaseRemoteConfig.fetchAndActivate())
    .then((fetchedRemotely) => {
      if (fetchedRemotely) {
        console.log('Configs were retrieved from the backend and activated.');
      } else {
        console.log(
          'No configs were fetched from the backend, and the local configs were already activated'
        );
      }
    });
};

function RootLayout() {
  const [isLoading, setIsLoading] = useState(true);

  const [loaded, error] = useFonts({
    NunitoSansExtraBold: require('@assets/fonts/NunitoSans_10pt-ExtraBold.ttf'),
    NunitoSansBold: require('@assets/fonts/NunitoSans_10pt-Bold.ttf'),
    NunitoSansSemibold: require('@assets/fonts/NunitoSans_10pt-SemiBold.ttf'),
  });

  const handleLoadingFinished = () => {
    setIsLoading(false);
  };

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    preloadFirebase();
  }, []);

  if (!loaded) {
    return null;
  }

  if (isLoading) {
    return <SplashScreen onLoadingFinished={handleLoadingFinished} />;
  }

  return <Slot />;
}

export default RootLayout;
