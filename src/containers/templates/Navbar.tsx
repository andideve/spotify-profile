import React from 'react';

import { Box, BoxProps } from '../../components/atoms/box';
import media from '../../utils/media';

export default function Navbar({ children, ...rest }: Omit<BoxProps, 'sx'>) {
  return (
    <Box
      sx={({ theme }) => ({
        position: 'relative',
        padding: '0 3vw',
        color: theme?.colors.navbar.text,
        backgroundColor: theme?.colors.navbar.background,
        [media('md')]: { padding: '0 5vw' },
      })}
      {...rest}
    >
      {children}
    </Box>
  );
}
