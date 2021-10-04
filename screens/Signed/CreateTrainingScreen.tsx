import firebase from 'firebase/app';
import React, { Ref, useContext, useRef, useState } from 'react';
import { Keyboard, KeyboardAvoidingView, Platform, TextInput, TouchableWithoutFeedback } from 'react-native';
import moment from 'moment';
import Button from '../../components/Button';
import Header from '../../components/Header';
import Input from '../../components/Input';
import Spacer from '../../components/Spacer';
import { Text } from '../../components/Typo';
import { SafeAreaView, ScrollView, View } from '../../components/View';
import Colors from '../../constants/Colors';
import { errorResponse } from '../../types';
import { UserContext } from '../../context';
import DateTimePicker, { Event } from '@react-native-community/datetimepicker';
import { getShortDate, getTime } from '../../helpers';

export default function CreateTrainingScreen() {
  const [user] = useContext(UserContext);

  const [isLoading, setLoading] = useState(false);

  const descriptionInput: Ref<TextInput> = useRef(null);
  const inventoryInput: Ref<TextInput> = useRef(null);
  const durationInput: Ref<TextInput> = useRef(null);
  const linkInput: Ref<TextInput> = useRef(null);

  const [title, titleSet] = useState('');
  const [description, descriptionSet] = useState('');
  const [inventory, inventorySet] = useState('');
  const [link, linkSet] = useState('');
  const [duration, durationSet] = useState('');
  const [error, errorSet] = useState('');

  const [date, dateSet] = useState(new Date());
  const onDateChange = (event: Event, selectedDate?: Date) => {
    const currentDate = selectedDate || date;
    dateSet(currentDate);
  };
  const [time, timeSet] = useState(new Date());
  const onTimeChange = (event: Event, selectedDate?: Date) => {
    const currentDate = selectedDate || date;
    timeSet(currentDate);
  };

  const onSubmitHandler = async () => {
    if (!title || !description || !inventory || !duration) {
      return errorSet('Заполните все поля!');
    }
    errorSet('');
    setLoading(true);

    try {
      const momentDate = moment(date);
      const momentTime = moment(time);
      momentDate.set({
        hour: momentTime.get('hour'),
        minutes: momentTime.get('minute')
      });
      const timestamp = momentDate.valueOf();
      const month = moment(momentDate).month() + 1;
      const day = moment(momentDate).date();

      const durationNumber = parseInt(duration);

      const payload = {
        date: timestamp,
        description: description,
        duration: durationNumber,
        inventory: inventory,
        title: title,
        trainerId: user.id,
        trainerName: user.name
      };

      let trainingId;
      await firebase
        .database()
        .ref('trainings')
        .push(payload)
        .then((snap) => {
          trainingId = snap.key;
        })
        .catch((err: errorResponse) => {
          throw err.message;
        });

      const payloadShort = {
        date: timestamp,
        duration: durationNumber,
        id: trainingId,
        title: title
      };

      await firebase
        .database()
        .ref(`calendar/${month}/${day}`)
        .push(payloadShort)
        .catch((err: errorResponse) => {
          throw err.message;
        });

      await firebase
        .database()
        .ref(`userTrainings/${user.id}`)
        .push(payloadShort)
        .catch((err: errorResponse) => {
          throw err.message;
        });

      onSuccess();
    } catch (e) {
      errorSet(e as string || 'Неверный формат данных');
    } finally {
      setLoading(false);
    }
  };

  const onSuccess = () => {
    titleSet('');
    descriptionSet('');
    inventorySet('');
    linkSet('');
    durationSet('');
    dateSet(new Date());
    timeSet(new Date());

    alert('Создано');
  };
  return (
    <SafeAreaView>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollView style={{ flex: 1 }}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={{ flex: 1, paddingHorizontal: 15 }}>
              <Header title="Новая тренировка" />

              <View style={{ flex: 1, justifyContent: 'center' }}>
                <DateTimePicker
                  style={{ height: 100, width: '100%' }}
                  display="spinner"
                  value={date}
                  mode="date"
                  onChange={onDateChange}
                  minimumDate={new Date()}
                />
                <DateTimePicker
                  style={{ height: 100, width: '100%' }}
                  display="spinner"
                  value={time}
                  mode="time"
                  onChange={onTimeChange}
                />

                <Input
                  onSubmitEditing={() => descriptionInput.current?.focus()}
                  value={title}
                  onChangeText={titleSet}
                  returnKeyType="next"
                  placeholder="Название"
                />
                <Spacer height={20} />
                <Input
                  ref={descriptionInput}
                  onSubmitEditing={() => inventoryInput.current?.focus()}
                  value={description}
                  onChangeText={descriptionSet}
                  returnKeyType="next"
                  placeholder="Описание"
                />
                <Spacer height={20} />
                <Input
                  ref={inventoryInput}
                  onSubmitEditing={() => durationInput.current?.focus()}
                  value={inventory}
                  onChangeText={inventorySet}
                  returnKeyType="next"
                  placeholder="Инвентарь"
                />
                <Spacer height={20} />
                <Input
                  ref={durationInput}
                  onSubmitEditing={onSubmitHandler}
                  // onSubmitEditing={() => linkInput.current?.focus()}
                  value={duration}
                  onChangeText={durationSet}
                  returnKeyType="done"
                  placeholder="Длительность (в мин.)"
                />
                {/* <Spacer height={20} />
                <Input
                  ref={linkInput}
                  onSubmitEditing={onSubmitHandler}
                  value={link}
                  onChangeText={linkSet}
                  returnKeyType="done"
                  placeholder="Ссылка на занятие"
                /> */}

                <Spacer />
                {!!error && <Text color={Colors.danger}>{error}</Text>}
              </View>

              <Spacer height={30} />
              <Button disabled={isLoading} onPress={onSubmitHandler} caption={isLoading ? '...' : 'Создать'} />
            </View>
          </TouchableWithoutFeedback>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
