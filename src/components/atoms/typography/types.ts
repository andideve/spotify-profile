import React from 'react';
import { Theme } from '../../../theme';
import { StyledProps } from '../../../types/styled';
import { StyleFunctionProps } from '../../../utils/with-sx-prop/types';

export type TextSizes = keyof Theme['fontSizes'];

export type TextLineHeights = keyof Theme['lineHeights'];

export interface TextOptions {
  size?: TextSizes;
  lineHeight?: TextLineHeights | null;
}

export type BaseTextProps = TextOptions & StyleFunctionProps<StyledProps['theme']>;

export type TextProps = BaseTextProps &
  StyledProps<HTMLSpanElement> &
  React.HTMLAttributes<HTMLSpanElement>;

export type ParagraphProps = BaseTextProps &
  StyledProps<HTMLParagraphElement> &
  React.HTMLAttributes<HTMLParagraphElement>;
