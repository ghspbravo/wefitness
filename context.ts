import React from 'react';
import { UserModelParamList } from './types';

const initialUser: UserModelParamList = {
  isLoggedIn: false
};

export const UserContext = React.createContext<[UserModelParamList, (arg0: UserModelParamList) => void]>([initialUser, () => {}]);
