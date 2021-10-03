import moment from 'moment';
import firebase from 'firebase';
import { StackScreenProps } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import React, { useContext, useEffect, useState } from 'react';
import { KeyboardAvoidingView, Platform } from 'react-native';
import Button from '../../components/Button';
import Header from '../../components/Header';
import Icon from '../../components/Icon';
import Input from '../../components/Input';
import Message from '../../components/Message';
import Spacer from '../../components/Spacer';
import { SafeAreaView, ScrollView, View } from '../../components/View';
import Colors from '../../constants/Colors';
import { ChatsTabParamList } from '../../types';
import { UserContext } from '../../context';
import { Text } from '../../components/Typo';

export default function ChatScreen({ route, navigation }: StackScreenProps<ChatsTabParamList, 'ChatScreen'>) {
  const { id, name: trainingTitle, userId }: any = route.params;

  const titleRegexp = new RegExp('(.+) – (.+)', 'g'),
    matches = titleRegexp.exec(trainingTitle) || ['', ''],
    name = matches[1],
    title = matches[2];

  const [user] = useContext(UserContext);

  const [loading, loadingSet] = useState(false);
  const [loadingMessages, loadingMessagesSet] = useState(true);
  const [newMessage, newMessageSet] = useState('');
  const [messages, messagesSet] = useState<{ senderId: string; message: string; date: number }[]>([]);
  useEffect(() => {
    firebase
      .database()
      .ref(`chatrooms/${id}`)
      .on('value', (snapshot) => {
        const value = snapshot.val();
        loadingMessagesSet(false);
        messagesSet(Object.values(value || {}));
      });
  }, []);

  const onMessageSend = () => {
    if (!newMessage) return;
    loadingSet(true);

    firebase
      .database()
      .ref(`chatrooms/${id}`)
      .push({
        senderId: user.id,
        message: newMessage,
        date: moment().valueOf()
      })
      .then(() => {
        newMessageSet('');
        loadingSet(false);
      });
  };

  const onNavigateProfilePress = () => {
    navigation.push('TrainerScreen', { uid: userId } as any);
  };
  return (
    <SafeAreaView>
      <StatusBar style="dark" />
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <View style={{ flex: 1, paddingHorizontal: 15 }}>
          <ScrollView>
            <View style={{ flex: 1 }}>
              <Header
                hasBackAction
                title={name}
                right={
                  userId ? (
                    <Button
                      disabled={loading}
                      use="outline"
                      onPress={onNavigateProfilePress}
                      style={{ padding: 6 }}
                      caption={'Профиль'}
                    />
                  ) : undefined
                }
              />
              {title ? (
                <Text style={{ textAlign: 'center' }} use="h2">
                  {title}
                </Text>
              ) : null}
              <Spacer height={30} />

              {loadingMessages ? (
                <Text>...</Text>
              ) : messages.length > 0 ? (
                messages.map((message) => (
                  <View key={message.date}>
                    <Message isSent={message.senderId === user.id}>{message.message}</Message>
                    <Spacer />
                  </View>
                ))
              ) : (
                <Text>Сообщений нет</Text>
              )}
            </View>
          </ScrollView>
          <Spacer />
          <View style={{ position: 'relative' }}>
            <Input
              value={newMessage}
              onChangeText={newMessageSet}
              onSubmitEditing={onMessageSend}
              placeholder="Введите сообщение..."
            />

            <View style={{ position: 'absolute', right: 7, bottom: 10, zIndex: 10 }}>
              <Button
                disabled={loading}
                onPress={onMessageSend}
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
