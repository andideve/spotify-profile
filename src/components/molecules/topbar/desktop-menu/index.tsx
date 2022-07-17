import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import styled from '@emotion/styled';
import { Text, StyledProps, media } from '@andideve/ids-react';

import { Menu } from '../../../../types/default';

const MenuAnchor = styled.a<StyledProps<HTMLAnchorElement>>`
  text-decoration: none !important;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 2.25rem;
  padding: 0 1rem;
  border-radius: ${({ theme }) => theme.radii.base};
  color: inherit;
  &:focus,
  &.active {
    color: var(--color-button-foreground);
    background-color: var(--color-button-background);
  }
  ${media('lg')} {
    height: 2.625rem;
  }
`;

const MenuList = styled.ul`
  display: flex;
  li:not(:first-of-type) {
    margin-left: 0.5rem;
  }
`;

function MenuItem({ label, to }: Menu) {
  const router = useRouter();
  const active = router.asPath === to;
  return (
    <li>
      <Link href={to} passHref>
        <MenuAnchor
          aria-current={active ? 'page' : undefined}
          className={active ? 'active' : undefined}
        >
          <Text size="sm" fontWeight="bold">
            {label}
          </Text>
        </MenuAnchor>
      </Link>
    </li>
  );
}

function DesktopMenu({ items }: { items: Menu[] }) {
  return (
    <MenuList>
      {items.map((menu) => (
        <MenuItem key={menu.to} label={menu.label} to={menu.to} />
      ))}
    </MenuList>
  );
}

export { DesktopMenu };
export default DesktopMenu;
