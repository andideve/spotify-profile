import React, { useMemo } from 'react';
import { Paragraph, Text, TextSizes } from '@andideve/ds-react';

export default function HeroHead({
  category,
  title,
  description,
  ...rest
}: {
  title: string;
  category?: string;
  description?: string;
} & React.HTMLAttributes<HTMLElement>) {
  const headingSize = useMemo((): TextSizes => {
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
          className="category d-block"
          sx={{ textTransform: 'uppercase' }}
        >
          {category}
        </Text>
      )}
      <Text as="h2" py=".08em" size={headingSize} fontWeight="bold">
        {title}
      </Text>
      {description && (
        <Paragraph mt=".5rem" size="sm">
          {description}
        </Paragraph>
      )}
    </header>
  );
}

HeroHead.defaultProps = { category: undefined, description: undefined };
