import { useNavigation } from '@react-navigation/core';
import React, { Ref, useContext, useRef, useState } from 'react';
import { Keyboard, TextInput, TouchableWithoutFeedback } from 'react-native';
import Button from '../../components/Button';
import Header from '../../components/Header';
import Input from '../../components/Input';
import Spacer from '../../components/Spacer';
import { Text } from '../../components/Typo';
import { SafeAreaView, ScrollView, View } from '../../components/View';
import Colors from '../../constants/Colors';
import { UserContext } from '../../context';

export default function RegistrationScreen() {
  const navigation = useNavigation();

  const [isLoading, setLoading] = useState(false);

  const passwordInput: Ref<TextInput> = useRef(null);
  const nameInput: Ref<TextInput> = useRef(null);
  const cityInput: Ref<TextInput> = useRef(null);

  const [email, emailSet] = useState('');
  const [password, passwordSet] = useState('');
  const [name, nameSet] = useState('');
  const [city, citySet] = useState('');
  const [error, errorSet] = useState('');

  const [user, setUser] = useContext(UserContext);
  const onSubmitHandler = () => {
    setUser({ isLoggedIn: true });
  };
  return (
    <SafeAreaView>
      <ScrollView style={{ flex: 1 }}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={{ flex: 1, paddingHorizontal: 15 }}>
            <Header
              title="Регистрация"
              right={<Button use="link" caption="Вход" onPress={() => navigation.navigate('LoginScreen')} />}
            />

            <View style={{ flex: 1, justifyContent: 'center' }}>
              <Input
                onSubmitEditing={() => passwordInput.current?.focus()}
                onChangeText={emailSet}
                returnKeyType="next"
                keyboardType="email-address"
                autoCompleteType="email"
                autoCapitalize="none"
                placeholder="Почта"
              />
              <Spacer height={20} />
              <Input
                ref={passwordInput}
                onSubmitEditing={() => nameInput.current?.focus()}
                onChangeText={passwordSet}
                returnKeyType="next"
                secureTextEntry
                autoCompleteType="password"
                placeholder="Пароль"
              />
              <Spacer height={20} />
              <Input
                ref={nameInput}
                onSubmitEditing={() => cityInput.current?.focus()}
                onChangeText={nameSet}
                returnKeyType="next"
                placeholder="Имя"
              />
              <Spacer height={20} />
              <Input
                ref={cityInput}
                onSubmitEditing={onSubmitHandler}
                onChangeText={citySet}
                returnKeyType="done"
                placeholder="Город"
              />

              <Spacer />
              {!!error && <Text color={Colors.danger}>{error}</Text>}
            </View>

            <Spacer height={30} />
            <Button disabled={isLoading} onPress={onSubmitHandler} caption={isLoading ? '...' : 'Регистрация'} />
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>
    </SafeAreaView>
  );
}
