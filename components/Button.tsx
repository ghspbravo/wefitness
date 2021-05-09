import React, { ReactElement } from 'react';
import { StyleProp, StyleSheet, ViewStyle } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Colors from '../constants/Colors';
import { Text } from './Typo';
import { View } from './View';

export enum ButtonTypes {
  Primary = 'primary',
  Outline = 'outline',
  Link = 'link'
}

interface Props {
  caption: string;
  use?: 'primary' | 'outline' | 'link' | ButtonTypes;
  style?: StyleProp<ViewStyle>;
}

export default function Button({
  use = ButtonTypes.Primary,
  caption,
  style,
  ...otherProps
}: Props & TouchableOpacity['props']): ReactElement {
  const _styles = StyleSheet.create({
    buttonContainer: {
      width: '100%',
      padding: 14,
      borderRadius: 25
    },
    buttonText: {
      fontSize: 16,
      textAlign: 'center',
      color: use === ButtonTypes.Primary ? Colors.white : Colors.acsent
    }
  });

  const buttonStyles: StyleProp<ViewStyle> = [_styles.buttonContainer];

  if (use === ButtonTypes.Primary) {
    buttonStyles.push({
      backgroundColor: Colors.acsent
    });
  }

  if (use === ButtonTypes.Outline) {
    buttonStyles.push({
      borderStyle: 'solid',
      borderWidth: 1,
      borderColor: Colors.acsent
    });
  }

  if (style) {
    buttonStyles.push(style);
  }

  return use === ButtonTypes.Link ? (
    <TouchableOpacity activeOpacity={0.6} style={styles.linkContainer} {...otherProps}>
      <Text use='h6' style={[styles.linkText, style]}>{caption}</Text>
    </TouchableOpacity>
  ) : (
    <TouchableOpacity activeOpacity={0.8} style={styles.container} {...otherProps}>
      <View style={buttonStyles}>
        <Text use='h6' style={_styles.buttonText}>{caption}</Text>
      </View>
    </TouchableOpacity>
  );
}

const defaultProps = {
  use: ButtonTypes.Primary
};

Button.defaultProps = defaultProps;

const styles = StyleSheet.create({
  container: {
    maxHeight: 50
  },
  linkContainer: {
    paddingVertical: 5
  },
  linkText: {
    color: Colors.acsent
  }
});
