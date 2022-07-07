import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import styled from '@emotion/styled';
import { Box, media } from '@andideve/ds-react';
import useRootClose from 'react-overlays/useRootClose';

import {
  DesktopMenu,
  BrowserNavigation,
  Signup,
  Login,
  UserDropdown,
  Drawer,
  MobileMenu,
  BrandProps,
  Brand,
} from '../../../components/molecules/topbar';

import MenuIcon from '../../../components/atoms/icons/Menu';
import ExternalLink from '../../../components/atoms/icons/ExternalLink';

import { UserCtx, UserCtxValue } from '../../../context/user';

import withCtx from '../../../utils/with-ctx';

import {
  NAVBAR_HEIGHTS,
  SITE_PATHS,
  SPOTIFY_ACCOUNT_URL,
  SPOTIFY_SIGNUP_URL,
  TOPBAR_HEIGHTS,
} from '../../../config/globals';

import { Menu } from '../../../types/default';

const BrowserNavigationList = styled.div`
  display: flex;
  button {
    margin-right: 1rem;
  }
`;

const User = withCtx<UserCtxValue, { className?: string }>(
  UserCtx.Consumer,
  ({ value: { state, dispatch }, className }) => {
    const [origin, setOrigin] = useState('');

    const router = useRouter();

    useEffect(() => {
      setOrigin(new URL(window.location.href).origin);
    }, []);

    const logout = useCallback(() => {
      dispatch?.((s) => ({
        ...s,
        isLogin: false,
      }));
    }, []);

    if (!state.initialized) return null;

    if (!state.isLogin || !state.uid) {
      return (
        <div className="d-flex items-center">
          <Signup href={SPOTIFY_SIGNUP_URL(origin)}>Sign up</Signup>
          <Link href={SITE_PATHS.SPOTIFY_LOGIN} passHref>
            <Login>Log in</Login>
          </Link>
        </div>
      );
    }

    return (
      <UserDropdown
        className={className}
        images={state.images}
        name={state.name}
        menuItems={[
          {
            title: 'Account',
            icon: <ExternalLink />,
            onSelect: () => window.open(SPOTIFY_ACCOUNT_URL, '_blank'),
          },
          { title: 'Profile', onSelect: () => router.push(SITE_PATHS.PROFILE) },
          { title: 'Log out', onSelect: logout },
        ]}
      />
    );
  },
);

const ContentWrapper = styled.div`
  height: 100%;
  .Topbar__MNav {
    display: block;
    margin-left: 1rem;
  }
  .Topbar__User {
    margin-left: 1rem;
  }
  ${media('lg')} {
    .Topbar__DNav {
      padding-left: 1.5rem;
    }
    .Topbar__MNav {
      display: none;
    }
  }
`;

function Topbar({ brand, menuItems }: { brand: BrandProps; menuItems?: Menu[] }) {
  const [open, setOpen] = useState(false);

  const drawerRef = useRef<HTMLDivElement>(null);

  const toggle = useCallback(() => {
    setOpen((s) => !s);
  }, []);

  const close = useCallback(() => {
    setOpen(false);
  }, []);

  useRootClose(drawerRef, close);

  return (
    <ContentWrapper className="d-flex items-center justify-between">
      <Box d={{ _: 'none', 2: 'flex' }} className="items-center">
        <BrowserNavigationList className="Topbar__BrowserNavigationList">
          <BrowserNavigation type="back" />
          <BrowserNavigation type="forward" />
        </BrowserNavigationList>
        {menuItems && (
          <nav className="Topbar__DNav">
            <DesktopMenu items={menuItems} />
          </nav>
        )}
      </Box>
      <Box d={{ _: 'block', 2: 'none' }}>
        <Brand {...brand} />
      </Box>
      <div className="d-flex items-center">
        <User className="Topbar__User" />
        <div ref={drawerRef}>
          {menuItems && (
            <nav className="Topbar__MNav">
              <button type="button" onClick={toggle}>
                <MenuIcon />
              </button>
              {open && (
                <Drawer offsetTop={TOPBAR_HEIGHTS} offsetBottom={NAVBAR_HEIGHTS}>
                  <MobileMenu items={menuItems} />
                </Drawer>
              )}
            </nav>
          )}
        </div>
      </div>
    </ContentWrapper>
  );
}

Topbar.defaultProps = { menuItems: undefined };

export default Topbar;
