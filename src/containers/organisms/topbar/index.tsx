import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import styled from '@emotion/styled';
import { Box, Drawer, useDisclosure, media } from '@andideve/ids-react';
import useRootClose from 'react-overlays/useRootClose';

import {
  DesktopMenu,
  BrowserNavigation,
  Signup,
  Login,
  UserDropdown,
  MobileMenu,
  Brand,
} from '../../../components/molecules/topbar';

import MenuIcon from '../../../components/atoms/icons/Menu';
import ExternalLink from '../../../components/atoms/icons/ExternalLink';

import { UserCtx, UserCtxValue } from '../../../context/user';

import withCtx from '../../../utils/with-ctx';

import { SITE_PATHS, SPOTIFY_ACCOUNT_URL, SPOTIFY_SIGNUP_URL } from '../../../config/globals';

import { TopbarProps } from './types';

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
        <div className="flex items-center">
          <Signup href={SPOTIFY_SIGNUP_URL(origin)} />
          <Link href={SITE_PATHS.SPOTIFY_LOGIN} passHref>
            <Login />
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

function Topbar({ brand, drawerOffset, menuItems }: TopbarProps) {
  const disclosure = useDisclosure();

  const drawerRef = useRef<HTMLDivElement>(null);

  useRootClose(drawerRef, disclosure.onClose);

  return (
    <ContentWrapper className="flex items-center justify-between">
      <Box display={{ _: 'none', 2: 'flex' }} className="items-center">
        <BrowserNavigation />
        {menuItems && (
          <nav className="Topbar__DNav">
            <DesktopMenu items={menuItems} />
          </nav>
        )}
      </Box>
      <Box display={{ _: 'block', 2: 'none' }}>
        <Brand {...brand} />
      </Box>
      <div className="flex items-center">
        <User className="Topbar__User" />
        <div ref={drawerRef}>
          {menuItems && (
            <nav className="Topbar__MNav">
              <button type="button" onClick={disclosure.toggle}>
                <MenuIcon />
              </button>
              <Drawer
                isOpen={disclosure.isOpen}
                transition={{
                  props: ['opacity', 'transform'],
                  duration: 100,
                  easing: 'linear',
                  initial: { opacity: 0, transform: 'translateY(-1.5rem)' },
                  expanded: { opacity: 1, transform: 'translateY(0)' },
                }}
                style={{
                  top: drawerOffset.top,
                  height: `calc(100vh - ${drawerOffset.top})`,
                  backgroundColor: 'var(--color-background)',
                }}
              >
                <Drawer.Content>
                  <MobileMenu items={menuItems} />
                </Drawer.Content>
              </Drawer>
            </nav>
          )}
        </div>
      </div>
    </ContentWrapper>
  );
}

Topbar.defaultProps = { menuItems: undefined };

export default Topbar;
