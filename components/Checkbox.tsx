import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import Colors from '../constants/Colors';
import Icon from './Icon';

function Checkbox({ checked, onChange }: { checked: boolean; onChange: Function }) {
  function onCheckmarkPress() {
    onChange(!checked);
  }

  return (
    <Pressable style={[styles.checkboxBase, checked && styles.checkboxChecked]} onPress={onCheckmarkPress}>
      {checked && <Icon name="checkbox-marked" size={28} color={Colors.acsent} />}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  checkboxBase: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderWidth: 2,
    borderColor: Colors.acsent,
    backgroundColor: 'transparent'
  },

  checkboxChecked: {
    backgroundColor: Colors.white,
    borderWidth: 0
  }
});

export default Checkbox;
