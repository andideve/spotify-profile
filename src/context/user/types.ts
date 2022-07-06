import { Dispatch, SetStateAction } from 'react';
import { User } from '../../types/user';

export interface UserCtxState extends User {
  initialized: boolean;
  isLogin: boolean;
}

export interface UserCtxValue {
  state: UserCtxState;
  dispatch?: Dispatch<SetStateAction<UserCtxState>>;
}
