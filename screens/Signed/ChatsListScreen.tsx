import firebase from 'firebase';
import { StackScreenProps } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import React, { useContext, useEffect, useState } from 'react';
import CardSmall from '../../components/CardSmall';
import Header from '../../components/Header';
import { SafeAreaView, ScrollView, View } from '../../components/View';
import { ChatsTabParamList } from '../../types';
import { UserContext } from '../../context';

export default function ChatsListScreen({ navigation }: StackScreenProps<ChatsTabParamList, 'ChatsListScreen'>) {
  const [user] = useContext(UserContext);
  const [chatrooms, chatroomsSet] = useState<{ id: string; name: string; lastMessage: string }[]>([]);
  useEffect(() => {
    firebase
      .database()
      .ref(`userChatrooms/${user.id}`)
      .on('value', (snapshot) => {
        const value = snapshot.val();
        chatroomsSet(Object.values(value || {}));
      });
  }, []);
  return (
    <SafeAreaView>
      <StatusBar style="dark" />
      <ScrollView>
        <View style={{ flex: 1, paddingHorizontal: 15 }}>
          <Header title="Чат" />

          {chatrooms.map((chatroom) => (
            <CardSmall
              key={chatroom.id}
              onPress={() => navigation.push('ChatScreen', { ...chatroom } as any)}
              withLine
              title={chatroom.name}
              text={chatroom.lastMessage}
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
