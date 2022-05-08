import React from 'react';
import { CSSObject } from '@emotion/serialize';

import HeadGrid from '../templates/grid-layouts/Head';

import Image from '../../components/molecules/Image';
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
  image?: {
    url: string;
    radii?: string;
  };
  category?: string;
  stats?: React.ReactNode;
}

export default function Head({ image, title, category, stats }: HeadProps) {
  return (
    <HeadGrid
      image={
        image && (
          <Image
            ratio={1}
            src={image.url}
            sx={{ borderRadius: image.radii, boxShadow: '0 4px 60px hsla(0, 0%, 0%, .5)' }}
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
