import { Theme } from '@emotion/react';
import { CSSInterpolation } from '@emotion/serialize';

export type GetStyleFn<T = Theme> = ({ theme }: { theme?: T }) => CSSInterpolation;

export interface StyleFunctionProps<T = Theme> {
  theme?: T;
  sx?: CSSInterpolation | GetStyleFn<T>;
}
