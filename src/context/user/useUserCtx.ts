import { useMemo, useState } from 'react';
import { userInitialState } from '.';
import { UserCtxValue, UserCtxState } from './types';

function useUserCtx() {
  const [state, setState] = useState<UserCtxState>(userInitialState);
  const ctxValue = useMemo((): UserCtxValue => ({ state, dispatch: setState }), [state]);

  return { ctxValue, state, dispatch: setState } as const;
}

export { useUserCtx };
export default useUserCtx;
