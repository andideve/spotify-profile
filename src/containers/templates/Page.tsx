import React, { useEffect, useMemo, useState } from 'react';
import { Box, Container, media, newTransition } from '@andideve/ds-react';
import styled from '@emotion/styled';

import Head, { HeadProps } from './Head';

import Navbar from '../organisms/navbar';
import Topbar from '../organisms/topbar';
import Hero, { BaseHeroProps } from '../organisms/hero';

import {
  NAVBAR_HEIGHTS,
  NAVBAR_LG_WIDTHS,
  SITE_PATHS,
  TOPBAR_HEIGHTS,
  FRAME_X,
  FRAME_LG_X,
} from '../../config/globals';

import { Menu } from '../../types/default';

import { siteMetadata } from '../../_data/app/site-metadata';
import { siteMenu } from '../../_data/app/site-menu';

function TopbarFrame({
  children,
  primaryColor = 'hsl(0, 0%, 7%)',
  ...rest
}: React.HTMLAttributes<HTMLElement> & { primaryColor?: string }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 0);
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const background = (
    <div
      className="overlay"
      style={{
        opacity: scrolled ? 1 : 0,
        backgroundColor: primaryColor,
        zIndex: -1,
        transition: newTransition('opacity', { duration: 100 }),
      }}
    >
      <div style={{ height: '100%', backgroundColor: 'hsla(0, 0%, 0%, .6)' }} />
    </div>
  );

  return (
    <Box px={{ _: FRAME_X, 2: FRAME_LG_X }} h={TOPBAR_HEIGHTS} {...rest}>
      {background}
      {children}
    </Box>
  );
}

TopbarFrame.defaultProps = { primaryColor: undefined };

const Main = styled.main`
  padding-bottom: 2rem;
  ${media('lg')} {
    margin-left: ${NAVBAR_LG_WIDTHS}px;
  }
`;

const HeroFrame = styled.div`
  display: flex;
  align-items: flex-end;
  padding: 1.5rem ${FRAME_X}px;
  ${media('lg')} {
    padding-top: 0;
    padding-right: ${FRAME_LG_X}px;
    padding-left: ${FRAME_LG_X}px;
    height: 30vh;
    max-height: 500px;
    min-height: 340px;
  }
`;

export const SectionStack = styled.div`
  & > section:not(:first-of-type) {
    margin-top: 2.5rem;
  }
`;

export function Section({ children }: { children: React.ReactNode }) {
  return (
    <Box as="section" mb="1rem" px={{ _: FRAME_X, 2: FRAME_LG_X }}>
      {children}
    </Box>
  );
}

export type HeroProps = Omit<BaseHeroProps, 'Frame' | 'primaryColor'>;

interface PageProps extends HeadProps {
  children: React.ReactNode;
  menuItems?: Menu[];
  hero?: HeroProps;
  primaryColor?: string;
}

export default function Page({
  children,
  title,
  description = siteMetadata.description,
  menuItems,
  hero,
  primaryColor,
}: PageProps) {
  const fullTitle = useMemo(
    () => (title ? [title, siteMetadata.title].join(' - ') : siteMetadata.title),
    [title],
  );
  return (
    <>
      <Head title={fullTitle} description={description} />
      <header>
        <h1 className="sr-only">{fullTitle}</h1>
        <Navbar menuItems={siteMenu} />

        {!hero && <div style={{ height: TOPBAR_HEIGHTS }} />}
        <Box
          ml={{ 2: NAVBAR_LG_WIDTHS }}
          className="p-fixed inset-0"
          sx={{ bottom: 'unset', zIndex: 999 }}
        >
          <TopbarFrame primaryColor={primaryColor}>
            <Topbar
              brand={{ name: siteMetadata.title, path: SITE_PATHS.USER_DASHBOARD }}
              menuItems={menuItems}
            />
          </TopbarFrame>
        </Box>
      </header>
      <Main>
        <Container>
          {hero && (
            <section>
              <Hero
                pt={{ _: TOPBAR_HEIGHTS, 2: 0 }}
                Frame={HeroFrame}
                primaryColor={primaryColor}
                {...hero}
              />
            </section>
          )}

          {children}
        </Container>
      </Main>
      <Box h={{ _: NAVBAR_HEIGHTS, 2: 0 }} />
    </>
  );
}

Page.defaultProps = { menuItems: undefined, hero: undefined, primaryColor: undefined };
