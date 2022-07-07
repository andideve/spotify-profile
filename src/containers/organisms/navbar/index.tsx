import React from 'react';
import styled from '@emotion/styled';
import { Box, media } from '@andideve/ds-react';

import { NavMenu } from '../../../components/molecules/navbar';

import { MenuWithIcon } from '../../../types/default';
import { NAVBAR_HEIGHTS, NAVBAR_LG_WIDTHS } from '../../../config/globals';

const Nav = Box.withComponent('nav');

const Frame = styled.div`
  padding: 0 0.5rem;
  height: ${NAVBAR_HEIGHTS}px;
  background-color: var(--color-black);
  ${media('lg')} {
    flex-direction: column;
    padding-top: 1.5rem;
    padding-bottom: 1.5rem;
    width: ${NAVBAR_LG_WIDTHS}px;
    height: 100%;
  }
`;

export default function Navbar({ menuItems }: { menuItems: MenuWithIcon[] }) {
  return (
    <Nav
      className="p-fixed inset-0"
      sx={{
        top: 'unset',
        zIndex: 1000,
        [media('lg')]: { top: 0, right: 'unset' },
      }}
    >
      <Frame>
        <NavMenu items={menuItems} />
      </Frame>
    </Nav>
  );
}
