import firebase from 'firebase';
import { StackScreenProps } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import React, { useContext, useEffect, useState } from 'react';
import CardSmall from '../../components/CardSmall';
import Header from '../../components/Header';
import { SafeAreaView, ScrollView, View } from '../../components/View';
import { ChatsTabParamList } from '../../types';
import { UserContext } from '../../context';
import { Text } from '../../components/Typo';

export default function ChatsListScreen({ navigation }: StackScreenProps<ChatsTabParamList, 'ChatsListScreen'>) {
  const [user] = useContext(UserContext);
  const [isLoading, isLoadingSet] = useState(true);
  const [chatrooms, chatroomsSet] = useState<{ id: string; name: string; userId?: string; lastMessage: string }[]>([]);
  useEffect(() => {
    firebase
      .database()
      .ref(`userChatrooms/${user.id}`)
      .on('value', (snapshot) => {
        const value = snapshot.val();
        isLoadingSet(false);
        chatroomsSet(Object.values(value || {}));
      });
  }, []);

  const [avatars, avatarsSet] = useState<any>({});
  useEffect(() => {
    if (!chatrooms) return;

    Object.values(chatrooms).forEach((person) => {
      const personId = (person as any).userId;
      const avatarRef = firebase.storage().ref(`users/${personId}.png`);
      avatarRef.getDownloadURL().then((url) => {
        avatarsSet({ ...avatars, [personId]: url });
      });
    });
  }, [chatrooms]);
  return (
    <SafeAreaView>
      <StatusBar style="dark" />
      <ScrollView>
        <View style={{ flex: 1, paddingHorizontal: 15 }}>
          <Header title="Чат" />

          {isLoading ? (
            <Text>...</Text>
          ) : chatrooms.length > 0 ? (
            chatrooms.map((chatroom) => (
              <CardSmall
                image={avatars[chatroom.userId || 0]}
                key={chatroom.id}
                onPress={() => navigation.push('ChatScreen', { ...chatroom } as any)}
                withLine
                title={chatroom.name}
                text={chatroom.lastMessage}
              />
            ))
          ) : (
            <Text>Нет активных диалогов с тренерами</Text>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
