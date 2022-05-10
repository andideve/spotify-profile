import React from 'react';

import { Box, BoxProps } from '../../components/atoms/box';

import { NAVBAR_WIDTHS } from '../../config/globals';
import media from '../../utils/media';

const Main = React.forwardRef<HTMLDivElement, Omit<BoxProps, 'sx'>>(
  ({ children, ...rest }, ref) => (
    <Box
      ref={ref}
      as="main"
      sx={{
        padding: '2rem 4vw',
        paddingBottom: `calc(2rem + ${NAVBAR_WIDTHS}px)`,
        [media('lg')]: {
          paddingRight: '2vw',
          paddingBottom: '2rem',
          paddingLeft: '2vw',
        },
      }}
      {...rest}
    >
      {children}
    </Box>
  ),
);

export default Main;
