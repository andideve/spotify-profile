import React from 'react';

import { Box, BoxProps } from '../../components/atoms/box';
import media from '../../utils/media';

export default function AuthHeader({ children, ...rest }: Omit<BoxProps, 'sx'>) {
  return (
    <Box
      as="header"
      sx={{
        padding: '2.25rem 4vw',
        [media('lg')]: { paddingRight: '2vw', paddingLeft: '2vw' },
      }}
      {...rest}
    >
      {children}
    </Box>
  );
}
