import moment from 'moment';
import Constants from 'expo-constants';

export const isTrainerApp = Constants.manifest.name === 'wefitness-trainer';

export function getShortName(name?: string) {
  if (!name) {
    return '';
  }

  const nameParts = name.split(' ');
  return `${nameParts[0]} ${nameParts[1] ? nameParts[1] : ''}`;
}

export function getShortDate(timestamp: number | string) {
  return moment(timestamp).format('DD.MM');
}

export function getTime(timestamp: number | string) {
  return moment(timestamp).format('HH-mm');
}

export function isActiveDate(timestamp: number, duration: number = 0) {
  const date = moment(timestamp);
  return date.add(duration, 'm').valueOf() > moment().valueOf();
}

export function getChatroomId(userId1: string, userId2: string) {
  var sum1 = 0;
  for (var i = 0; i < userId1.length; i++) {
    sum1 += userId1.charCodeAt(i);
  }
  var sum2 = 0;
  for (var i = 0; i < userId2.length; i++) {
    sum2 += userId2.charCodeAt(i);
  }

  return sum1 + sum2;
}
