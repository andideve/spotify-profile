import React from 'react';
import { CSSObject } from '@emotion/serialize';

import HeadGrid from '../templates/grid-layouts/Head';

import Image, { ImageProps } from '../../components/molecules/Image';
import { Box } from '../../components/atoms/box';
import { Paragraph, Text } from '../../components/atoms/typography';
import { H1 } from '../../components/atoms/headings';

const titleStyles: CSSObject = {
  paddingTop: '0.08em',
  paddingBottom: '0.08em',
  fontWeight: 700,
};

export interface HeadProps {
  title: string;
  image?: Omit<ImageProps, 'sx'> & { radii?: string };
  category?: string;
  stats?: React.ReactNode;
}

export default function Head({
  image: { radii: imgRadii, ...image } = { radii: undefined },
  title,
  category,
  stats,
}: HeadProps) {
  return (
    <HeadGrid
      image={
        (image.src || image.srcSet) && (
          <Image
            alt={title}
            ratio={1}
            sx={{ borderRadius: imgRadii, boxShadow: '0 4px 60px hsla(0, 0%, 0%, .5)' }}
            {...image}
          />
        )
      }
      text={
        <Box>
          {category && (
            <Text size="xs" sx={{ textTransform: 'uppercase', fontWeight: 500 }}>
              {category}
            </Text>
          )}
          {title.length > 18 ? (
            <H1 size="h1" sx={titleStyles}>
              {title}
            </H1>
          ) : (
            <Text as="h1" size="8xl" sx={titleStyles}>
              {title}
            </Text>
          )}
          {stats && (
            <Paragraph
              size="sm"
              sx={{
                marginTop: '.5rem',
                '& > *:not(:first-of-type):before': {
                  content: '"•"',
                  margin: '0 .25rem',
                },
              }}
            >
              {stats}
            </Paragraph>
          )}
        </Box>
      }
    />
  );
}
