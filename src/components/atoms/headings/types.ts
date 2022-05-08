import React from 'react';
import { Theme } from '../../../theme';
import { StyledProps } from '../../../types/styled';
import { StyleFunctionProps } from '../../../utils/with-sx-prop/types';

export type HeadingSizes = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

export type HeadingLineHeights = Extract<
  keyof Theme['lineHeights'],
  | 'xs'
  | 'sm'
  | 'base'
  | 'lg'
  | 'xl'
  | '2xl'
  | '3xl'
  | '4xl'
  | '5xl'
  | 'none'
  | 'tight'
  | 'snug'
  | 'normal'
  | 'relaxed'
>;

export interface HeadingOptions {
  size?: HeadingSizes;
  lineHeight?: HeadingLineHeights | null;
}

export type BaseHeadingProps = HeadingOptions & StyleFunctionProps<StyledProps['theme']>;

export type HeadingProps = BaseHeadingProps &
  StyledProps<HTMLHeadingElement> &
  React.HTMLAttributes<HTMLHeadingElement>;
