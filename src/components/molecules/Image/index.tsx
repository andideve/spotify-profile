import React from 'react';
import { AspectRatio } from '@andideve/ds-react';
import clsx from 'clsx';

import { ImageProps } from './types';

function Image({ ratio, className, style, ...rest }: ImageProps) {
  return (
    <span className={clsx('overflow-hidden bg-color-card', className)} style={style}>
      <AspectRatio ratio={ratio}>
        <img alt="" {...rest} />
      </AspectRatio>
    </span>
  );
}

Image.defaultProps = { ratio: undefined };

export { Image };
export default Image;
export * from './types';
