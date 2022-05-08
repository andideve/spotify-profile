import React from 'react';

import { GridContainer } from '../../../components/atoms/grid-container';
import { Box } from '../../../components/atoms/box';

function FirstColumn({ children }: { children: React.ReactNode }) {
  return <Box sx={{ gridColumn: '1/span 2', marginTop: 'auto' }}>{children}</Box>;
}

function LastColumn({ children }: { children: React.ReactNode }) {
  return <Box sx={{ gridColumn: '3/-1', marginTop: 'auto' }}>{children}</Box>;
}

export interface HeadGridProps {
  image: React.ReactNode;
  text: React.ReactNode;
}

export default function HeadGrid({ image, text }: HeadGridProps) {
  return (
    <GridContainer>
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
