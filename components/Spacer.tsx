import React, { ReactElement } from 'react';
import { View } from 'react-native';

interface Props {
  height?: number;
}

export default function Spacer({ height = 10 }: Props): ReactElement {
  return <View style={{ height }}></View>;
}
