import React from 'react';
import { CSSObject } from '@emotion/serialize';

import { Box } from '../atoms/box';
import { AspectRatio } from '../atoms/aspect-ratio';

export interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  as?: keyof JSX.IntrinsicElements;
  ratio?: number;
  sx?: CSSObject;
}

function Image({ as = 'img', ratio, sx, ...image }: ImageProps) {
  return (
    <AspectRatio
      ratio={ratio}
      sx={({ theme }) => ({
        overflow: 'hidden',
        backgroundColor: theme?.colors.card.default,
        ...sx,
      })}
    >
      <Box as={as} {...image} />
    </AspectRatio>
  );
}

Image.defaultProps = { as: undefined, ratio: undefined, sx: undefined };

export default Image;
