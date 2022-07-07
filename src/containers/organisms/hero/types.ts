import React from 'react';
import { BoxProps } from '@andideve/ds-react';

export type HeroTypes = 'profile' | 'playlist' | 'artist' | 'album';

export interface BaseHeroProps {
  Frame: React.FC<React.HTMLAttributes<HTMLElement>>;
  type: HeroTypes;
  images: { width: number; url: string }[];
  title: string;
  category?: string;
  description?: string;
  primaryColor?: string;
}

export type HeroProps = BaseHeroProps & BoxProps;
