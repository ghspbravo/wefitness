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
import Tabs from '../../components/Tabs';
import CardSmall from '../../components/CardSmall';
import TrainingDateItem from '../../components/TrainingDateItem';
import { getShortDate, getShortName, isActiveDate } from '../../helpers';

export default function ProfileScreen({ navigation }: StackScreenProps<ProfileTabParamList, 'ProfileScreen'>) {
  const insets = useSafeAreaInsets();

  const [user] = useContext(UserContext);
  const onLogoutPress = () => {
    firebase.auth().signOut();
  };

  const [trainings, trainingsSet] = useState<{ id: string; title: string; date: number; duration: number }[]>([]);
  useEffect(() => {
    const trainingsRef = firebase.database().ref(`userTrainings/${user.id}`);
    trainingsRef.once('value', (snapshot) => {
      const value = snapshot.val();
      trainingsSet(Object.values(value || {}));
    });

    return () => {
      trainingsRef.off('value');
    };
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
          <Image style={{ marginTop: 15 }} use="rounded" width={160} height={160} />
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

        <Tabs
          tab1="Данные"
          tab2="Тренировки"
          tab1Content={
            <View>
              <CardSmall title="Мои показатели" text="Отслеживайте свой прогресс" withLine />
              <CardSmall title="Мой кошелёк" text="Пополните кошелёк на будущее" withLine />
              <CardSmall
                onPress={() => navigation.push('TrainersScreen')}
                title="Список тренеров"
                text="Вы всегда выбрать персональную тренировку"
                withLine
              />
            </View>
          }
          tab2Content={
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
          }
        />
      </View>
    </ScrollView>
  );
}
