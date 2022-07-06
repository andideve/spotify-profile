import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { CSSProperties } from 'react';
import styled from '@emotion/styled';
import { Box, BoxProps } from '@andideve/ds-react';
import clsx from 'clsx';

import { TOPBAR_HEIGHTS } from '../../../../config/globals';

import { Menu } from '../../../../types/default';

const MenuAnchor = styled.a`
  display: inline-flex;
  align-items: center;
  width: 100%;
  height: ${TOPBAR_HEIGHTS}px;
  padding: 0 2rem;
  border-bottom: 1px solid var(--color-border);
  color: var(--color-secondary);
  &:focus,
  &.active {
    color: var(--color-secondary-hovered);
  }
`;

const MenuList = styled.ul`
  display: flex;
  flex-direction: column;
  overflow-y: auto;
`;

function MenuItem({ label, to }: Menu) {
  const router = useRouter();
  const active = router.asPath === to;
  return (
    <li className="p-relative">
      <Link href={to} passHref>
        <MenuAnchor
          aria-current={active ? 'page' : undefined}
          className={clsx(active && 'active', 'overlay--after')}
        >
          {label}
        </MenuAnchor>
      </Link>
    </li>
  );
}

export function Drawer({
  children,
  offsetTop,
  offsetBottom,
  ...rest
}: { offsetTop: number; offsetBottom: number } & Omit<BoxProps, 'className' | 'sx'>) {
  const css = {
    '--offset-top': `${offsetTop}px`,
    '--offset-bottom': `${offsetBottom}px`,
  } as CSSProperties;
  return (
    <Box
      className="overlay p-fixed"
      style={css}
      sx={{
        top: 'var(--offset-top)',
        maxHeight: 'calc(100vh - (var(--offset-top) + var(--offset-bottom)))',
        overflowY: 'auto',
        backgroundColor: 'var(--color-background)',
        zIndex: 999,
      }}
      {...rest}
    >
      {children}
    </Box>
  );
}

export function MobileMenu({ items }: { items: Menu[] }) {
  return (
    <MenuList>
      {items.map((menu) => (
        <MenuItem key={menu.to} label={menu.label} to={menu.to} />
      ))}
    </MenuList>
  );
}