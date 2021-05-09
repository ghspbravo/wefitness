import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import NotFoundScreen from '../screens/NotFoundScreen';
import _ComponentsScreen from '../screens/_ComponentsScreen';
import { UnsignedStackParamList } from '../types';

const UnsignedStack = createStackNavigator<UnsignedStackParamList>();

function UnsignedNavigator() {
  return (
    <UnsignedStack.Navigator headerMode="none">
      <UnsignedStack.Screen name="EnterScreen" component={_ComponentsScreen} />
      <UnsignedStack.Screen name="SignUpScreen" component={NotFoundScreen} />
      <UnsignedStack.Screen name="LoginScreen" component={NotFoundScreen} />
    </UnsignedStack.Navigator>
  );
}

export default UnsignedNavigator;
