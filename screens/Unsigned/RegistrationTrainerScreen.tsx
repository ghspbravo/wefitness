import firebase from 'firebase/app';
import { useNavigation } from '@react-navigation/core';
import React, { Ref, useRef, useState, useEffect } from 'react';
import { Keyboard, KeyboardAvoidingView, Platform, TextInput, TouchableWithoutFeedback } from 'react-native';
import Button from '../../components/Button';
import Header from '../../components/Header';
import Input from '../../components/Input';
import Spacer from '../../components/Spacer';
import { Text } from '../../components/Typo';
import { SafeAreaView, ScrollView, View } from '../../components/View';
import Colors from '../../constants/Colors';
import { errorResponse } from '../../types';

import * as ImagePicker from 'expo-image-picker';
import Checkbox from '../../components/Checkbox';

let photoUri: string;
export default function RegistrationTrainerScreen() {
  const navigation = useNavigation();

  const [isLoading, setLoading] = useState(false);

  const passwordInput: Ref<TextInput> = useRef(null);
  const nameInput: Ref<TextInput> = useRef(null);
  const cityInput: Ref<TextInput> = useRef(null);
  const categoryInput: Ref<TextInput> = useRef(null);
  const ageInput: Ref<TextInput> = useRef(null);
  const phoneInput: Ref<TextInput> = useRef(null);
  const genderInput: Ref<TextInput> = useRef(null);
  const graduationInput: Ref<TextInput> = useRef(null);
  const achievementsInput: Ref<TextInput> = useRef(null);

  const [email, emailSet] = useState('');
  const [password, passwordSet] = useState('');
  const [name, nameSet] = useState('');
  const [city, citySet] = useState('');
  const [category, categorySet] = useState('');

  const [age, ageSet] = useState('');
  const [phone, phoneSet] = useState('');
  const [gender, genderSet] = useState('');
  const [graduation, graduationSet] = useState('');
  const [achievements, achievementsSet] = useState('');
  const [isLegal, isLegalSet] = useState(false);
  const [error, errorSet] = useState('');

  const onSubmitHandler = async () => {
    if (
      !email ||
      !password ||
      !name ||
      !city ||
      !category ||
      !age ||
      !phone ||
      !gender ||
      !graduation ||
      !achievements
    ) {
      return errorSet('?????????????????? ?????? ????????!');
    }
    if (!photoUri) {
      return errorSet('???????????????? ????????!');
    }

    setLoading(true);

    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((user) => {
        const uid = user.user?.uid || 'default';
        uploadImageAsync(photoUri, uid);

        firebase
          .database()
          .ref('users/' + uid)
          .set({
            name,
            city,
            category,
            age,
            phone,
            gender,
            graduation,
            achievements,
            isLegal
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

  useEffect(() => {
    (async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        alert('???? ?????????????????????? ???????????? ?? ???????????? ???? ???? ?????????????? ?????????????????? ???????? ??????????????.');
      }
    })();
  }, []);

  const pickImage = async () => {
    let result: any = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      allowsMultipleSelection: false,
      aspect: [4, 3],
      quality: 0.3
    });

    photoUri = result.uri;
  };

  async function uploadImageAsync(uri: string, uid: string) {
    // See example: https://github.com/expo/firebase-storage-upload-example/blob/master/App.js
    const blob: any = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function (e) {
        console.log(e);
        reject(new TypeError('Network request failed'));
      };
      xhr.responseType = 'blob';
      xhr.open('GET', uri, true);
      xhr.send(null);
    });

    await firebase.storage().ref(`users/${uid}.png`).put(blob).catch(alert);

    // We're done with the blob, close and release it
    blob.close();
  }

  return (
    <SafeAreaView>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollView style={{ flex: 1 }}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={{ flex: 1, paddingHorizontal: 15 }}>
              <Header
                title="??????????????????????"
                right={<Button use="link" caption="????????" onPress={() => navigation.navigate('LoginScreen')} />}
              />

              <View style={{ flex: 1, justifyContent: 'center' }}>
                <Input
                  onSubmitEditing={() => passwordInput.current?.focus()}
                  onChangeText={emailSet}
                  returnKeyType="next"
                  keyboardType="email-address"
                  autoCompleteType="email"
                  autoCapitalize="none"
                  placeholder="??????????"
                />
                <Spacer height={20} />
                <Input
                  ref={passwordInput}
                  onSubmitEditing={() => nameInput.current?.focus()}
                  onChangeText={passwordSet}
                  returnKeyType="next"
                  secureTextEntry
                  autoCompleteType="password"
                  placeholder="????????????"
                />
                <Spacer height={20} />
                <Input
                  ref={nameInput}
                  onSubmitEditing={() => cityInput.current?.focus()}
                  onChangeText={nameSet}
                  returnKeyType="next"
                  placeholder="??????"
                />
                <Spacer height={20} />
                <Input
                  ref={cityInput}
                  onSubmitEditing={() => categoryInput.current?.focus()}
                  onChangeText={citySet}
                  returnKeyType="next"
                  placeholder="??????????"
                />
                <Spacer height={20} />
                <Input
                  ref={categoryInput}
                  onSubmitEditing={() => ageInput.current?.focus()}
                  onChangeText={categorySet}
                  returnKeyType="next"
                  placeholder="??????????????????/??????????????????????"
                />

                {/* extra info */}
                <Spacer height={20} />
                <Input
                  ref={ageInput}
                  onSubmitEditing={() => phoneInput.current?.focus()}
                  onChangeText={ageSet}
                  returnKeyType="next"
                  keyboardType="numeric"
                  placeholder="??????????????"
                />
                <Spacer height={20} />
                <Input
                  ref={phoneInput}
                  onSubmitEditing={() => genderInput.current?.focus()}
                  onChangeText={phoneSet}
                  returnKeyType="next"
                  keyboardType="phone-pad"
                  placeholder="?????????? ????????????????"
                />
                <Spacer height={20} />
                <Input
                  ref={genderInput}
                  onSubmitEditing={() => graduationInput.current?.focus()}
                  onChangeText={genderSet}
                  returnKeyType="next"
                  placeholder="??????"
                />
                <Spacer height={20} />
                <Input
                  ref={graduationInput}
                  onSubmitEditing={() => achievementsInput.current?.focus()}
                  onChangeText={graduationSet}
                  returnKeyType="next"
                  placeholder="??????????????????????"
                />
                <Spacer height={20} />
                <Input
                  ref={achievementsInput}
                  onSubmitEditing={onSubmitHandler}
                  onChangeText={achievementsSet}
                  returnKeyType="done"
                  placeholder="??????????????"
                />
                <Spacer />
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Checkbox checked={isLegal} onChange={isLegalSet} />
                  <Text style={{ marginLeft: 15 }}>?????????????? ????</Text>
                </View>

                <Spacer />
                {!!error && <Text color={Colors.danger}>{error}</Text>}
              </View>

              <Spacer height={30} />
              <Button use="outline" onPress={pickImage} caption={'?????????????? ????????'} />

              <Spacer height={30} />
              <Button disabled={isLoading} onPress={onSubmitHandler} caption={isLoading ? '...' : '??????????????????????'} />
            </View>
          </TouchableWithoutFeedback>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
