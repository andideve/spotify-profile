import React from 'react';

export type CtxChildrenProps<CtxValue, P = Record<string, unknown>> = P & {
  value: CtxValue;
};

export type CtxChildren<CtxValue, P> = React.FC<CtxChildrenProps<CtxValue, P>>;
