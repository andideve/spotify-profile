import type { AppProps } from 'next/app';
import React from 'react';
import { CacheProvider, ThemeProvider, Global } from '@emotion/react';
import { CSSReset } from '@chakra-ui/css-reset';

import createEmotionCache from '../config/emotion-cache';
import theme from '../theme';
import { globalStyles } from '../styles/global';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <CacheProvider value={createEmotionCache()}>
      <ThemeProvider theme={theme}>
        <CSSReset />
        <Global styles={() => globalStyles(theme)} />

        <Component {...pageProps} />
      </ThemeProvider>
    </CacheProvider>
  );
}

export default MyApp;
