import { User } from '../types/user';

const key = 'auth-storage';

export const authStorage = {
  get(): User | undefined {
    const data = window.localStorage.getItem(key);
    return data ? JSON.parse(data) : undefined;
  },
  set(data: User) {
    window.localStorage.setItem(key, JSON.stringify(data));
  },
  clear() {
    window.localStorage.removeItem(key);
  },
};
