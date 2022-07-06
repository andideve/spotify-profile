import React from 'react';
import { AspectRatio } from '@andideve/ds-react';
import clsx from 'clsx';

import { ImageProps } from './types';

function Image({ ratio, className, style, ...rest }: ImageProps) {
  return (
    <AspectRatio
      ratio={ratio}
      className={clsx('overflow-hidden bg-color-card', className)}
      style={style}
    >
      <img alt="" {...rest} />
    </AspectRatio>
  );
}

Image.defaultProps = { ratio: undefined };

export { Image };
export default Image;
export * from './types';
