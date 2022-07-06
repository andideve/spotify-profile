import React from 'react';
import { CtxChildren } from './types';

function withCtx<Ctx = unknown, P = Record<string, unknown>>(
  Consumer: React.Consumer<Ctx>,
  Component: CtxChildren<Ctx, P>,
) {
  return (props: P) => <Consumer>{(val) => <Component value={val} {...props} />}</Consumer>;
}

export { withCtx };
export * from './types';
export default withCtx;
