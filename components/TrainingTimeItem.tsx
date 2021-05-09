import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import Colors from '../constants/Colors';
import { Text } from './Typo';
import { View } from './View';

interface Props {
  title: string;
  time: string;
  duration?: string;
  withLine?: boolean;
}

export default function TrainingTimeItem({
  title,
  time,
  duration,
  withLine,
  ...otherProps
}: Props & TouchableOpacity['props']) {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'row',
      paddingVertical: 15
    },
    line: {
      flex: 1,
      height: 1,
      backgroundColor: Colors.stroke
    }
  });

  return (
    <View>
      <TouchableOpacity activeOpacity={0.6} style={styles.container} {...otherProps}>
        <View style={{ marginRight: 10 }}>
          <Indicator />
        </View>
        <View style={{ marginRight: 10 }}>
          <Text use="h6">{time}</Text>
        </View>
        <Text use="h6">{title}</Text>
        <View style={{ marginLeft: 'auto' }}>
          <Text>{duration}</Text>
        </View>
      </TouchableOpacity>
      {withLine && <View style={styles.line} />}
    </View>
  );
}

function Indicator() {
  const styles = StyleSheet.create({
    indicator: {
      width: 16,
      height: 16,

      backgroundColor: Colors.acsent,
      borderRadius: 25,

      overflow: 'hidden'
    }
  });

  return <View style={styles.indicator} />;
}
