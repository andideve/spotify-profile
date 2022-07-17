import Link from 'next/link';
import React from 'react';
import { Text } from '@andideve/ids-react';

export interface BrandProps {
  name: string;
  path: string;
}

function Brand({ name, path }: BrandProps) {
  return (
    <Link href={path} passHref>
      <Text
        as="a"
        size="2xl"
        fontWeight="bold"
        sx={{ textDecoration: 'none !important', color: 'inherit' }}
      >
        {name}
      </Text>
    </Link>
  );
}

export { Brand };
export default Brand;
