import { StackScreenProps } from '@react-navigation/stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import Header from '../../components/Header';
import Image from '../../components/Image';
import Spacer from '../../components/Spacer';
import { ScrollView, View } from '../../components/View';
import Colors from '../../constants/Colors';
import { ProfileTabParamList } from '../../types';
import { Text } from '../../components/Typo';
import TrainingDateItem from '../../components/TrainingDateItem';

export default function TrainerScreen({ navigation }: StackScreenProps<ProfileTabParamList, 'TrainerScreen'>) {
  const insets = useSafeAreaInsets();
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
          hasBackAction
        />
        <View style={{ alignItems: 'center' }}>
          <Image style={{ marginTop: 15 }} use="rounded" width={160} height={160} />
        </View>
      </View>
      <Spacer height={45} />

      <View style={{ paddingHorizontal: 15 }}>
        <View style={{ alignItems: 'center' }}>
          <Text use="h1">Виктория Робинсон</Text>
          <Spacer />
          <Text use="h6">Москва</Text>
          <Spacer height={30} />
        </View>

        <View>
          <TrainingDateItem
            onPress={() => navigation.push('TrainingScreen')}
            isActive={true}
            title="Стречинг"
            date="29.09"
            withLine
          />
          <TrainingDateItem isActive={false} title="Стречинг" date="29.09" withLine />
        </View>
      </View>
    </ScrollView>
  );
}
