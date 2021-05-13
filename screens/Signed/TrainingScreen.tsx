import { StackScreenProps } from '@react-navigation/stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import Header from '../../components/Header';
import Spacer from '../../components/Spacer';
import { ScrollView, View } from '../../components/View';
import Colors from '../../constants/Colors';
import { ProfileTabParamList } from '../../types';
import { Text } from '../../components/Typo';
import LeadView from '../../components/LeadView';
import Button from '../../components/Button';

export default function TrainingScreen({ navigation }: StackScreenProps<ProfileTabParamList, 'TrainingScreen'>) {
  const insets = useSafeAreaInsets();
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
        <Header title="Бокс" isAcsent hasBackAction right={<Button use='outline' style={{ padding: 6 }} caption='Записаться' />} />
      </View>
      <Spacer height={15} />

      <View style={{ paddingHorizontal: 15 }}>
        <Text use="h2">Описание</Text>
        <Spacer height={15} />

        <LeadView>
          <Text>
            Раньше единоборства считались одним из способов определить сильнейшего. На дворе XXI век, человечество
            развивается, и сейчас единоборства являются полноправными представителями мира спорта.
          </Text>
        </LeadView>

        <Spacer />
        <Text>Вас будет тренировать:</Text>
        <Spacer />
        <Text use="h6">Константин Борисович Дзю</Text>

        <Spacer height={30} />
        <Text use="h2">Инвентарь</Text>
        <Spacer height={15} />
        <Text>Скакалка, 2 гантели 0,5кг</Text>
      </View>
    </ScrollView>
  );
}
