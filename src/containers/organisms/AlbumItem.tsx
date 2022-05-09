import Link from 'next/link';
import React from 'react';
import { CSSObject } from '@emotion/serialize';

import Image, { ImageProps } from '../../components/molecules/Image';

import { Box } from '../../components/atoms/box';
import { Paragraph, Text, TextProps } from '../../components/atoms/typography';

import media from '../../utils/media';
import createTransitions from '../../utils/transition';

const Anchor = Box.withComponent('a');

function SecondaryText({ children, sx }: Omit<TextProps, 'sx'> & { sx?: CSSObject }) {
  return (
    <Text size="sm" sx={({ theme }) => ({ color: theme?.colors.secondary.default, ...sx })}>
      {children}
    </Text>
  );
}

SecondaryText.defaultProps = { sx: undefined };

export interface AlbumItemProps {
  image: ImageProps;
  title: string;
  headingTag?: keyof JSX.IntrinsicElements;
  description?: React.ReactNode;
  link?: string;
}

export default function AlbumItem({
  image: { sx: imageSx, ...image },
  title,
  headingTag = 'h3',
  description,
  link,
}: AlbumItemProps) {
  const card = (
    <Box
      sx={({ theme }) => ({
        display: 'flex',
        flexDirection: 'column',
        padding: '1rem',
        borderRadius: '.375rem',
        backgroundColor: theme?.colors.card.default,
        transition: createTransitions('background-color'),
        'a:focus > &': { backgroundColor: theme?.colors.card.hovered },
        [media('lg')]: {
          'a:hover > &': { backgroundColor: theme?.colors.card.hovered },
        },
      })}
    >
      <Image
        ratio={1}
        sx={{ borderRadius: '.25rem', boxShadow: '0 8px 24px hsla(0, 0%, 0%, .5)', ...imageSx }}
        {...image}
      />
      <Box sx={{ flex: '1 1 auto', marginTop: '1rem', minHeight: 62 }}>
        <Paragraph
          as={headingTag}
          title={title}
          sx={{
            textOverflow: 'ellipsis',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            fontWeight: 500,
          }}
        >
          {title}
        </Paragraph>
        {description && <SecondaryText as="p">{description}</SecondaryText>}
      </Box>
    </Box>
  );

  return (
    <li>
      {link ? (
        <Link href={link} passHref>
          <Anchor sx={{ display: 'block' }}>{card}</Anchor>
        </Link>
      ) : (
        card
      )}
    </li>
  );
}
