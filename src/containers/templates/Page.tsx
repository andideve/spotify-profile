import Head from 'next/head';
import { useRouter } from 'next/router';
import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react';
import styled from '@emotion/styled';

import NavbarTemplate from './Navbar';
import TopbarTemplate from './Topbar';
import MainTemplate from './Main';
import HeadTemplate from './Head';

import { MenuList, MenuItem } from '../organisms/navbar';
import HeadBuilder, { HeadProps } from '../organisms/Head';

import { Container } from '../../components/atoms/container';
import { Box } from '../../components/atoms/box';
import { Button } from '../../components/atoms/button';
import { Text } from '../../components/atoms/typography';
import Profile from '../../components/atoms/icons/Profile';
import ArrowLeft from '../../components/atoms/icons/ArrowLeft';
import ArrowRight from '../../components/atoms/icons/ArrowRight';
import Library from '../../components/atoms/icons/Library';

import useScrolled from '../../hooks/useScrolled';
import useLogout from '../../hooks/useLogout';

import media from '../../utils/media';
import createTransitions from '../../utils/transition';

import {
  SITE_PATHS,
  NAVBAR_LG_WIDTHS,
  TOPBAR_HEIGHTS,
  COLLECTION_TOP_NAVS,
} from '../../config/globals';
import { siteMetadata } from '../../config/site-metadata';

import { StyledProps } from '../../types/styled';

const Nav = Box.withComponent('nav');
const Header = Box.withComponent('header');

const ArrowButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  border-radius: 999px;
  background-color: hsl(0, 0%, 0%, 0.7);
  &[disabled] {
    opacity: 0.6;
    cursor: not-allowed;
  }
  svg {
    width: 1.375rem;
    height: 1.375rem;
  }
`;

ArrowButton.defaultProps = { type: 'button' };

const ButtonAnchor = styled.a<StyledProps<HTMLButtonElement>>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  font-weight: 500;
  &.active {
    background-color: ${({ theme }) => theme.colors.card.hovered};
  }
`;

export function Content({ children }: { children: React.ReactNode }) {
  return (
    <Box
      sx={{
        position: 'relative',
        flex: '1 1 auto',
        [media('lg')]: { paddingLeft: NAVBAR_LG_WIDTHS },
      }}
    >
      {children}
    </Box>
  );
}

interface PageProps {
  children?: React.ReactNode;
  title?: string;
  description?: string;
  head?: HeadProps;
  topnavs?: { to: string; label: string }[];
}

function Page({
  children,
  title,
  description = siteMetadata.description,
  head,
  topnavs,
}: PageProps) {
  const [mainOffsetTop, setMainOffsetTop] = useState(0);

  const router = useRouter();
  const logout = useLogout();

  const mainRef = useRef<HTMLDivElement>(null);

  const scrolled = useScrolled({
    min: mainOffsetTop > 0 ? mainOffsetTop - 32 - TOPBAR_HEIGHTS : 0,
  });

  const defaultTitle = siteMetadata.title;
  const fullTitle = title ? [defaultTitle, title].join(' – ') : defaultTitle;

  useEffect(() => {
    if (mainRef.current) {
      setMainOffsetTop(mainRef.current.offsetTop);
    }
  }, [mainRef.current]);

  const isMenuActive = (path: string) => router.asPath === path;

  return (
    <>
      <Head>
        <title>{fullTitle}</title>
        <meta name="description" content={description} />
      </Head>
      <Nav
        sx={{
          position: 'fixed',
          right: 0,
          bottom: 0,
          left: 0,
          zIndex: 999,
          '.Nav__NavbarTemplate': { width: '100%', height: '100%' },
          [media('lg')]: {
            top: 0,
            right: 'unset',
            '.Nav__NavbarTemplate': { padding: '1rem 0', width: NAVBAR_LG_WIDTHS },
          },
        }}
      >
        <NavbarTemplate className="Nav__NavbarTemplate">
          <MenuList>
            <MenuItem
              path={SITE_PATHS.USER_DASHBOARD}
              icon={<Profile />}
              label="Profile"
              active={isMenuActive(SITE_PATHS.USER_DASHBOARD)}
            />
            <MenuItem
              path={COLLECTION_TOP_NAVS[0].to}
              icon={<Library />}
              label="Your Library"
              active={isMenuActive(COLLECTION_TOP_NAVS[0].to)}
            />
          </MenuList>
        </NavbarTemplate>
      </Nav>
      <Header
        sx={{
          position: 'fixed',
          top: 0,
          right: 0,
          left: 0,
          zIndex: 999,
          [media('lg')]: { left: NAVBAR_LG_WIDTHS },
        }}
      >
        <TopbarTemplate>
          {/* Topbar background */}
          <Box
            className={scrolled ? undefined : 'unscrolled'}
            sx={({ theme }) => ({
              position: 'absolute',
              top: 0,
              right: 0,
              bottom: 0,
              left: 0,
              backgroundColor: theme?.colors.card.default,
              zIndex: -1,
              transition: createTransitions('background-color'),
              '&.unscrolled': { backgroundColor: 'transparent' },
            })}
          />
          <Container>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              {/* Topbar left side */}
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Box sx={{ button: { marginRight: '1rem' } }}>
                  <ArrowButton aria-label="go back" disabled>
                    <ArrowLeft />
                  </ArrowButton>
                  <ArrowButton aria-label="go forward" disabled>
                    <ArrowRight />
                  </ArrowButton>
                </Box>
                {title && !topnavs && (
                  <Text
                    className={scrolled ? undefined : 'unscrolled'}
                    size="2xl"
                    sx={{
                      marginLeft: '1rem',
                      fontWeight: 500,
                      transition: createTransitions('opacity'),
                      '&.unscrolled': { opacity: 0 },
                    }}
                  >
                    {title}
                  </Text>
                )}
                {topnavs && (
                  <Nav sx={{ margin: '-.3125rem 1.5rem', a: { marginRight: '.5rem' } }}>
                    {topnavs.map((nav) => (
                      <Link key={nav.to} href={nav.to} passHref>
                        <ButtonAnchor className={isMenuActive(nav.to) ? 'active' : undefined}>
                          <Text lineHeight="relaxed">{nav.label}</Text>
                        </ButtonAnchor>
                      </Link>
                    ))}
                  </Nav>
                )}
              </Box>
              {/* Topbar right side */}
              <Button type="button" size="xs" onClick={logout}>
                Logout
              </Button>
            </Box>
          </Container>
        </TopbarTemplate>
      </Header>
      <main>
        <Content>
          {head && (
            <HeadTemplate>
              <Container>
                <HeadBuilder {...head} />
              </Container>
            </HeadTemplate>
          )}
          {children && (
            <MainTemplate as="div" ref={mainRef}>
              <Container>
                {!head && <Box sx={{ height: TOPBAR_HEIGHTS }} />}
                {children}
              </Container>
            </MainTemplate>
          )}
        </Content>
      </main>
    </>
  );
}

Page.defaultProps = {
  children: undefined,
  title: undefined,
  description: undefined,
  head: undefined,
  topnavs: undefined,
};

export default Page;
