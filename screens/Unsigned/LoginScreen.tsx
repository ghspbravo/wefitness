import { useNavigation } from '@react-navigation/core';
import React, { Ref, useContext, useRef, useState } from 'react';
import { Keyboard, KeyboardAvoidingView, Platform, TextInput, TouchableWithoutFeedback } from 'react-native';
import Button from '../../components/Button';
import Header from '../../components/Header';
import Input from '../../components/Input';
import Spacer from '../../components/Spacer';
import { Text } from '../../components/Typo';
import { SafeAreaView, View } from '../../components/View';
import Colors from '../../constants/Colors';
import { UserContext } from '../../context';

export default function LoginScreen() {
  const navigation = useNavigation();

  const [isLoading, setLoading] = useState(false);

  const passwordInput: Ref<TextInput> = useRef(null);

  const [email, emailSet] = useState('');
  const [password, passwordSet] = useState('');
  const [error, errorSet] = useState('');

  const [user, setUser] = useContext(UserContext);
  const onSubmitHandler = () => {
    setUser({ isLoggedIn: true });
  };
  return (
    <SafeAreaView>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={{ flex: 1, paddingHorizontal: 15 }}>
            <Header
              title="Вход"
              right={<Button use="link" caption="Регистрация" onPress={() => navigation.navigate('SignUpScreen')} />}
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
                onSubmitEditing={onSubmitHandler}
                onChangeText={passwordSet}
                returnKeyType="done"
                secureTextEntry
                autoCompleteType="password"
                placeholder="Пароль"
              />
              <Spacer />
              {!!error && <Text color={Colors.danger}>{error}</Text>}
            </View>

            <View style={{ marginTop: 'auto', marginBottom: 100 }}>
              <Button disabled={isLoading} onPress={onSubmitHandler} caption={isLoading ? '...' : 'Войти'} />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
