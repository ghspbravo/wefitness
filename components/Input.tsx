import React, { ReactElement, forwardRef, Ref } from 'react';
import { StyleSheet, TextInput } from 'react-native';
import Colors from '../constants/Colors';

function Input(props: TextInput['props'], ref: Ref<TextInput>): ReactElement {
  const style = StyleSheet.create({
    input: {
      height: props.multiline ? 120 : 50,
      borderColor: Colors.bgLight,
      backgroundColor: Colors.bgLight,
      borderWidth: 1,
      borderRadius: 5,

      fontSize: 16,
      paddingHorizontal: 14
    }
  });

  return <TextInput ref={ref} style={[style.input]} placeholderTextColor={Colors.muted} {...props} />;
}

export default forwardRef(Input);
