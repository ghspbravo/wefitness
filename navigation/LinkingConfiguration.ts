/**
 * Learn more about deep linking with React Navigation
 * https://reactnavigation.org/docs/deep-linking
 * https://reactnavigation.org/docs/configuring-links
 */

import * as Linking from 'expo-linking';

export default {
  prefixes: [Linking.makeUrl('/')],
  config: {
    screens: {
      Root: {
        screens: {
          ProfileTab: {
            screens: {
              ProfileScreen: 'profile',
              TrainersScreen: 'trainers',
              TrainingScreen: 'training',
            },
          },
          CalendarTab: {
            screens: {
              CalendarScreen: 'calendar',
              TrainingScreen: 'training'
            },
          },
          ChatsTab: {
            screens: {
              ChatsListScreen: 'chatList',
              ChatScreen: 'chat'
            },
          },
        },
      },
      NotFound: '*',
    },
  },
};
