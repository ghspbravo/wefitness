/**
 * If you are not familiar with React Navigation, check out the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { UserContext } from '../context';

// init db
import { setFirebaseBindings } from '../firebase';

import NotFoundScreen from '../screens/NotFoundScreen';
import { RootStackParamList, UserModelParamList } from '../types';
import BottomTabNavigator from './BottomTabNavigator';
import LinkingConfiguration from './LinkingConfiguration';
import TrainersTabNavigator from './TrainersTabNavigator';
import UnsignedNavigator from './UnsignedNavigator';
import UnsignedTrainersNavigator from './UnsignedTrainersNavigator';

export default function Navigation({ useTrainer }: any) {
  return (
    <NavigationContainer linking={LinkingConfiguration}>
      {useTrainer ? <TrainersNavigator /> : <RootNavigator />}
    </NavigationContainer>
  );
}

// A root stack navigator is often used for displaying modals on top of all other content
// Read more here: https://reactnavigation.org/docs/modal
const Stack = createStackNavigator<RootStackParamList>();

function RootNavigator() {
  const [user] = React.useContext(UserContext);
  setFirebaseBindings();
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {user.isLoggedIn ? (
        <Stack.Screen name="Root" component={BottomTabNavigator} />
      ) : (
        <Stack.Screen name="Unsigned" component={UnsignedNavigator} />
      )}
      <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
    </Stack.Navigator>
  );
}

function TrainersNavigator() {
  const [user] = React.useContext(UserContext);
  setFirebaseBindings();
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {user.isLoggedIn ? (
        <Stack.Screen name="Root" component={TrainersTabNavigator} />
      ) : (
        <Stack.Screen name="Unsigned" component={UnsignedTrainersNavigator} />
      )}
      <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
    </Stack.Navigator>
  );
}
