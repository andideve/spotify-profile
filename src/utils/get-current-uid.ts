import { LOCAL_UID_KEY } from '../config/globals';
import { UserID } from '../types/spotify';

export default function getCurrentUid(): UserID | null {
  return window.localStorage.getItem(LOCAL_UID_KEY);
}
