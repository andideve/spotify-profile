import React from 'react';

import { Box, BoxProps } from '../../components/atoms/box';
import media from '../../utils/media';

export default function Main({ children, ...rest }: Omit<BoxProps, 'sx'>) {
  return (
    <Box
      as="main"
      sx={{
        padding: '2rem 4vw',
        [media('lg')]: { paddingRight: '2vw', paddingLeft: '2vw' },
      }}
      {...rest}
    >
      {children}
    </Box>
  );
}
