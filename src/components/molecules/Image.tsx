import React from 'react';
import { CSSObject } from '@emotion/serialize';

import { Box } from '../atoms/box';
import { AspectRatio } from '../atoms/aspect-ratio';

export interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  ratio?: number;
  sx?: CSSObject;
}

function Image({ ratio, sx, ...image }: ImageProps) {
  return (
    <AspectRatio
      ratio={ratio}
      sx={({ theme }) => ({
        overflow: 'hidden',
        backgroundColor: theme?.colors.card.default,
        ...sx,
      })}
    >
      <Box as="img" {...image} />
    </AspectRatio>
  );
}

Image.defaultProps = { ratio: undefined, sx: undefined };

export default Image;
