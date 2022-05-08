import styled from '@emotion/styled';
import { CSSObject } from '@emotion/serialize';

import defaults from './defaults';
import { styleFunction } from '../../../utils/with-sx-prop';
import mergeObj from '../../../utils/merge-obj';
import media from '../../../utils/media';
import { HeadingProps, BaseHeadingProps, HeadingSizes } from './types';

const baseStyles = 'font-weight: 500;';

const getSize = ({ theme, size = defaults.size, lineHeight }: BaseHeadingProps): CSSObject => {
  const sizes: Record<HeadingSizes, CSSObject> = {
    h1: {
      fontSize: theme?.fontSizes['4xl'],
      lineHeight: theme?.lineHeights.tight,
      [media('lg')]: {
        fontSize: theme?.fontSizes['5xl'],
        lineHeight: theme?.lineHeights.tight,
      },
    },
    h2: {
      fontSize: theme?.fontSizes['3xl'],
      lineHeight: theme?.lineHeights.tight,
      [media('lg')]: {
        fontSize: theme?.fontSizes['4xl'],
        lineHeight: theme?.lineHeights.tight,
      },
    },
    h3: {
      fontSize: theme?.fontSizes['2xl'],
      lineHeight: theme?.lineHeights['2xl'],
      [media('lg')]: {
        fontSize: theme?.fontSizes['3xl'],
        lineHeight: theme?.lineHeights.tight,
      },
    },
    h4: {
      fontSize: theme?.fontSizes.xl,
      lineHeight: theme?.lineHeights.xl,
      [media('lg')]: {
        fontSize: theme?.fontSizes['2xl'],
        lineHeight: theme?.lineHeights['2xl'],
      },
    },
    h5: {
      fontSize: theme?.fontSizes.lg,
      lineHeight: theme?.lineHeights.lg,
      [media('lg')]: {
        fontSize: theme?.fontSizes.xl,
        lineHeight: theme?.lineHeights.xl,
      },
    },
    h6: {
      fontSize: theme?.fontSizes.lg,
      lineHeight: theme?.lineHeights.lg,
      [media('lg')]: {
        fontSize: theme?.fontSizes.base,
        lineHeight: theme?.lineHeights.base,
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

const Heading = styled.h2<HeadingProps>(baseStyles, getSize, styleFunction);

export const H1 = Heading.withComponent('h1');
export const H2 = Heading.withComponent('h2');
export const H3 = Heading.withComponent('h3');
export const H4 = Heading.withComponent('h4');
export const H5 = Heading.withComponent('h5');
export const H6 = Heading.withComponent('h6');

H1.defaultProps = { size: 'h1' };
H2.defaultProps = { size: 'h2' };
H3.defaultProps = { size: 'h3' };
H4.defaultProps = { size: 'h4' };
H5.defaultProps = { size: 'h5' };
H6.defaultProps = { size: 'h6' };

export { Heading };
export default Heading;
