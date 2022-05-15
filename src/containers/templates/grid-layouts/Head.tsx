import React from 'react';

import { GridContainer } from '../../../components/atoms/grid-container';
import { Box } from '../../../components/atoms/box';

import media from '../../../utils/media';
import { TOPBAR_HEIGHTS } from '../../../config/globals';

function FirstColumn({ children }: { children: React.ReactNode }) {
  return (
    <Box
      sx={{
        gridColumn: '1/span 3',
        marginTop: TOPBAR_HEIGHTS,
        [media('lg')]: { gridColumn: 'auto', marginTop: 'auto' },
      }}
    >
      {children}
    </Box>
  );
}

function LastColumn({ children }: { children: React.ReactNode }) {
  return (
    <Box
      sx={{
        gridColumn: '1/-1',
        marginTop: '1rem',
        [media('lg')]: { gridColumn: 'auto', marginTop: 'auto' },
      }}
    >
      {children}
    </Box>
  );
}

export interface HeadGridProps {
  image: React.ReactNode;
  text: React.ReactNode;
}

export default function HeadGrid({ image, text }: HeadGridProps) {
  const imgWidths = 232;
  return (
    <GridContainer sx={{ [media('lg')]: { gridTemplateColumns: `${imgWidths}px 1fr` } }}>
      {image ? (
        <>
          <FirstColumn>{image}</FirstColumn>
          <LastColumn>{text}</LastColumn>
        </>
      ) : (
        <Box sx={{ gridColumn: '1/-1' }}>{text}</Box>
      )}
    </GridContainer>
  );
}
