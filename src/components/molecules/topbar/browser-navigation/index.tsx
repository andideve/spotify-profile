import React, { useCallback } from 'react';
import styled from '@emotion/styled';

import ChevronLeft from '../../../atoms/icons/ChevronLeft';
import ChevronRight from '../../../atoms/icons/ChevronRight';

import { NavigationTypes } from './types';
import { StyleProps } from '../../../../types/default';

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

const List = styled.div`
  display: flex;
  button {
    margin-right: 1rem;
  }
`;

const icons: Record<NavigationTypes, React.ReactElement> = {
  back: <ChevronLeft strokeWidth={1.5} />,
  forward: <ChevronRight strokeWidth={1.5} />,
};

function Navigation({ type }: { type: NavigationTypes }) {
  const handler = useCallback(() => window.history[type](), []);
  return (
    <Button aria-label={type} className={type} onClick={handler}>
      {icons[type]}
    </Button>
  );
}

function BrowserNavigation(props: StyleProps) {
  return (
    <List {...props}>
      <Navigation type="back" />
      <Navigation type="forward" />
    </List>
  );
}

export * from './types';
export { BrowserNavigation };
export default BrowserNavigation;
