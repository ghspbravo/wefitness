// all components proto can be found: https://www.figma.com/file/Ip7379JBNbX13XQ3woBawL/We-fitness-(Copy)?node-id=463%3A2

import React from 'react';
import { StyleSheet } from 'react-native';
import Button from '../components/Button';
import CardSmall from '../components/CardSmall';
import CardLarge from '../components/CardLarge';
import Image from '../components/Image';
import Input from '../components/Input';
import Spacer from '../components/Spacer';
import Tabs from '../components/Tabs';
import { Text } from '../components/Typo';
import { View, SafeAreaView, ScrollView } from '../components/View';
import Colors from '../constants/Colors';
import TrainingDateItem from '../components/TrainingDateItem';
import TrainingTimeItem from '../components/TrainingTimeItem';
import LeadView from '../components/LeadView';
import Message from '../components/Message';

export default function _ComponentsScreen() {
  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.container}>
          <Text use="h1" style={styles.alignCenter}>
            All app components
          </Text>

          <Spacer height={20} />
          <Text use="h2">Controls</Text>
          <Spacer />

          <Button caption="Primary" />
          <Spacer />
          <Button use="outline" caption="Outline" />
          <Spacer />
          <Button use="link" caption="Link button" />
          <Spacer />
          <Input placeholder="Input" />

          <Spacer height={20} />
          <Text use="h2">Images</Text>
          <Spacer />

          <Text>Rounded</Text>
          <View style={{ backgroundColor: Colors.acsent, flex: 1, alignItems: 'center', padding: 10 }}>
            <Image
              use="rounded"
              src="https://i.picsum.photos/id/1005/800/600.jpg?hmac=Ry_Kv4AZ0FcPt5JeY8yW3zZn54QV8sk9HTPIp_3tgF0"
            />
          </View>

          <Spacer />
          <Text>Square</Text>
          <View style={{ flex: 1, flexDirection: 'row' }}>
            <Image src="https://i.picsum.photos/id/1005/800/600.jpg?hmac=Ry_Kv4AZ0FcPt5JeY8yW3zZn54QV8sk9HTPIp_3tgF0" />
            <Image />
          </View>

          <Spacer height={20} />
          <Text use="h2">Complex</Text>
          <Spacer />

          <Tabs
            tab1="Данные"
            tab2="Тренировки"
            tab1Content={
              <View>
                <Text>Tab 1</Text>
              </View>
            }
            tab2Content={
              <View>
                <Text>Tab 2</Text>
              </View>
            }
          />

          <Spacer />
          <CardSmall withLine title="Мои показатели" text="Отслеживайте свой прогресс" />
          <Spacer />
          <CardLarge title="Соколов Михаил" />

          <Spacer />
          <TrainingDateItem withLine title="Стречинг" date="22.09" />
          <TrainingDateItem isActive title="Стречинг" date="22.09" />

          <Spacer />
          <TrainingTimeItem withLine title="Стречинг" time="14-00" duration="30min" />
          <TrainingTimeItem title="Силовая тренировка" time="14-00" duration="60min" />

          <Spacer />
          <LeadView>
            <Text>
              Раньше единоборства считались одним из способов определить сильнейшего. На дворе XXI век, человечество
              развивается, и сейчас единоборства являются полноправными представителями мира спорта.
            </Text>
          </LeadView>

          <Spacer />
          <Message>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec fringilla quam eu faci lisis mollis.
          </Message>
          <Spacer />
          <Message isSent>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Message>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20
  },
  alignCenter: {
    textAlign: 'center'
  }
});
