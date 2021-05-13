import * as React from 'react';
import { Text as DefaultText, View as DefaultView, ScrollView as DefaultScrollView } from 'react-native';
import { SafeAreaView as DefaultSafeAreaView } from 'react-native-safe-area-context';
import Colors from '../constants/Colors';

export type ViewProps = DefaultView['props'];

export function View(props: ViewProps) {
  const { style, ...otherProps } = props;

  return <DefaultView style={[style]} {...otherProps} />;
}

export function ScrollView(props: DefaultScrollView['props']) {
  const { style, ...otherProps } = props;

  return <DefaultScrollView style={[{ backgroundColor: Colors.white }, style]} {...otherProps} />;
}

export function SafeAreaView(props: ViewProps) {
  const { style, ...otherProps } = props;

  return <DefaultSafeAreaView style={[{ backgroundColor: Colors.white, flex: 1 }, style]} {...otherProps} />;
}
