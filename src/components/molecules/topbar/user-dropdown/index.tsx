import React, { useCallback, useRef, useState } from 'react';
import styled from '@emotion/styled';
import { media, Text, Image } from '@andideve/ids-react';
import clsx from 'clsx';
import useRootClose from 'react-overlays/useRootClose';

import DropdownMenu from '../../dropdown-menu';

import ChevronUp from '../../../atoms/icons/ChevronUp';
import ChevronDown from '../../../atoms/icons/ChevronDown';

import { UserDropdownProps } from './types';

const Button = styled.button`
  --i-size: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.125rem;
  border-radius: 999px;
  background-color: var(--color-black);
  &[disabled] {
    cursor: default;
  }
  .UserDropdown__Name {
    display: inline-block;
    margin: 0 0.5rem;
  }
  svg {
    margin-right: 0.375rem;
    width: var(--i-size);
    height: var(--i-size);
  }
  &:focus,
  &.active {
    color: var(--color-button-foreground);
    background-color: var(--color-button-background);
  }
  ${media('lg')} {
    &:hover {
      color: var(--color-button-foreground);
      background-color: var(--color-button-background);
    }
  }
`;

Button.defaultProps = { type: 'button' };

const toggleIcons = {
  open: <ChevronUp />,
  closed: <ChevronDown />,
};

function UserDropdown({ className, images, name, menuItems }: UserDropdownProps) {
  const [open, setOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggle = useCallback(() => {
    setOpen((s) => !s);
  }, []);

  const close = useCallback(() => {
    setOpen(false);
  }, []);

  useRootClose(dropdownRef, close);

  return (
    <div ref={dropdownRef} className="p-relative">
      <Button className={clsx(open && 'active', className)} onClick={toggle} disabled={!menuItems}>
        <Image
          ratio={1}
          alt={name}
          width={images[0]?.width}
          src={images[0]?.url}
          srcSet={images.map((img) => `${img.url} ${img.width || 320}w`).toString()}
          className="rounded-full"
          style={{ width: 28 }}
        />
        <Text size="sm" fontWeight="bold" className="user-name UserDropdown__Name">
          {name}
        </Text>
        {menuItems && (open ? toggleIcons.open : toggleIcons.closed)}
      </Button>
      {menuItems && (
        <div
          className="overlay"
          style={{ minWidth: 196, transform: 'translate(-80px, 40px)', zIndex: 999 }}
        >
          {open && <DropdownMenu onClose={close} items={menuItems} />}
        </div>
      )}
    </div>
  );
}

export * from './types';
export { UserDropdown };
export default UserDropdown;
