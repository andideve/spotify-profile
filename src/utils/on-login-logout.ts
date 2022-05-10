import { LOCAL_UID_KEY } from '../config/globals';
import { UserID } from '../types/spotify';

export const afterLogin = ({ uid }: { uid: UserID }) => {
  window.localStorage.setItem(LOCAL_UID_KEY, uid);
};

export const beforeLogout = () => {
  window.localStorage.removeItem(LOCAL_UID_KEY);
};
