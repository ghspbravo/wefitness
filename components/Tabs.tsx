import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import Colors from '../constants/Colors';
import Spacer from './Spacer';
import { Text } from './Typo';
import { View } from './View';

interface Props {
  tab1: string;
  tab2: string;

  tab1Content: React.ReactElement;
  tab2Content: React.ReactElement;
}

const Tabs = ({ tab1, tab2, tab1Content, tab2Content }: Props) => {
  const [activeFirst, activeFirstSet] = useState(true);

  const onFirstTabPress = () => activeFirstSet(true);
  const onSecondTabPress = () => activeFirstSet(false);
  return (
    <View>
      <View style={styles.container}>
        <TouchableOpacity
          style={[styles.tabView, activeFirst ? styles.tabActive : {}]}
          onPress={onFirstTabPress}
          activeOpacity={0.9}>
          <Text style={{ textAlign: 'center', color: activeFirst ? Colors.acsent : Colors.muted }}>{tab1}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabView, !activeFirst ? styles.tabActive : {}]}
          onPress={onSecondTabPress}
          activeOpacity={0.9}>
          <Text style={{ textAlign: 'center', color: activeFirst ? Colors.muted : Colors.acsent }}>{tab2}</Text>
        </TouchableOpacity>
      </View>

      <Spacer />
      {activeFirst ? tab1Content : tab2Content}
    </View>
  );
};

export default Tabs;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',

    padding: 2,

    backgroundColor: Colors.bgLight,
    borderRadius: 25,
    overflow: 'hidden'
  },
  tabView: {
    flex: 1,

    backgroundColor: Colors.bgLight,
    paddingHorizontal: 5,
    paddingVertical: 12,

    textAlign: 'center'
  },
  tabActive: {
    backgroundColor: Colors.white,
    borderRadius: 25
  }
});
