import React from 'react';
import { Theme } from '@emotion/react';

export interface StyledProps<T = HTMLElement> {
  ref?: React.Ref<T>;
  as?: React.ElementType;
  theme?: Theme;
}
