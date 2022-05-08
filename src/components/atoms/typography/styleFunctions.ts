import { CSSInterpolation, CSSObject, FunctionInterpolation } from '@emotion/serialize';

import defaults from './defaults';
import { styleFunction } from '../../../utils/with-sx-prop';
import mergeObj from '../../../utils/merge-obj';
import media from '../../../utils/media';
import { BaseTextProps, TextSizes } from './types';

const getSize = ({ theme, size = defaults.size, lineHeight }: BaseTextProps): CSSObject => {
  const sizes: Record<TextSizes, CSSObject> = {
    xs: {
      fontSize: theme?.fontSizes.xs,
      lineHeight: theme?.lineHeights.xs,
    },
    sm: {
      fontSize: theme?.fontSizes.sm,
      lineHeight: theme?.lineHeights.sm,
    },
    base: {
      fontSize: theme?.fontSizes.base,
      lineHeight: theme?.lineHeights.base,
    },
    lg: {
      fontSize: theme?.fontSizes.base,
      lineHeight: theme?.lineHeights.base,
      [media('lg')]: {
        fontSize: theme?.fontSizes.lg,
        lineHeight: theme?.lineHeights.lg,
      },
    },
    xl: {
      fontSize: theme?.fontSizes.lg,
      lineHeight: theme?.lineHeights.lg,
      [media('lg')]: {
        fontSize: theme?.fontSizes.xl,
        lineHeight: theme?.lineHeights.xl,
      },
    },
    '2xl': {
      fontSize: theme?.fontSizes.xl,
      lineHeight: theme?.lineHeights.xl,
      [media('lg')]: {
        fontSize: theme?.fontSizes['2xl'],
        lineHeight: theme?.lineHeights['2xl'],
      },
    },
    '3xl': {
      fontSize: theme?.fontSizes['2xl'],
      lineHeight: theme?.lineHeights['2xl'],
      [media('lg')]: {
        fontSize: theme?.fontSizes['3xl'],
        lineHeight: theme?.lineHeights['3xl'],
      },
    },
    '4xl': {
      fontSize: theme?.fontSizes['3xl'],
      lineHeight: theme?.lineHeights['3xl'],
      [media('lg')]: {
        fontSize: theme?.fontSizes['4xl'],
        lineHeight: theme?.lineHeights['4xl'],
      },
    },
    '5xl': {
      fontSize: theme?.fontSizes['4xl'],
      lineHeight: theme?.lineHeights['4xl'],
      [media('lg')]: {
        fontSize: theme?.fontSizes['5xl'],
        lineHeight: theme?.lineHeights['5xl'],
      },
    },
    '6xl': {
      fontSize: theme?.fontSizes['5xl'],
      lineHeight: theme?.lineHeights['5xl'],
      [media('lg')]: {
        fontSize: theme?.fontSizes['6xl'],
        lineHeight: theme?.lineHeights['6xl'],
      },
    },
    '7xl': {
      fontSize: theme?.fontSizes['6xl'],
      lineHeight: theme?.lineHeights['6xl'],
      [media('lg')]: {
        fontSize: theme?.fontSizes['7xl'],
        lineHeight: theme?.lineHeights['7xl'],
      },
    },
    '8xl': {
      fontSize: theme?.fontSizes['7xl'],
      lineHeight: theme?.lineHeights['7xl'],
      [media('lg')]: {
        fontSize: theme?.fontSizes['8xl'],
        lineHeight: theme?.lineHeights['8xl'],
      },
    },
    '9xl': {
      fontSize: theme?.fontSizes['8xl'],
      lineHeight: theme?.lineHeights['8xl'],
      [media('lg')]: {
        fontSize: theme?.fontSizes['9xl'],
        lineHeight: theme?.lineHeights['9xl'],
      },
    },
  };

  let result = sizes[size];

  if (lineHeight) {
    result = mergeObj<CSSObject>(result, {
      lineHeight: theme?.lineHeights[lineHeight],
      [media('lg')]: { lineHeight: theme?.lineHeights[lineHeight] },
    });
  }

  return result;
};

export const styleFunctions: (CSSInterpolation | FunctionInterpolation<BaseTextProps>)[] = [
  getSize,
  styleFunction,
];

export default styleFunctions;
