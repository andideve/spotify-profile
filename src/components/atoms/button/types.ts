import React from 'react';
import { StyledProps } from '../../../types/styled';
import { StyleFunctionProps } from '../../../utils/with-sx-prop/types';
import { BoxRingProps } from '../box-ring/types';

export type ButtonVariants = 'filled' | 'filled-secondary' | 'outlined';
export type ButtonSizes = 'xs' | 'lg';

export type ButtonRingProps = Omit<BoxRingProps, 'transitionMs'>;

export interface ButtonOptions {
  variant?: ButtonVariants;
  size?: ButtonSizes;
}

export type BaseButtonProps = ButtonOptions & StyleFunctionProps<StyledProps['theme']>;

export type ButtonProps = BaseButtonProps &
  StyledProps<HTMLButtonElement> &
  React.ButtonHTMLAttributes<HTMLButtonElement>;

export interface ButtonAnchorProps
  extends BaseButtonProps,
    StyledProps<HTMLAnchorElement>,
    React.AnchorHTMLAttributes<HTMLAnchorElement> {
  external?: boolean;
}

export type ButtonLinkProps = BaseButtonProps &
  StyledProps<HTMLAnchorElement> &
  React.AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string;
  };
