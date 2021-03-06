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
import { getChatroomId, isActiveDate, isTrainerApp } from '../../helpers';
import Icon from '../../components/Icon';

export default function TrainingScreen({ route, navigation }: StackScreenProps<ProfileTabParamList, 'TrainingScreen'>) {
  const insets = useSafeAreaInsets();
  const { id }: any = route.params;

  interface AttendeeInterface {
    id: string;
    name: string;
  }
  const [training, trainingSet] = useState<{
    title?: string;
    description?: string;
    inventory?: string;
    trainerName?: string;
    trainerId?: string;
    link?: string;
    date?: number;
    duration?: number;
    attendesList?: any;
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
    Linking.openURL(link || '').catch(() => alert('???????????????????? ?????????????? ????????????????????'));
  };
  const onJoinPress = async () => {
    loadingSet(true);

    // CREATE NEW TRAINING IN USER TRAININGS LIST
    await firebase.database().ref(`userTrainings/${user.id}`).push({
      id,
      date,
      duration,
      title
    });

    // JOIN TO ATTENDEE LIST IN TRAINING
    await firebase
      .database()
      .ref(`trainings/${id}/attendesList`)
      .push({
        id: user.id,
        name: user.name
      } as AttendeeInterface);

    // CREATE CHATROOMS
    const chatroomId = getChatroomId(user.id || '', trainerId || '');
    await firebase
      .database()
      .ref(`userChatrooms/${user.id}/${chatroomId}`)
      .set({
        id: getChatroomId(user.id || '', trainerId || ''),
        name: `${trainerName?.split(' ')[0]} ??? ${title}`,
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

  function PersonLink(personId: string, personName: string) {
    const onPersonPress = () => {
      navigation.push('TrainerScreen', { uid: personId } as any);
    };
    return (
      <Button
        key={personId}
        use="link"
        style={{ paddingVertical: 5 }}
        onPress={onPersonPress}
        caption={
          <Text use="h6">
            {personName} <Icon size={16} name="arrow-top-right" />
          </Text>
        }
      />
    );
  }

  const attendees = (training.attendesList && (Object.values(training.attendesList) as AttendeeInterface[])) || [];
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
            userJoined ? undefined : isActiveDate(training.date || 0, training.duration) ? (
              <Button
                disabled={loading}
                use="outline"
                onPress={userJoined ? onViewPress : onJoinPress}
                style={{ padding: 6 }}
                caption={userJoined ? '????????????????' : '????????????????????'}
              />
            ) : undefined
          }
        />
      </View>
      <Spacer height={15} />

      <View style={{ paddingHorizontal: 15 }}>
        <Text use="h2">????????????????</Text>
        <Spacer height={15} />

        <LeadView>
          <Text>{description}</Text>
        </LeadView>

        <Spacer />
        <Text>{isTrainerApp ? '???? ???????????????????? ????????????????' : '?????? ?????????? ??????????????????????'}:</Text>
        <Spacer />
        {!isTrainerApp && trainerName && trainerId ? PersonLink(trainerId, trainerName) : null}

        {isTrainerApp ? (
          attendees?.length > 0 ? (
            attendees?.map((person: AttendeeInterface) => PersonLink(person.id, person.name))
          ) : (
            <Text>?????????? ???? ?????????????? ???? ????????????????????</Text>
          )
        ) : null}

        <Spacer height={30} />
        <Text use="h2">??????????????????</Text>
        <Spacer height={15} />
        <Text>{inventory}</Text>
      </View>
    </ScrollView>
  );
}
