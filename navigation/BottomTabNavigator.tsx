/**
 * Learn more about createBottomTabNavigator:
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */

import { MaterialCommunityIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { View } from 'react-native';
import Icon from '../components/Icon';

import Colors from '../constants/Colors';
import CalendarScreen from '../screens/Signed/CalendarScreen';
import ChatScreen from '../screens/Signed/ChatScreen';
import ChatsListScreen from '../screens/Signed/ChatsListScreen';
import ProfileScreen from '../screens/Signed/ProfileScreen';
import TrainerScreen from '../screens/Signed/TrainerScreen';
import TrainersScreen from '../screens/Signed/TrainersScreen';
import TrainingScreen from '../screens/Signed/TrainingScreen';
import { BottomTabParamList, ProfileTabParamList, CalendarTabParamList, ChatsTabParamList } from '../types';

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
  return (
    <BottomTab.Navigator
      initialRouteName="ProfileTab"
      tabBarOptions={{
        activeTintColor: Colors.acsent,
        showLabel: false,
        style: {
          backgroundColor: '#FAFAFA'
        }
      }}>
      <BottomTab.Screen
        name="ProfileTab"
        component={ProfileNavigator}
        options={{
          tabBarIcon: ({ focused }) => <TabBarIcon name="account" focused={focused} />
        }}
      />
      <BottomTab.Screen
        name="CalendarTab"
        component={CalendarNavigator}
        options={{
          tabBarIcon: ({ focused }) => <TabBarIcon name="calendar-edit" focused={focused} />
        }}
      />
      <BottomTab.Screen
        name="ChatsTab"
        component={ChatsNavigator}
        options={{
          tabBarIcon: ({ focused }) => <TabBarIcon name="message-outline" focused={focused} />
        }}
      />
    </BottomTab.Navigator>
  );
}

function TabBarIcon(props: { name: React.ComponentProps<typeof MaterialCommunityIcons>['name']; focused: boolean }) {
  return (
    <View style={{ backgroundColor: props.focused ? Colors.acsent : Colors.stroke, padding: 5, borderRadius: 50 }}>
      <Icon {...props} />
    </View>
  );
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const ProfileStack = createStackNavigator<ProfileTabParamList>();

function ProfileNavigator() {
  return (
    <ProfileStack.Navigator headerMode="none">
      <ProfileStack.Screen name="ProfileScreen" component={ProfileScreen} />
      <ProfileStack.Screen name="TrainersScreen" component={TrainersScreen} />
      <ProfileStack.Screen name="TrainerScreen" component={TrainerScreen} />
      <ProfileStack.Screen name="TrainingScreen" component={TrainingScreen} />
    </ProfileStack.Navigator>
  );
}

const TabTwoStack = createStackNavigator<CalendarTabParamList>();

function CalendarNavigator() {
  return (
    <TabTwoStack.Navigator headerMode="none">
      <TabTwoStack.Screen name="CalendarScreen" component={CalendarScreen} />
      <TabTwoStack.Screen name="TrainingScreen" component={TrainingScreen} />
      <TabTwoStack.Screen name="TrainerScreen" component={TrainerScreen} />
    </TabTwoStack.Navigator>
  );
}

const ChatsStack = createStackNavigator<ChatsTabParamList>();

function ChatsNavigator() {
  return (
    <ChatsStack.Navigator headerMode="none">
      <ChatsStack.Screen name="ChatsListScreen" component={ChatsListScreen} />
      <ChatsStack.Screen name="ChatScreen" component={ChatScreen} />
      <ChatsStack.Screen name="TrainerScreen" component={TrainerScreen} />
      <ChatsStack.Screen name="TrainingScreen" component={TrainingScreen} />
    </ChatsStack.Navigator>
  );
}
