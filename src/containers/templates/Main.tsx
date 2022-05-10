import React from 'react';

import { Box, BoxProps } from '../../components/atoms/box';
import media from '../../utils/media';

const Main = React.forwardRef<HTMLDivElement, Omit<BoxProps, 'sx'>>(
  ({ children, ...rest }, ref) => (
    <Box
      ref={ref}
      as="main"
      sx={{
        padding: '2rem 4vw',
        [media('lg')]: { paddingRight: '2vw', paddingLeft: '2vw' },
      }}
      {...rest}
    >
      {children}
    </Box>
  ),
);

export default Main;
