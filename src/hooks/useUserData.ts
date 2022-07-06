import { useMemo, useContext } from 'react';
import { UserCtx } from '../context/user';
import { User } from '../types/user';

const useUserData = () => {
  const {
    state: { uid, name, images },
  } = useContext(UserCtx);
  return useMemo((): User => ({ uid, name, images }), [uid, name, images]);
};

export default useUserData;
