/**
 * If you are not familiar with React Navigation, check out the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { UserContext } from '../context';

import NotFoundScreen from '../screens/NotFoundScreen';
import { RootStackParamList, UserModelParamList } from '../types';
import BottomTabNavigator from './BottomTabNavigator';
import LinkingConfiguration from './LinkingConfiguration';
import UnsignedNavigator from './UnsignedNavigator';

export default function Navigation() {
  return (
    <NavigationContainer linking={LinkingConfiguration}>
      <RootNavigator />
    </NavigationContainer>
  );
}

// A root stack navigator is often used for displaying modals on top of all other content
// Read more here: https://reactnavigation.org/docs/modal
const Stack = createStackNavigator<RootStackParamList>();

const initialUser: UserModelParamList = {
  isLoggedIn: false
};

function RootNavigator() {
  const [user, setUser] = React.useState<UserModelParamList>(initialUser);
  return (
    <UserContext.Provider value={[user, setUser]}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {user.isLoggedIn ? (
          <Stack.Screen name="Root" component={BottomTabNavigator} />
        ) : (
          <Stack.Screen name="Unsigned" component={UnsignedNavigator} />
        )}
        <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
      </Stack.Navigator>
    </UserContext.Provider>
  );
}
