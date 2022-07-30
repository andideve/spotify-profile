import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import styled from '@emotion/styled';
import { media } from '@andideve/ids-react';
import clsx from 'clsx';

import { FRAME_LG_X, FRAME_X, TOPBAR_HEIGHTS } from '../../../../config/globals';

import { Menu } from '../../../../types/default';

const MenuAnchor = styled.a`
  display: inline-flex;
  align-items: center;
  width: 100%;
  height: ${TOPBAR_HEIGHTS}px;
  padding: 0 ${FRAME_X}px;
  border-bottom: 1px solid var(--color-border);
  color: var(--color-secondary);
  &:focus,
  &.active {
    color: var(--color-secondary-hovered);
  }
  ${media('lg')} {
    padding-right: ${FRAME_LG_X}px;
    padding-left: ${FRAME_LG_X}px;
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
    <li className="relative">
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

export function MobileMenu({ items }: { items: Menu[] }) {
  return (
    <MenuList>
      {items.map((menu) => (
        <MenuItem key={menu.to} label={menu.label} to={menu.to} />
      ))}
    </MenuList>
  );
}
