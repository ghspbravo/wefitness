import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import Colors from '../constants/Colors';
import Icon from './Icon';
import Image from './Image';
import Spacer from './Spacer';
import { Text } from './Typo';
import { View } from './View';

interface Props {
  image?: string;
  icon?: string;
  title: string;
  text?: string;
  withLine?: boolean;
}

const CardSmall = ({ image, icon, title, text, withLine, ...otherProps }: Props & TouchableOpacity['props']) => {
  const styles = StyleSheet.create({
    row: {
      flex: 1,
      flexDirection: 'row'
    },
    cardContainer: {
      paddingTop: 15,
      paddingBottom: withLine ? 0 : 15
    },
    line: {
      flex: 1,
      height: 1,
      backgroundColor: Colors.stroke
    }
  });

  return (
    <View>
      <TouchableOpacity activeOpacity={0.6} style={[styles.row, styles.cardContainer]} {...otherProps}>
        <View style={{ marginRight: 15 }}>
          {!icon && <Image use="square" width={50} height={50} src={image} />}
          {icon && <Icon size={50} name={icon as any} />}
        </View>

        <View style={{ flex: 1 }}>
          <Text use="h6">{title}</Text>
          <Spacer />
          <Text>{text}</Text>
          {withLine && (
            <View>
              <Spacer height={14} />
              <View style={styles.line} />
            </View>
          )}
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default CardSmall;
