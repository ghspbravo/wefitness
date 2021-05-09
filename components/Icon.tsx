// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/

import React from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Icon = (props: React.ComponentProps<typeof MaterialCommunityIcons>) => {
  const { style, size = 24, ...otherProps } = props;

  return <MaterialCommunityIcons size={size} style={[style]} {...otherProps} />;
};

export default Icon;
