import React from 'react';

import { Box, BoxProps } from '../../components/atoms/box';
import media from '../../utils/media';

export default function Topbar({ children, ...rest }: Omit<BoxProps, 'sx'>) {
  return (
    <Box
      sx={{
        position: 'relative',
        padding: '1rem 4vw',
        [media('lg')]: { paddingRight: '2vw', paddingLeft: '2vw' },
      }}
      {...rest}
    >
      {children}
    </Box>
  );
}
