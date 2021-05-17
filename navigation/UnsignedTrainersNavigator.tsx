import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import EnterScreen from '../screens/Unsigned/EnterScreen';
import LoginScreen from '../screens/Unsigned/LoginScreen';
import RegistrationTrainerScreen from '../screens/Unsigned/RegistrationTrainerScreen';
import _ComponentsScreen from '../screens/_ComponentsScreen';
import { UnsignedStackParamList } from '../types';

const UnsignedStack = createStackNavigator<UnsignedStackParamList>();

function UnsignedTrainersNavigator() {
  return (
    <UnsignedStack.Navigator initialRouteName='EnterScreen' headerMode="none">
      <UnsignedStack.Screen name="EnterScreen" component={EnterScreen} />
      <UnsignedStack.Screen name="SignUpScreen" component={RegistrationTrainerScreen} />
      <UnsignedStack.Screen name="LoginScreen" component={LoginScreen} />
    </UnsignedStack.Navigator>
  );
}

export default UnsignedTrainersNavigator;
