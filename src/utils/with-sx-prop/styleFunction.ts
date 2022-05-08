import { Theme } from '@emotion/react';
import { CSSInterpolation } from '@emotion/serialize';
import { StyleFunctionProps } from './types';

const styleFunction = <T = Theme>({ theme, sx }: StyleFunctionProps<T>): CSSInterpolation => {
  if (typeof sx === 'function') return sx({ theme });
  return sx;
};

export { styleFunction };
export default styleFunction;
