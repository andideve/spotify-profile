import Link from 'next/link';
import React from 'react';
import {
  Box,
  Text,
  Paragraph,
  GridContainer,
  GridContainerProps,
  Image,
} from '@andideve/ids-react';
import clsx from 'clsx';

import { SpotifyCardProps, SpotifyCardTypes } from './types';

const newTextLimitationStyles = (line: number) => `
  -webkit-line-clamp: ${line};
  -webkit-box-orient: vertical;
  display: -webkit-box;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: normal;
`;

export function SpotifyCardList({ children, ...rest }: Omit<GridContainerProps, 'sx'>) {
  return (
    <GridContainer
      sx={`
        gap: 1.5rem !important;
        & > * {
          grid-column: auto/span 2;
        }
      `}
      {...rest}
    >
      {children}
    </GridContainer>
  );
}

const imgRatios: Record<SpotifyCardTypes, number> = {
  playlist: 1,
  podcast: 1,
  artist: 1,
  album: 1,
};

const imgClasses: Record<SpotifyCardTypes, string> = {
  playlist: 'rounded',
  podcast: 'rounded',
  artist: 'rounded-full',
  album: 'rounded',
};

function SpotifyCard({
  as,
  type,
  images,
  title,
  headingTag = 'h3',
  description,
  link,
}: SpotifyCardProps) {
  const heading = (
    <Text
      as={headingTag}
      className="SpotifyCard__Heading font-bold"
      sx={newTextLimitationStyles(1)}
    >
      {title}
    </Text>
  );
  return (
    <Box
      as={as}
      className={clsx(link ? 'card-hoverable' : 'card', 'relative')}
      sx={{
        '.SpotifyCard__Image': { marginBottom: '1rem' },
        '.SpotifyCard__Description': { marginTop: '.25rem' },
      }}
    >
      <Image
        ratio={imgRatios[type]}
        alt={title}
        width={images[0]?.width}
        src={images[0]?.url}
        srcSet={images.map((img) => `${img.url} ${img.width || 320}w`).toString()}
        className={`SpotifyCard__Image block ${imgClasses[type]}`}
        style={{ boxShadow: '0 .5rem 1.5rem hsl(0, 0%, 0%, .5)' }}
      />
      {link ? (
        <Link href={link}>
          <a href={link} className="overlay--after" style={{ color: 'inherit' }}>
            {heading}
          </a>
        </Link>
      ) : (
        heading
      )}
      {description && (
        <Paragraph
          size="sm"
          className="SpotifyCard__Description color-secondary"
          sx={newTextLimitationStyles(2)}
        >
          {description}
        </Paragraph>
      )}
    </Box>
  );
}

SpotifyCard.defaultProps = {
  as: undefined,
  headingTag: undefined,
  description: undefined,
};

export { SpotifyCard };
export default SpotifyCard;
