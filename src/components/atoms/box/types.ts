import React from 'react';
import { StyledProps } from '../../../types/styled';
import { StyleFunctionProps } from '../../../utils/with-sx-prop/types';

export type BoxProps = React.HTMLAttributes<HTMLDivElement> &
  StyledProps<HTMLDivElement> &
  StyleFunctionProps<StyledProps['theme']>;
