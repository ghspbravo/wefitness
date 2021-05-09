/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

export type RootStackParamList = {
  Root: undefined;
  Unsigned: undefined;
  NotFound: undefined;
};

export type BottomTabParamList = {
  ProfileTab: undefined;
  CalendarTab: undefined;
  ChatsTab: undefined;
};

export type ProfileTabParamList = {
  ProfileScreen: undefined;
  TrainersScreen: undefined;
  TrainingScreen: undefined;
};

export type CalendarTabParamList = {
  CalendarScreen: undefined;
  TrainingScreen: undefined;
};

export type ChatsTabParamList = {
  ChatsListScreen: undefined;
  ChatScreen: undefined;
};

export type UnsignedStackParamList = {
  EnterScreen: undefined;
  SignUpScreen: undefined;
  LoginScreen: undefined;
}