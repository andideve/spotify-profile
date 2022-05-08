import React from 'react';

import { Box, BoxProps } from '../../components/atoms/box';
import media from '../../utils/media';

export default function Head({ children, ...rest }: Omit<BoxProps, 'sx'>) {
  return (
    <>
      <Box
        sx={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          padding: '1.5rem 4vw',
          minHeight: 340,
          [media('lg')]: { paddingRight: '2vw', paddingLeft: '2vw' },
        }}
        {...rest}
      >
        {/* Head background */}
        <Box
          sx={({ theme }) => ({
            position: 'absolute',
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            backgroundColor: theme?.colors.card.default,
            backgroundImage: `linear-gradient(transparent 0, hsla(0, 0%, 0%, .5) 100%)`,
            zIndex: -1,
          })}
        />
        {children}
      </Box>
      {/* Gradient bottom */}
      <Box
        sx={({ theme }) => ({
          position: 'absolute',
          right: 0,
          left: 0,
          height: 232,
          backgroundColor: theme?.colors.card.default,
          backgroundImage: `linear-gradient(hsla(0, 0%, 0%, .6) 0, ${theme?.colors.body.background} 100%)`,
          zIndex: -1,
        })}
      />
    </>
  );
}
