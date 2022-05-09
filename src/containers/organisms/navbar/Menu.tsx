import Link from 'next/link';
import React from 'react';

import { Box } from '../../../components/atoms/box';
import { Text } from '../../../components/atoms/typography';

import media from '../../../utils/media';
import createTransitions from '../../../utils/transition';

import { MenuItemProps } from './types';

const UList = Box.withComponent('ul');
const Anchor = Text.withComponent('a');

export function MenuList({ children }: { children: React.ReactNode }) {
  return (
    <UList
      sx={{
        listStyle: 'none',
        display: 'flex',
        flexWrap: 'nowrap',
        alignItems: 'center',
        overflowX: 'auto',
        li: { width: '100%', flex: '1 1 auto' },
        [media('lg')]: { flexDirection: 'column' },
      }}
    >
      {children}
    </UList>
  );
}

export function MenuItem({ icon, label, path, active }: MenuItemProps) {
  return (
    <li>
      <Link href={path} passHref>
        <Anchor
          className={active ? 'active' : undefined}
          sx={({ theme }) => ({
            display: 'block',
            padding: '1rem',
            color: theme?.colors.secondary.default,
            transition: createTransitions('color'),
            '&.active': { fontWeight: 500 },
            '&:hover, &:focus, &.active': { color: theme?.colors.body.text },
          })}
        >
          <Box sx={{ svg: { margin: '0 auto', width: '1.25rem', height: '1.25rem' } }}>{icon}</Box>
          <Text
            size="xs"
            sx={{
              display: 'block',
              marginTop: '.375rem',
              textAlign: 'center',
            }}
          >
            {label}
          </Text>
        </Anchor>
      </Link>
    </li>
  );
}