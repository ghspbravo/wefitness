import React from 'react';
import { useNavigation } from '@react-navigation/native';

import Button from './Button';
import { Text } from './Typo';
import { View } from './View';
import Colors from '../constants/Colors';

interface Props {
  title: string | React.ReactElement;
  left?: React.ReactElement;
  right?: React.ReactElement;
  hasBackAction?: boolean;
  isAcsent?: boolean;
}

const Header = ({ title, left = <></>, right = <></>, hasBackAction, isAcsent }: Props) => {
  const navigation = useNavigation();

  const onBackPress = () => {
    navigation.canGoBack() && navigation.goBack();
  };
  return (
    <View style={{ height: 36, marginBottom: 30, marginTop: 15 }}>
      <View style={{ position: 'absolute', left: 0, zIndex: 5 }}>
        {hasBackAction ? (
          <Button
            onPress={onBackPress}
            style={{ color: isAcsent ? Colors.white : Colors.acsent }}
            use="link"
            caption="Назад"
          />
        ) : (
          left
        )}
      </View>
      <View style={{ position: 'absolute', left: 0, right: 0, alignItems: 'center', justifyContent: 'center' }}>
        <Text color={isAcsent ? Colors.white : Colors.black} use="h1">
          {title}
        </Text>
      </View>
      <View style={{ position: 'absolute', right: 0, zIndex: 5 }}>{right}</View>
    </View>
  );
};

export default Header;
