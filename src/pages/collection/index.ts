import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { COLLECTION_TOP_NAVS } from '../../config/globals';

const Collection: NextPage = () => {
  const router = useRouter();

  useEffect(() => {
    router.replace(COLLECTION_TOP_NAVS[0].to, undefined, { shallow: true });
  }, []);

  return null;
};

export default Collection;
