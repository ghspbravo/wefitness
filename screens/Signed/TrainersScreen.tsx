import firebase from 'firebase';
import { StackScreenProps } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import CardLarge from '../../components/CardLarge';
import Header from '../../components/Header';
import { Text } from '../../components/Typo';
import { SafeAreaView, ScrollView, View } from '../../components/View';
import { ProfileTabParamList } from '../../types';

export default function TrainersScreen({ navigation }: StackScreenProps<ProfileTabParamList, 'TrainersScreen'>) {
  const [isLoading, isLoadingSet] = useState<any>({});
  const [categories, categoriesSet] = useState<any>({});
  useEffect(() => {
    firebase
      .database()
      .ref('categories')
      .once('value')
      .then((snapshot) => {
        const values = snapshot.val();
        isLoadingSet(false);
        categoriesSet(values || {});
      });
  }, []);

  const [avatars, avatarsSet] = useState<any>({});
  useEffect(() => {
    if (!categories) return;

    Object.values(categories).forEach((trainersList) => {
      Object.values(trainersList as any).forEach((trainer) => {
        const trainerId = (trainer as any).uid;
        const avatarRef = firebase.storage().ref(`users/${trainerId}.png`);
        avatarRef.getDownloadURL().then((url) => {
          avatarsSet({ ...avatars, [trainerId]: url });
        });
      });
    });
  }, [categories]);

  const categoriesList = Object.keys(categories);
  return (
    <SafeAreaView>
      <StatusBar style="dark" />
      <ScrollView>
        <View style={{ flex: 1, paddingHorizontal: 15 }}>
          <Header title="Тренеры" hasBackAction />

          {isLoading ? (
            <Text>...</Text>
          ) : categoriesList.length > 0 ? (
            categoriesList.map((cat) => {
              return (
                <View key={cat}>
                  <Text use="h2">{cat}</Text>
                  {((Object.values(categories[cat]) as any) || []).map((user: { name: string; uid: string }) => (
                    <ScrollView key={user.uid} style={{ paddingVertical: 10 }} horizontal>
                      <CardLarge
                        image={avatars[user.uid]}
                        onPress={() => navigation.push('TrainerScreen', { uid: user.uid } as any)}
                        style={{ marginRight: 15 }}
                        title={user.name}
                      />
                    </ScrollView>
                  ))}
                </View>
              );
            })
          ) : (
            <Text>Не найдено тренеров</Text>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
