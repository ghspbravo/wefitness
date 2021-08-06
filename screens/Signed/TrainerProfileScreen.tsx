import firebase from 'firebase/app';
import { StackScreenProps } from '@react-navigation/stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import React, { useContext, useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import Button from '../../components/Button';
import Header from '../../components/Header';
import Image from '../../components/Image';
import Spacer from '../../components/Spacer';
import { ScrollView, View } from '../../components/View';
import Colors from '../../constants/Colors';
import { ProfileTabParamList } from '../../types';
import { UserContext } from '../../context';
import { Text } from '../../components/Typo';
import TrainingDateItem from '../../components/TrainingDateItem';
import { getShortDate, getShortName, isActiveDate } from '../../helpers';

let avatarLoaded = false;
export default function TrainerProfileScreen({ navigation }: StackScreenProps<ProfileTabParamList, 'ProfileScreen'>) {
  const insets = useSafeAreaInsets();

  const [user] = useContext(UserContext);
  const onLogoutPress = () => {
    firebase.auth().signOut();
  };

  const [trainings, trainingsSet] = useState<{ id: string; title: string; date: number; duration: number }[]>([]);
  const [isLoading, isLoadingSet] = useState(true);
  useEffect(() => {
    const trainingsRef = firebase.database().ref(`userTrainings/${user.id}`);
    trainingsRef.on('value', (snapshot) => {
      const value = snapshot.val();
      trainingsSet(Object.values(value || {}));
      isLoadingSet(false);
    });

    return () => {
      trainingsRef.off('value');
    };
  }, []);
  const [avatar, avatarSet] = useState();
  let repeatCounter = 0;
  const tryLoadAvatar = () => {
    const avatarRef = firebase.storage().ref(`users/${user.id}.png`);
    avatarRef.getDownloadURL().then((url) => {
      ++repeatCounter;
      avatarSet(url);

      if (url || repeatCounter > 4) {
        avatarLoaded = true;
      } else {
        setTimeout(tryLoadAvatar, 1000);
      }
    });
  };
  useEffect(() => {
    if (!avatarLoaded) {
      tryLoadAvatar();
    }
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
        <Header
          title="Профиль"
          isAcsent
          right={<Button use="link" style={{ color: Colors.white }} onPress={onLogoutPress} caption="Выйти" />}
        />
        <View style={{ alignItems: 'center' }}>
          <Image src={avatar} style={{ marginTop: 15 }} use="rounded" width={160} height={160} />
        </View>
      </View>
      <Spacer height={45} />

      <View style={{ paddingHorizontal: 15 }}>
        <View style={{ alignItems: 'center' }}>
          <Text use="h1">{getShortName(user.name)}</Text>
          <Spacer />
          <Text use="h6">{user.city}</Text>
          <Spacer height={30} />
        </View>

        <View>
          {isLoading ? (
            <Text>...</Text>
          ) : trainings.length > 0 ? (
            trainings.map((training) => (
              <TrainingDateItem
                key={training.id}
                onPress={() => navigation.push('TrainingScreen', { id: training.id } as any)}
                isActive={isActiveDate(training.date, training.duration)}
                title={training.title}
                date={getShortDate(training.date)}
                withLine
              />
            ))
          ) : (
            <Text>Нет созданных тренировок</Text>
          )}
        </View>
      </View>
    </ScrollView>
  );
}
