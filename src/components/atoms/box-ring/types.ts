import React from 'react';
import { StyledProps } from '../../../types/styled';
import { StyleFunctionProps } from '../../../utils/with-sx-prop/types';

export type BoxRingSizes = 'xs' | 'lg';

export interface BoxRingOptions {
  radii?: number | string;
  transitionMs?: number;
  borderColor?: null | string;
}

export interface BoxRingProps
  extends BoxRingOptions,
    StyledProps<HTMLSpanElement>,
    StyleFunctionProps<StyledProps['theme']>,
    React.HTMLAttributes<HTMLSpanElement> {
  size: BoxRingSizes;
}
