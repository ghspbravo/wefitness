import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import Colors from '../constants/Colors';
import { Text } from './Typo';
import { View } from './View';

interface Props {
  title: string;
  date: string;
  isActive?: boolean;
  withLine?: boolean;
}

export default function TrainingDateItem({
  title,
  date,
  isActive,
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
        <Text color={isActive ? Colors.black : Colors.muted} use="h6">
          {title}
        </Text>
        <View style={{ marginLeft: 'auto', flexDirection: 'row' }}>
          <Text color={isActive ? Colors.black : Colors.muted} use="h6">
            {date}
          </Text>
          <View style={{ marginLeft: 10 }}>
            <Indicator isActive={isActive} />
          </View>
        </View>
      </TouchableOpacity>
      {withLine && <View style={styles.line} />}
    </View>
  );
}

function Indicator({ isActive }: { isActive?: boolean }) {
  const styles = StyleSheet.create({
    indicator: {
      width: 16,
      height: 16,
      padding: 1,

      borderWidth: 1,
      borderStyle: 'solid',
      borderColor: isActive ? Colors.success : Colors.muted,
      borderRadius: 25,

      overflow: 'hidden'
    },
    indicatorInner: {
      flex: 1,
      backgroundColor: Colors.acsent,
      borderRadius: 25
    }
  });

  return <View style={styles.indicator}>{isActive && <View style={styles.indicatorInner} />}</View>;
}
