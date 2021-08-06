import firebase from 'firebase/app';
import moment from 'moment';
import { StackScreenProps } from '@react-navigation/stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Button from '../../components/Button';
import Header from '../../components/Header';
import Spacer from '../../components/Spacer';
import { ScrollView, View } from '../../components/View';
import Colors from '../../constants/Colors';
import { ProfileTabParamList } from '../../types';
import { Text } from '../../components/Typo';
import { getTime } from '../../helpers';
import TrainingTimeItem from '../../components/TrainingTimeItem';

export default function CalendarScreen({ navigation }: StackScreenProps<ProfileTabParamList, 'ProfileScreen'>) {
  const insets = useSafeAreaInsets();
  const today = moment(new Date());

  let year = new Date().getFullYear();
  const [month, monthSet] = useState(today.month() + 1);
  const [monthLabel, monthLabelSet] = useState(today.format('MMMM'));
  const [selectedDay, selectedDaySet] = useState(today.date());

  const daysInMonth = moment()
    .set({ month: month - 1 })
    .daysInMonth();
  const offsetDaysCount = moment(new Date(year, month - 1)).isoWeekday() || 1;

  const [isLoading, isLoadingSet] = useState(true);
  const [trainings, trainingsSet] = useState<{ id: string; title: string; date: number; duration: number }[]>([]);
  const loadTrainings = (day?: number, _month?: number) => {
    isLoadingSet(true);
    firebase
      .database()
      .ref(`calendar/${_month || month}/${day || selectedDay}`)
      .once('value', (snapshot) => {
        const value = snapshot.val();
        trainingsSet(Object.values(value || {}));
      })
      .finally(() => {
        isLoadingSet(false);
      });
  };
  const onDayPress = ({ day, realDay, month }: { day: number; realDay?: number; month?: number }) => {
    selectedDaySet(day);
    loadTrainings(realDay || day, month);
  };

  useEffect(() => {
    loadTrainings();
  }, []);
  return (
    <ScrollView>
      <StatusBar style="light" />
      <View
        style={{
          paddingTop: insets.top,
          paddingHorizontal: 15,
          backgroundColor: Colors.acsent
        }}>
        <Header title={monthLabel} isAcsent />

        <View style={{ flexDirection: 'row' }}>
          <Text style={styles.weekItem} color={Colors.white}>
            ПН
          </Text>
          <Text style={styles.weekItem} color={Colors.white}>
            ВТ
          </Text>
          <Text style={styles.weekItem} color={Colors.white}>
            СР
          </Text>
          <Text style={styles.weekItem} color={Colors.white}>
            ЧТ
          </Text>
          <Text style={styles.weekItem} color={Colors.white}>
            ПТ
          </Text>
          <Text style={styles.weekItem} color={Colors.white}>
            СБ
          </Text>
          <Text style={styles.weekItem} color={Colors.white}>
            ВС
          </Text>
        </View>
        <Spacer />
      </View>
      <Spacer height={45} />

      <View style={{ paddingHorizontal: 15 }}>
        <View style={{ alignItems: 'center', flexDirection: 'row', flexWrap: 'wrap' }}>
          {[...Array(offsetDaysCount - 1).keys()].map((day) => (
            <View style={styles.dayItemView} key={day}></View>
          ))}
          {[...Array(daysInMonth).keys()].map((day) => (
            <View key={day} style={[styles.dayItemView, selectedDay === day + 1 ? styles.activeDayItemView : {}]}>
              <Button
                use="link"
                onPress={() => onDayPress({ day: day + 1 })}
                style={[styles.dayItem, selectedDay === day + 1 ? styles.activeDayItem : {}]}
                key={day}
                caption={(day + 1).toString()}
              />
            </View>
          ))}
          {[...Array(6).keys()].map((day) => {
            const daysByWeek = (daysInMonth + offsetDaysCount + day - 1) / 7;
            const minDaysByWeek = (daysInMonth + offsetDaysCount) / 7;
            return Math.trunc(daysByWeek) - Math.trunc(minDaysByWeek) < 1 ? (
              <View
                key={day}
                style={[styles.dayItemView, selectedDay === daysInMonth + day + 1 ? styles.activeDayItemView : {}]}>
                <Button
                  use="link"
                  onPress={() => onDayPress({ day: daysInMonth + day + 1, realDay: day + 1, month: month + 1 })}
                  style={[
                    styles.dayItem,
                    { color: Colors.muted },
                    selectedDay === daysInMonth + day + 1 ? styles.activeDayItem : {}
                  ]}
                  key={day}
                  caption={(day + 1).toString()}
                />
              </View>
            ) : null;
          })}
        </View>

        <Spacer />

        {isLoading ? (
          <Text>...</Text>
        ) : trainings.length > 0 ? (
          trainings.map((training) => (
            <TrainingTimeItem
              key={training.id}
              withLine
              onPress={() => navigation.push('TrainingScreen', { id: training.id } as any)}
              title={training.title}
              time={getTime(training.date)}
              duration={training.duration}
            />
          ))
        ) : (
          <Text>На данный день тренировок не запланированно</Text>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  weekItem: {
    marginHorizontal: 17
  },
  dayItemView: {
    height: 27,
    width: 27,
    alignItems: 'center',
    justifyContent: 'center',

    borderRadius: 50,

    marginVertical: 15,
    marginHorizontal: 13
  },
  dayItem: {
    color: Colors.black,
    fontSize: 14
  },
  activeDayItemView: {
    backgroundColor: Colors.acsent
  },
  activeDayItem: {
    color: Colors.white
  }
});
