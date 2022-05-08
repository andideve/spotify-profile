import React from 'react';
import { Theme } from '../../../theme';
import { StyledProps } from '../../../types/styled';
import { StyleFunctionProps } from '../../../utils/with-sx-prop/types';

export type ContainerSizes = keyof Theme['breakpoints'];

export interface ContainerOptions {
  maxWidth?: ContainerSizes;
}

export type ContainerProps = ContainerOptions &
  StyledProps<HTMLDivElement> &
  StyleFunctionProps<StyledProps['theme']> &
  React.HTMLAttributes<HTMLDivElement>;
