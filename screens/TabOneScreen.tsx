import * as React from 'react';
import { StyleSheet, View } from 'react-native';

import { Text } from '../components/Typo';

export default function TabOneScreen() {
  return (
    <View style={styles.container}>
      <Text type='h2'>Tab One</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
