import { createContext } from 'react';
import { UserCtxState, UserCtxValue } from './types';

export const userInitialState: UserCtxState = {
  uid: '',
  name: '',
  images: [],
  initialized: false,
  isLogin: false,
};

export const UserCtx = createContext<UserCtxValue>({ state: userInitialState });

export * from './useUserCtx';
export * from './types';
