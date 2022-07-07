import React, { useCallback } from 'react';
import styled from '@emotion/styled';
import clsx from 'clsx';

import ChevronLeft from '../../../atoms/icons/ChevronLeft';
import ChevronRight from '../../../atoms/icons/ChevronRight';

import { BrowserNavigationProps, BrowserNavigationTypes } from './types';

const Button = styled.button`
  --size: 2rem;
  --i-size: 1.875rem;
  display: flex;
  align-items: center;
  justify-content: center;
  width: var(--size);
  height: var(--size);
  border-radius: 999px;
  background-color: hsl(0, 0%, 0%, 0.7);
  &[disabled] {
    cursor: not-allowed;
    opacity: 0.6;
  }
  svg {
    width: var(--i-size);
    height: var(--i-size);
  }
  &.back svg {
    margin-left: -0.125rem;
  }
  &.forward svg {
    margin-right: -0.125rem;
  }
`;

Button.defaultProps = { type: 'button' };

const icons: Record<BrowserNavigationTypes, React.ReactElement> = {
  back: <ChevronLeft strokeWidth={1.5} />,
  forward: <ChevronRight strokeWidth={1.5} />,
};

function BrowserNavigation({ className, type, ...rest }: BrowserNavigationProps) {
  const handler = useCallback(() => window.history[type](), []);
  return (
    <Button aria-label={type} className={clsx(type, className)} onClick={handler} {...rest}>
      {icons[type]}
    </Button>
  );
}

export * from './types';
export { BrowserNavigation };
export default BrowserNavigation;
