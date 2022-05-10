import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

import AuthHeader from '../containers/templates/AuthHeader';
import AuthMain from '../containers/templates/AuthMain';

import { Container } from '../components/atoms/container';
import { H1 } from '../components/atoms/headings';
import { Box } from '../components/atoms/box';
import { Paragraph } from '../components/atoms/typography';
import { ButtonLink } from '../components/atoms/button';

import API from '../services/api';

import { SITE_PATHS } from '../config/globals';

const Home: NextPage = () => {
  const router = useRouter();

  useEffect(() => {
    const { code } = router.query;

    if (!router.isReady || !code || !(typeof code === 'string')) return;

    (async () => {
      try {
        await API.login({ code });
        router.push(SITE_PATHS.USER_DASHBOARD);
      } catch (err) {
        // removes query params
        router.replace(SITE_PATHS.LOGIN_DASHBOARD);
      }
    })();
  }, [router.isReady]);

  return (
    <>
      <AuthHeader>
        <Container>
          <H1 size="h2" sx={{ textAlign: 'center' }}>
            Spotify Profile
          </H1>
        </Container>
      </AuthHeader>
      <Box sx={({ theme }) => ({ borderTopWidth: 1, borderColor: theme?.colors.border.default })} />
      <AuthMain>
        <Container maxWidth="sm">
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              textAlign: 'center',
            }}
          >
            <Paragraph sx={{ marginBottom: '.75rem', fontWeight: 500 }}>
              To continue, log in to Spotify.
            </Paragraph>
            <ButtonLink variant="filled" size="lg" href={SITE_PATHS.LOGIN_SPOTIFY}>
              Log In to Spotify
            </ButtonLink>
          </Box>
        </Container>
      </AuthMain>
    </>
  );
};

export default Home;
