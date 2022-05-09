import React from 'react';
import { GridContainer } from '../../components/atoms/grid-container';

function AlbumList({ children }: { children: React.ReactNode }) {
  return (
    <GridContainer
      as="ul"
      sx={{
        listStyle: 'none',
        rowGap: '1.5rem',
        '& > li': { gridColumn: 'auto/span 2' },
      }}
    >
      {children}
    </GridContainer>
  );
}

export default AlbumList;
