import React from 'react';
import { Box } from '../atoms/box';

export default function AlbumType({ children }: { children: string }) {
  return (
    <Box as="span" sx={{ textTransform: 'capitalize' }}>
      {children}
    </Box>
  );
}
