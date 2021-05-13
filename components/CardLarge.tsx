import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import Colors from '../constants/Colors';
import Image from './Image';
import Spacer from './Spacer';
import { Text } from './Typo';
import { View } from './View';

interface Props {
  image?: string;
  title: string;
  width?: number;
}

const CardLarge = ({ image, title, width = 110, style, ...otherProps }: Props & TouchableOpacity['props']) => {
  return (
    <View>
      <TouchableOpacity activeOpacity={0.6} style={[{ flex: 1, width: width }, style]} {...otherProps}>
        <Image use="square" width={width} height={width} src={image} />
        <Spacer />
        <Text>{title}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CardLarge;
