import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { media, newTransition, StyledProps, Text } from '@andideve/ds-react';
import styled from '@emotion/styled';
import clsx from 'clsx';

import { MenuWithIcon } from '../../../../types/default';

const MenuAnchor = styled.a`
  --i-size: 1.5rem;
  text-decoration: none !important;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 1rem;
  color: var(--color-secondary);
  transition: ${newTransition('color', { duration: 200, easing: 'linear' })};
  &:focus,
  &.active {
    color: var(--color-secondary-hovered);
  }
  svg {
    width: var(--i-size);
    height: var(--i-size);
  }
  .MenuAnchor__Text {
    position: absolute;
    left: -100vw;
  }
  ${media('lg')} {
    flex-direction: row;
    height: 2.5rem;
    &:hover {
      color: var(--color-secondary-hovered);
    }
    svg {
      margin-right: 1rem;
    }
    .MenuAnchor__Text {
      position: static;
      left: 0;
    }
  }
`;

const MenuList = styled.ul<StyledProps<HTMLUListElement>>`
  display: flex;
  li {
    flex-grow: 1;
  }
  @media only screen and (max-width: ${({ theme }) => theme.screens.lg}) {
    &,
    li {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100%;
    }
  }
  ${media('lg')} {
    flex-direction: column;
  }
`;

function MenuItem({ to, label, Icon }: MenuWithIcon) {
  const router = useRouter();
  const active = router.asPath === to;
  return (
    <li className="p-relative">
      <Link href={to} passHref>
        <MenuAnchor className={clsx(active && 'active', 'overlay--after')}>
          <Icon />
          <Text size="sm" fontWeight="bold" className="MenuAnchor__Text">
            {label}
          </Text>
        </MenuAnchor>
      </Link>
    </li>
  );
}

function NavMenu({ items }: { items: MenuWithIcon[] }) {
  return (
    <MenuList>
      {items.map((menu) => (
        <MenuItem key={menu.to} to={menu.to} label={menu.label} Icon={menu.Icon} />
      ))}
    </MenuList>
  );
}

export { NavMenu };
export default NavMenu;
