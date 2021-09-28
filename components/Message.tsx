import React from 'react';
import { StyleSheet } from 'react-native';
import Colors from '../constants/Colors';
import { FormatedTextView } from './FormattedText';
import { Text } from './Typo';
import { View } from './View';

interface Props {
  children: React.ReactElement | string;
  isSent?: boolean;
}

const Message = ({ children, isSent }: Props) => {
  const styles = StyleSheet.create({
    messageRow: {
      flex: 1
    },
    message: {
      padding: 15,
      borderRadius: 15,
      width: 235
    },
    messageReceived: {
      backgroundColor: Colors.bgLight
    },
    messageSent: {
      marginLeft: 'auto',
      backgroundColor: Colors.acsent
    }
  });
  return (
    <View style={styles.messageRow}>
      <View style={[styles.message, isSent ? styles.messageSent : styles.messageReceived]}>
        <Text color={isSent ? Colors.white : Colors.black}>
          <FormatedTextView body={children} isDarkMode={isSent} />
        </Text>
      </View>
    </View>
  );
};

export default Message;
