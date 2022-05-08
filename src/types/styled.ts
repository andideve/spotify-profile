import React from 'react';
import { Theme } from '../theme';

export interface StyledProps<T = HTMLElement> {
  ref?: React.Ref<T>;
  as?: React.ElementType;
  theme?: Theme;
}
