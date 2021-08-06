import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { UserContext } from './context';
import { isTrainerApp } from './helpers';

import useCachedResources from './hooks/useCachedResources';
import Navigation from './navigation';
import { UserModelParamList } from './types';

export default function App() {
  const isLoadingComplete = useCachedResources();
  const [user, setUser] = React.useState<UserModelParamList>({ isLoggedIn: false });

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <UserContext.Provider value={[user, setUser]}>
          <Navigation useTrainer={isTrainerApp} />
        </UserContext.Provider>
        <StatusBar />
      </SafeAreaProvider>
    );
  }
}
