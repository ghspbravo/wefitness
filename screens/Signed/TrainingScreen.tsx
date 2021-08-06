import firebase from 'firebase';
import * as Linking from 'expo-linking';
import { StackScreenProps } from '@react-navigation/stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import React, { useContext, useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import Header from '../../components/Header';
import Spacer from '../../components/Spacer';
import { ScrollView, View } from '../../components/View';
import Colors from '../../constants/Colors';
import { ProfileTabParamList } from '../../types';
import { Text } from '../../components/Typo';
import LeadView from '../../components/LeadView';
import Button from '../../components/Button';
import { UserContext } from '../../context';
import { getChatroomId } from '../../helpers';

export default function TrainingScreen({ route, navigation }: StackScreenProps<ProfileTabParamList, 'TrainingScreen'>) {
  const insets = useSafeAreaInsets();
  const { id }: any = route.params;

  const [training, trainingSet] = useState<{
    title?: string;
    description?: string;
    inventory?: string;
    trainerName?: string;
    trainerId?: string;
    link?: string;
    date?: number;
    duration?: number;
  }>({});
  const [userJoined, userJoinedSet] = useState(false);
  const [loading, loadingSet] = useState(true);
  useEffect(() => {
    firebase
      .database()
      .ref(`trainings/${id}`)
      .once('value')
      .then((snapshot) => {
        const value = snapshot.val();
        trainingSet({ ...value });
      });
    firebase
      .database()
      .ref(`userTrainings/${user.id}`)
      .once('value')
      .then((snapshot) => {
        const value = snapshot.val();
        const trainingsList = Object.values(value || {});

        trainingsList.forEach((training: any) => {
          if (training.id === id) {
            userJoinedSet(true);
          }
        });
        loadingSet(false);
      });
  }, []);

  const [user] = useContext(UserContext);
  const { date, description, duration, inventory, link, title, trainerName, trainerId } = training;

  const onViewPress = () => {
    Linking.openURL(link || '');
  };
  const onJoinPress = async () => {
    loadingSet(true);
    await firebase.database().ref(`userTrainings/${user.id}`).push({
      id,
      date,
      duration,
      title
    });
    const chatroomId = getChatroomId(user.id || '', trainerId || '');
    await firebase
      .database()
      .ref(`userChatrooms/${user.id}/${chatroomId}`)
      .set({
        id: getChatroomId(user.id || '', trainerId || ''),
        name: `${trainerName?.split(' ')[0]} – ${title}`,
        lastMessage: '',
        lastMessageDate: 0,
        userId: trainerId
      });
    // for trainer too
    await firebase
      .database()
      .ref(`userChatrooms/${trainerId}/${chatroomId}`)
      .set({
        id: getChatroomId(user.id || '', trainerId || ''),
        name: user.name?.split(' ')[0],
        lastMessage: '',
        lastMessageDate: 0,
        userId: user.id
      });

    loadingSet(false);
    userJoinedSet(true);
  };
  return (
    <ScrollView>
      <StatusBar style="light" />
      <View
        style={{
          paddingTop: insets.top,
          paddingHorizontal: 15,
          backgroundColor: Colors.acsent,
          paddingBottom: 30
        }}>
        <Header
          title={title || ''}
          isAcsent
          hasBackAction
          right={
            <Button
              disabled={loading}
              use="outline"
              onPress={userJoined ? onViewPress : onJoinPress}
              style={{ padding: 6 }}
              caption={userJoined ? 'Смотреть' : 'Записаться'}
            />
          }
        />
      </View>
      <Spacer height={15} />

      <View style={{ paddingHorizontal: 15 }}>
        <Text use="h2">Описание</Text>
        <Spacer height={15} />

        <LeadView>
          <Text>{description}</Text>
        </LeadView>

        <Spacer />
        <Text>Вас будет тренировать:</Text>
        <Spacer />
        <Text use="h6">{trainerName}</Text>

        <Spacer height={30} />
        <Text use="h2">Инвентарь</Text>
        <Spacer height={15} />
        <Text>{inventory}</Text>
      </View>
    </ScrollView>
  );
}
