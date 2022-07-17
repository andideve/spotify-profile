import React, { useMemo } from 'react';
import { Paragraph, Text, TypographySizes } from '@andideve/ids-react';

import { StyleProps } from '../../../types/default';

export default function HeroHead({
  category,
  title,
  description,
  ...rest
}: {
  title: string;
  category?: string;
  description?: string;
} & StyleProps) {
  const headingSize = useMemo((): TypographySizes => {
    if (title.length < 10) return '8xl';
    return '5xl';
  }, [title.length]);
  return (
    <header {...rest}>
      {category && (
        <Text
          size="xs"
          fontWeight="bold"
          className="category d-block"
          sx={{ textTransform: 'uppercase', marginTop: '1rem' }}
        >
          {category}
        </Text>
      )}
      <Text as="h2" size={headingSize} fontWeight="bold" style={{ padding: '.08em 0' }}>
        {title}
      </Text>
      {description && (
        <Paragraph size="sm" style={{ marginTop: '.5rem' }}>
          {description}
        </Paragraph>
      )}
    </header>
  );
}

HeroHead.defaultProps = { category: undefined, description: undefined };
