import Link from 'next/link';
import React from 'react';

import { Box } from '../../components/atoms/box';
import { H2 } from '../../components/atoms/headings';
import { Paragraph } from '../../components/atoms/typography';

const Anchor = Paragraph.withComponent('a');

export interface SectionHeadProps {
  title: string;
  headingTag?: keyof JSX.IntrinsicElements;
  description?: string;
  arrowLink?: {
    to: string;
    label: string;
  };
}

export default function SectionHead({
  title,
  headingTag,
  description,
  arrowLink,
}: SectionHeadProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        marginBottom: '1rem',
      }}
    >
      {/* Left side */}
      <div>
        <H2 as={headingTag} size="h4">
          {title}
        </H2>
        {description && (
          <Paragraph
            size="sm"
            sx={({ theme }) => ({ marginTop: '.25rem', color: theme?.colors.secondary.default })}
          >
            {description}
          </Paragraph>
        )}
      </div>
      {/* Right side */}
      {arrowLink && (
        <Link href={arrowLink.to} passHref>
          <Anchor
            className="underlined"
            size="xs"
            sx={{ textTransform: 'uppercase', fontWeight: 500 }}
          >
            {arrowLink.label}
          </Anchor>
        </Link>
      )}
    </Box>
  );
}
