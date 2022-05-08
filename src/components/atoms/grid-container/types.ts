import React from 'react';
import { StyledProps } from '../../../types/styled';
import { StyleFunctionProps } from '../../../utils/with-sx-prop/types';

export type GridContainerProps = StyledProps<HTMLDivElement> &
  StyleFunctionProps<StyledProps['theme']> &
  React.HTMLAttributes<HTMLDivElement>;
