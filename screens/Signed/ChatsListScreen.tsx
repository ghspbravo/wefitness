import { StackScreenProps } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import CardSmall from '../../components/CardSmall';
import Header from '../../components/Header';
import { SafeAreaView, ScrollView, View } from '../../components/View';
import { ChatsTabParamList } from '../../types';

export default function ChatsListScreen({ navigation }: StackScreenProps<ChatsTabParamList, 'ChatsListScreen'>) {
  return (
    <SafeAreaView>
      <StatusBar style="dark" />
      <ScrollView>
        <View style={{ flex: 1, paddingHorizontal: 15 }}>
          <Header title="Чат" />

          <CardSmall
            onPress={() => navigation.push('ChatScreen')}
            withLine
            title="Антон - силовая"
            text="Отлично позанимались, советую поесть белковую пищу в течении часа"
          />
          <CardSmall
            onPress={() => navigation.push('ChatScreen')}
            withLine
            title="Антон - силовая"
            text="Отлично позанимались, советую поесть белковую пищу в течении часа"
          />
          <CardSmall
            onPress={() => navigation.push('ChatScreen')}
            withLine
            title="Антон - силовая"
            text="Отлично позанимались, советую поесть белковую пищу в течении часа"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
