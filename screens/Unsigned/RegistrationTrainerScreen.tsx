import firebase from 'firebase/app';
import { useNavigation } from '@react-navigation/core';
import React, { Ref, useRef, useState } from 'react';
import { Keyboard, TextInput, TouchableWithoutFeedback } from 'react-native';
import Button from '../../components/Button';
import Header from '../../components/Header';
import Input from '../../components/Input';
import Spacer from '../../components/Spacer';
import { Text } from '../../components/Typo';
import { SafeAreaView, ScrollView, View } from '../../components/View';
import Colors from '../../constants/Colors';
import { errorResponse } from '../../types';

export default function RegistrationTrainerScreen() {
  const navigation = useNavigation();

  const [isLoading, setLoading] = useState(false);

  const passwordInput: Ref<TextInput> = useRef(null);
  const nameInput: Ref<TextInput> = useRef(null);
  const cityInput: Ref<TextInput> = useRef(null);
  const categoryInput: Ref<TextInput> = useRef(null);

  const [email, emailSet] = useState('');
  const [password, passwordSet] = useState('');
  const [name, nameSet] = useState('');
  const [city, citySet] = useState('');
  const [category, categorySet] = useState('');
  const [error, errorSet] = useState('');

  const onSubmitHandler = async () => {
    if (!email || !password || !name || !city || !category) {
      return errorSet('Заполните все поля!');
    }
    setLoading(true);

    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((user) => {
        const uid = user.user?.uid;
        firebase
          .database()
          .ref('users/' + uid)
          .set({
            name,
            city,
            category
          });
        firebase
          .database()
          .ref('categories/' + category)
          .push({
            name,
            uid
          });
      })
      .catch((err: errorResponse) => {
        errorSet(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
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
                onSubmitEditing={() => categoryInput.current?.focus()}
                onChangeText={citySet}
                returnKeyType="next"
                placeholder="Город"
              />
              <Spacer height={20} />
              <Input
                ref={categoryInput}
                onSubmitEditing={onSubmitHandler}
                onChangeText={categorySet}
                returnKeyType="done"
                placeholder="Категория"
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
