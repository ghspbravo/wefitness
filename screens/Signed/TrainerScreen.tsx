import firebase from 'firebase';
import { StackScreenProps } from '@react-navigation/stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import Header from '../../components/Header';
import Image from '../../components/Image';
import Spacer from '../../components/Spacer';
import { ScrollView, View } from '../../components/View';
import Colors from '../../constants/Colors';
import { ProfileTabParamList } from '../../types';
import { Text } from '../../components/Typo';
import TrainingDateItem from '../../components/TrainingDateItem';
import { getShortDate, getShortName, isActiveDate } from '../../helpers';

export default function TrainerScreen({ route, navigation }: StackScreenProps<ProfileTabParamList, 'TrainerScreen'>) {
  const insets = useSafeAreaInsets();
  const { uid }: any = route.params;

  const [trainer, trainerSet] = useState<{ id: string; name?: string; city?: string }>({ id: uid });
  const [trainings, trainingsSet] = useState<{ id: string; title: string; date: number; duration: number }[]>([]);
  useEffect(() => {
    firebase
      .database()
      .ref(`users/${uid}`)
      .once('value')
      .then((snapshot) => {
        const value = snapshot.val();
        trainerSet({ id: uid, ...value });
      });

    firebase
      .database()
      .ref(`userTrainings/${uid}`)
      .once('value')
      .then((snapshot) => {
        const value = snapshot.val();
        trainingsSet(Object.values(value || {}));
      });
  }, []);
  const [avatar, avatarSet] = useState();
  useEffect(() => {
    const avatarRef = firebase.storage().ref(`users/${uid}.png`);
    avatarRef.getDownloadURL().then(avatarSet);
  }, []);
  return (
    <ScrollView>
      <StatusBar style="light" />
      <View
        style={{
          paddingTop: insets.top,
          paddingHorizontal: 15,
          backgroundColor: Colors.acsent,
          height: 265
        }}>
        <Header title="Профиль" isAcsent hasBackAction />
        <View style={{ alignItems: 'center' }}>
          <Image src={avatar} style={{ marginTop: 15 }} use="rounded" width={160} height={160} />
        </View>
      </View>
      <Spacer height={45} />

      <View style={{ paddingHorizontal: 15 }}>
        <View style={{ alignItems: 'center' }}>
          <Text use="h1">{getShortName(trainer.name)}</Text>
          <Spacer />
          <Text use="h6">{trainer.city}</Text>
          <Spacer height={30} />
        </View>

        <View>
          {trainings.map((training) => (
            <TrainingDateItem
              key={training.id}
              onPress={() => navigation.push('TrainingScreen', { id: training.id } as any)}
              isActive={isActiveDate(training.date, training.duration)}
              title={training.title}
              date={getShortDate(training.date)}
              withLine
            />
          ))}
        </View>
      </View>
    </ScrollView>
  );
}
