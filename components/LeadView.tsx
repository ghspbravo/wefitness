import React from 'react';
import { StyleSheet, View as DefaultView } from 'react-native';
import Colors from '../constants/Colors';
import { View } from './View';

const LeadView = (props: DefaultView['props']) => {
  const { style, ...otherProps } = props;
  return <View style={[styles.leadContainer, style]} {...otherProps} />;
};

export default LeadView;

const styles = StyleSheet.create({
  leadContainer: {
    backgroundColor: Colors.bgLight,
    borderRadius: 10,
    paddingHorizontal: 7,
    paddingVertical: 15
  }
});
