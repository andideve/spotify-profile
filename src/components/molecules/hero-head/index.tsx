import React, { useMemo } from 'react';
import { Heading, Paragraph, Text, TypographySizes } from '@andideve/ids-react';

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
          mt="1rem"
          size="xs"
          fontWeight="bold"
          textTransform="uppercase"
          className="category block"
        >
          {category}
        </Text>
      )}
      <Heading as="h2" py=".08em" size={headingSize} fontWeight="bold">
        {title}
      </Heading>
      {description && (
        <Paragraph mt=".5rem" size="sm">
          {description}
        </Paragraph>
      )}
    </header>
  );
}

HeroHead.defaultProps = { category: undefined, description: undefined };
