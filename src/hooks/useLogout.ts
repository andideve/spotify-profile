import { useRouter } from 'next/router';
import { useCallback } from 'react';

import API from '../services/api';
import { SITE_PATHS } from '../config/globals';

const useLogout = () => {
  const router = useRouter();

  const handler = useCallback(async () => {
    await API.logout();
    router.push(SITE_PATHS.LOGIN_DASHBOARD);
  }, []);

  return handler;
};

export default useLogout;
