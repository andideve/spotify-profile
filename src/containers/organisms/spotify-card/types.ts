import React from 'react';

export type SpotifyCardTypes = 'playlist' | 'podcast' | 'artist' | 'album';

export interface SpotifyCardProps {
  type: SpotifyCardTypes;
  images: { width: number; url: string }[];
  title: string;
  as?: React.ElementType;
  headingTag?: keyof JSX.IntrinsicElements;
  description?: string;
  link?: string;
}
