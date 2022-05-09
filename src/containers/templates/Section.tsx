import React from 'react';
import { Box, BoxProps } from '../../components/atoms/box';

export default function Section({ children, ...rest }: Omit<BoxProps, 'sx'>) {
  return (
    <Box sx={{ marginTop: '2.5rem' }} {...rest}>
      {children}
    </Box>
  );
}
