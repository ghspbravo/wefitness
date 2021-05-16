import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import { useContext, useEffect } from 'react';
import { UserContext } from './context';
import { UserModelParamList } from './types';

const config = {
  apiKey: 'AIzaSyCYikxC6p8hVE19foUTzX4JDnOo3cN5Ss8',
  authDomain: 'wefitness-43065.firebaseapp.com',
  databaseURL: 'https://wefitness-43065-default-rtdb.firebaseio.com',
  projectId: 'wefitness-43065',
  storageBucket: 'wefitness-43065.appspot.com',
  messagingSenderId: '249426634742',
  appId: '1:249426634742:web:ebbf12f38ef69908fbc9d7'
};

export function setFirebaseBindings() {
  if (!firebase.apps.length) {
    console.info('init new firebase');
    firebase.initializeApp(config);
  }

  const [_, setUser] = useContext(UserContext);
  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        var uid = user.uid;
        const userLoggedInfo = { isLoggedIn: true, id: uid };
        setUser(userLoggedInfo);

        firebase
          .database()
          .ref('users/' + uid)
          .once('value')
          .then((snapshot) => {
            const values = snapshot.val() as UserModelParamList | null;
            if (values) {
              setUser({ ...userLoggedInfo, ...values });
            }
          });
      } else {
        setUser({ isLoggedIn: false });
      }
    });
  }, []);
}
