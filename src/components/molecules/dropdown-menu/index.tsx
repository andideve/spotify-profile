import React, { useCallback } from 'react';
import styled from '@emotion/styled';
import { media, StyledProps, Text } from '@andideve/ids-react';

import { DropdownMenuProps } from './types';

const List = styled.ul<StyledProps<HTMLUListElement>>`
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  max-height: calc(100vh - 1.5rem);
  max-width: 350px;
  min-width: 160px;
  padding: 0.25rem;
  border-radius: ${({ theme }) => theme.radii.base};
  background-color: hsl(0, 0%, 16%);
  box-shadow: 0 1rem 1.5rem hsl(0, 0%, 0%, 0.3), 0 0.375rem 0.5rem hsl(0, 0%, 0%, 0.2);
`;

const Button = styled.button<StyledProps<HTMLButtonElement>>`
  --i-size: 1rem;
  cursor: default;
  padding: 0.75rem;
  width: 100%;
  height: 40px;
  border-radius: ${({ theme }) => theme.radii.sm};
  color: hsla(0, 0%, 100%, 0.9);
  &:focus {
    color: white;
    background-color: hsla(0, 0%, 100%, 0.1);
  }
  svg {
    margin-left: 0.5rem;
    width: var(--i-size);
    height: var(--i-size);
  }
  ${media('lg')} {
    &:hover {
      color: white;
      background-color: hsla(0, 0%, 100%, 0.1);
    }
  }
`;

Button.defaultProps = { type: 'button' };

function DropdownMenu({ items, onClose, ...rest }: DropdownMenuProps) {
  const onSelect: React.MouseEventHandler<HTMLButtonElement> = useCallback((ev) => {
    const { index } = ev.currentTarget.dataset;
    const item = items[Number(index)];

    if (typeof onClose === 'function') onClose(ev);
    if (typeof item.onSelect === 'function') item.onSelect(ev);
  }, []);
  return (
    <List role="menu" {...rest}>
      {items.map((item, i) => (
        <li key={i} role="presentation">
          <Button
            role="menuitem"
            className="d-flex justify-between"
            data-index={i}
            onClick={onSelect}
          >
            <Text size="sm" lineHeight="none">
              {item.title}
            </Text>
            {item.icon}
          </Button>
        </li>
      ))}
    </List>
  );
}

export * from './types';
export { DropdownMenu };
export default DropdownMenu;
