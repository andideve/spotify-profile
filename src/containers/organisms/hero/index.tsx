import React from 'react';
import { Box, Image } from '@andideve/ids-react';
import clsx from 'clsx';

import HeroHead from '../../../components/molecules/hero-head';

import { HeroProps, HeroTypes } from './types';

const imgRatios: Record<HeroTypes, number> = {
  profile: 1,
  playlist: 1,
  artist: 1071 / 340,
  album: 1,
};
const imgClasses: Record<HeroTypes, string | undefined> = {
  profile: 'rounded-full',
  playlist: undefined,
  artist: undefined,
  album: undefined,
};

export default function Hero({
  Frame,
  type,
  images,
  category,
  title,
  description,
  primaryColor,
  ...rest
}: HeroProps) {
  const avatarSize = '14.5rem';

  function renderImage(avatarClass?: string) {
    if (!images.length) return null;

    if (type === 'artist') {
      return (
        <div
          className="overlay"
          style={{
            backgroundAttachment: 'fixed',
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundImage: `url(${images[0].url})`,
            zIndex: -1,
          }}
        />
      );
    }

    return (
      <Image
        ratio={imgRatios[type]}
        alt={title}
        width={images[0].width}
        src={images[0].url}
        srcSet={images.map((img) => `${img.url} ${img.width || 320}w`).toString()}
        className={clsx(imgClasses[type], avatarClass)}
        style={{ width: avatarSize, boxShadow: '0 .25rem 3.75rem hsl(0, 0%, 0%, .5)' }}
      />
    );
  }

  const content = (
    <Frame className="relative">
      <Box
        flexWrap={{ _: 'wrap', 2: 'nowrap' }}
        className="flex items-end"
        sx={{ '.Hero__AvatarImage': { marginRight: '1.5rem' } }}
      >
        {renderImage('Hero__AvatarImage')}
        <HeroHead
          className="relative"
          category={category}
          title={title}
          description={description}
          style={{ zIndex: 1 }}
        />
      </Box>
    </Frame>
  );

  return (
    <Box className="relative" {...rest}>
      <div className="overlay" style={{ backgroundColor: primaryColor, zIndex: -1 }} />
      <div
        className="overlay"
        style={{
          backgroundImage: 'linear-gradient(transparent 0, hsl(0, 0%, 0%, .5) 100%)',
          zIndex: 0,
        }}
      />
      {content}
      <div
        className="absolute"
        style={{
          width: '100%',
          height: avatarSize,
          backgroundColor: primaryColor,
          backgroundImage: 'linear-gradient(hsl(0, 0%, 0%, .6) 0, var(--color-background) 100%)',
          zIndex: -1,
        }}
      />
    </Box>
  );
}

Hero.defaultProps = { category: undefined, description: undefined, primaryColor: undefined };

export * from './types';
