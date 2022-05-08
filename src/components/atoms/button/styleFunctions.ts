import { CSSInterpolation, CSSObject, FunctionInterpolation } from '@emotion/serialize';

import defaults, { transitionMs, buttonRadii } from './defaults';
import { styleFunction } from '../../../utils/with-sx-prop';
import createTransitions from '../../../utils/transition';
import media from '../../../utils/media';
import { BaseButtonProps, ButtonVariants, ButtonSizes } from './types';

const baseTransitionProps = ['opacity', 'background-color'];
const baseTransition = createTransitions(baseTransitionProps, { ms: transitionMs, tFn: 'ease' });

const baseStyles = `
  outline: none;
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: ${buttonRadii};
  font-weight: 500;
  transition: ${baseTransition};
  &[disabled] {
    cursor: default;
    opacity: 0.24;
  }
`;

const getVariant = ({ theme, variant = defaults.variant }: BaseButtonProps): CSSObject => {
  const base: Record<Extract<ButtonVariants, 'filled'>, CSSObject> = {
    filled: {
      border: 'none',
    },
  };

  const variants: Record<ButtonVariants, CSSObject> = {
    filled: {
      ...base.filled,
      color: theme?.colors.primary.contrast,
      backgroundColor: theme?.colors.primary.default,
      '&:focus': {},
      [media('lg')]: {
        '&:hover': {},
      },
    },
    'filled-secondary': {
      ...base.filled,
      color: theme?.colors.white,
      backgroundColor: theme?.colors.card.default, // FIXME?
    },
    outlined: {
      borderColor: theme?.colors.border.default,
      color: 'inherit',
      backgroundColor: 'transparent',
      transition: `${baseTransition}, ${createTransitions(['border-color'], {
        ms: transitionMs,
        tFn: 'ease',
      })}, color .15s ease`,
      '&:not([disabled]):focus, &:not([disabled]):active': {
        borderColor: 'transparent',
        color: theme?.colors.primary.default,
      },
      [media('md')]: {
        '&:not([disabled]):hover': {
          borderColor: 'transparent',
          color: theme?.colors.primary.default,
        },
      },
    },
  };

  return variants[variant];
};

const getSize = ({
  theme,
  variant = defaults.variant,
  size = defaults.size,
}: BaseButtonProps): CSSObject => {
  const shouldAddBorder = variant === 'outlined';

  const fontSizes: Record<'sm', CSSObject> = {
    sm: {
      fontSize: theme?.fontSizes.sm,
      lineHeight: theme?.lineHeights.sm,
    },
  };

  const sizes: Record<ButtonSizes, CSSObject> = {
    xs: {
      padding: '.375rem 1rem',
      borderWidth: shouldAddBorder ? 1 : 0,
      ...fontSizes.sm,
    },
    lg: {
      padding: '.875rem 2rem',
      borderWidth: shouldAddBorder ? 1 : 0,
      ...fontSizes.sm,
    },
  };

  return sizes[size];
};

export const styleFunctions: (CSSInterpolation | FunctionInterpolation<BaseButtonProps>)[] = [
  baseStyles,
  getVariant,
  getSize,
  styleFunction,
];

export default styleFunctions;
