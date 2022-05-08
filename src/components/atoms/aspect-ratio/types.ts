import React from 'react';
import { StyledProps } from '../../../types/styled';
import { StyleFunctionProps } from '../../../utils/with-sx-prop/types';

export interface AspectRatioOptions {
  ratio?: number;
}

export type AspectRatioProps = AspectRatioOptions &
  StyledProps<HTMLDivElement> &
  StyleFunctionProps<StyledProps['theme']> &
  React.HTMLAttributes<HTMLDivElement>;
