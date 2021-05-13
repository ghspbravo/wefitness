import { StackScreenProps } from '@react-navigation/stack';
import React from 'react';
import { Image } from 'react-native';
import Button from '../../components/Button';
import Spacer from '../../components/Spacer';
import { SafeAreaView, View } from '../../components/View';
import { UnsignedStackParamList } from '../../types';

export default function EnterScreen({ navigation }: StackScreenProps<UnsignedStackParamList, 'EnterScreen'>) {
  const onLoginPress = () => {
    navigation.push('LoginScreen');
  };
  const onRegisterPress = () => {
    navigation.push('SignUpScreen');
  };
  return (
    <SafeAreaView>
      <View style={{ paddingHorizontal: 60, flex: 1 }}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Image style={{ width: 136, height: 66 }} source={require('../../assets/images/logo.png')} />
        </View>

        <View style={{ marginTop: 'auto', marginBottom: 100 }}>
          <Button onPress={onLoginPress} caption="Вход" />
          <Spacer height={25} />
          <Button onPress={onRegisterPress} use="outline" caption="Регистрация" />
        </View>
      </View>
    </SafeAreaView>
  );
}
