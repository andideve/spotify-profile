import Link from 'next/link';
import React from 'react';
import { Box, Heading, Paragraph, Text } from '@andideve/ids-react';

import { Menu } from '../../../types/default';

const Header = Box.withComponent('header');
const Anchor = Text.withComponent('a');

function SectionHead({
  title,
  description,
  arrow,
}: {
  title: string;
  description?: string;
  arrow?: Menu;
}) {
  const heading = (
    <Heading as="h2" size="2xl" fontWeight="bold" sx={{ letterSpacing: '-0.04em' }}>
      {title}
    </Heading>
  );
  return (
    <Header my="1rem" className="flex items-end justify-between">
      <div>
        {arrow ? (
          <Link href={arrow.to}>
            <a href={arrow.to} className="inline-block" style={{ color: 'inherit' }}>
              {heading}
            </a>
          </Link>
        ) : (
          heading
        )}
        {description && (
          <Paragraph size="sm" className="color-secondary">
            {description}
          </Paragraph>
        )}
      </div>
      {arrow && (
        <Link href={arrow.to} passHref>
          <Anchor
            size="xs"
            fontWeight="bold"
            className="color-secondary"
            sx={{ textTransform: 'uppercase', letterSpacing: '.1em' }}
          >
            {arrow.label}
          </Anchor>
        </Link>
      )}
    </Header>
  );
}

SectionHead.defaultProps = { description: undefined, arrow: undefined };

export { SectionHead };
export default SectionHead;
