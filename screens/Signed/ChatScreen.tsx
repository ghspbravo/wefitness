import { StackScreenProps } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { GestureResponderEvent, KeyboardAvoidingView, Platform } from 'react-native';
import Button from '../../components/Button';
import Header from '../../components/Header';
import Icon from '../../components/Icon';
import Input from '../../components/Input';
import Message from '../../components/Message';
import Spacer from '../../components/Spacer';
import { SafeAreaView, ScrollView, View } from '../../components/View';
import Colors from '../../constants/Colors';
import { ChatsTabParamList } from '../../types';

export default function ChatScreen({ navigation }: StackScreenProps<ChatsTabParamList, 'ChatScreen'>) {
  return (
    <SafeAreaView>
      <StatusBar style="dark" />
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <View style={{ flex: 1, paddingHorizontal: 15 }}>
          <ScrollView>
            <View style={{ flex: 1 }}>
              <Header hasBackAction title="Костя - бокс" />
              <Message>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec fringilla quam eu faci lisis mollis.
              </Message>
              <Spacer />
              <Message isSent>Lorem ipsum dolor sit amet, consectetur adipiscing elit. </Message>
              <Spacer />
              <Message>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec fringilla quam eu faci lisis mollis.
              </Message>
              <Spacer />
              <Message isSent>Lorem ipsum dolor sit amet, consectetur adipiscing elit. </Message>
              <Spacer />
              <Message>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec fringilla quam eu faci lisis mollis.
              </Message>
              <Spacer />
              <Message isSent>Lorem ipsum dolor sit amet, consectetur adipiscing elit. </Message>
              <Spacer />
              <Message>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec fringilla quam eu faci lisis mollis.
              </Message>
              <Spacer />
              <Message isSent>Lorem ipsum dolor sit amet, consectetur adipiscing elit. </Message>
              <Spacer />
            </View>
          </ScrollView>
          <Spacer />
          <View style={{ position: 'relative' }}>
            <Input placeholder="Введите сообщение..." />

            <View style={{ position: 'absolute', right: 7, bottom: 10, zIndex: 10 }}>
              <Button
                onPress={() => {
                  alert('pressed');
                }}
                style={{ width: 34, height: 34, padding: 4 }}
                caption={<Icon color={Colors.white} name="arrow-up" />}
              />
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
