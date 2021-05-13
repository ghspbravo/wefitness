import { StackScreenProps } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import CardLarge from '../../components/CardLarge';
import Header from '../../components/Header';
import { Text } from '../../components/Typo';
import { SafeAreaView, ScrollView, View } from '../../components/View';
import { ProfileTabParamList } from '../../types';

export default function TrainersScreen({ navigation }: StackScreenProps<ProfileTabParamList, 'TrainersScreen'>) {
  return (
    <SafeAreaView>
      <StatusBar style="dark" />
      <ScrollView>
        <View style={{ flex: 1, paddingHorizontal: 15 }}>
          <Header title="Тренеры" hasBackAction />

          <Text use="h2">Силовые</Text>
          <ScrollView style={{ paddingVertical: 10 }} horizontal>
            <CardLarge
              onPress={() => navigation.push('TrainerScreen')}
              style={{ marginRight: 15 }}
              title="Петров Антон"
            />
            <CardLarge
              onPress={() => navigation.push('TrainerScreen')}
              style={{ marginRight: 15 }}
              title="Косыгина Ольга Паловна"
            />
            <CardLarge
              onPress={() => navigation.push('TrainerScreen')}
              style={{ marginRight: 15 }}
              title="Петров Антон"
            />
            <CardLarge
              onPress={() => navigation.push('TrainerScreen')}
              style={{ marginRight: 15 }}
              title="Косыгина Ольга"
            />
          </ScrollView>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
