import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import EnterScreen from '../screens/Unsigned/EnterScreen';
import LoginScreen from '../screens/Unsigned/LoginScreen';
import RegistrationScreen from '../screens/Unsigned/RegistrationScreen';
import { UnsignedStackParamList } from '../types';

const UnsignedStack = createStackNavigator<UnsignedStackParamList>();

function UnsignedNavigator() {
  return (
    <UnsignedStack.Navigator initialRouteName='EnterScreen' headerMode="none">
      <UnsignedStack.Screen name="EnterScreen" component={EnterScreen} />
      <UnsignedStack.Screen name="SignUpScreen" component={RegistrationScreen} />
      <UnsignedStack.Screen name="LoginScreen" component={LoginScreen} />
    </UnsignedStack.Navigator>
  );
}

export default UnsignedNavigator;
