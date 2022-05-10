import React from 'react';
import { CSSObject } from '@emotion/serialize';

import Image, { ImageProps } from '../../components/molecules/Image';
import Duration from '../../components/molecules/Duration';

import { Box } from '../../components/atoms/box';
import { Paragraph, Text, TextProps } from '../../components/atoms/typography';
import { Table, TableRow } from '../../components/atoms/table';

import media from '../../utils/media';
import classes from '../../utils/classes';

import { TOPBAR_HEIGHTS } from '../../config/globals';

const TableHead = Box.withComponent('thead');

const CELL_ADDON_CLASS = 'cell-addon';
const DISABLED_HEAD_CLASS = 'head-inactive';

const rowStyles = `
  --cell-number-w: 16px;
  --cell-title-w: 4fr;
  --cell-duration-w: minmax(120px, 1fr);
  --cell-addon-w: 2fr;
  grid-template-columns: var(--cell-number-w) auto auto;
  &.${CELL_ADDON_CLASS} th:nth-of-type(3),
  &.${CELL_ADDON_CLASS} td:nth-of-type(3) {
    display: none;
  }
  td {
    margin-top: auto;
    margin-bottom: auto;
  }
  table.${DISABLED_HEAD_CLASS} tbody > &:first-of-type {
    margin-top: 0;
  }
  ${media('lg')} {
    grid-template-columns: var(--cell-number-w) var(--cell-title-w) var(--cell-duration-w);
    &.${CELL_ADDON_CLASS} {
      grid-template-columns: var(--cell-number-w) var(--cell-title-w) var(--cell-addon-w) var(--cell-duration-w);
    }
    &.${CELL_ADDON_CLASS} th:nth-of-type(3),
    &.${CELL_ADDON_CLASS} td:nth-of-type(3) {
      display: block;
    }
  }
`;

function SecondaryText({ children, as, sx, ...rest }: Omit<TextProps, 'sx'> & { sx?: CSSObject }) {
  return (
    <Text
      as={as}
      size="sm"
      sx={({ theme }) => ({ color: theme?.colors.secondary.default, ...sx })}
      {...rest}
    >
      {children}
    </Text>
  );
}

SecondaryText.defaultProps = { sx: undefined };

export interface TracksTableRowProps {
  number: number;
  title: string;
  artistName: string;
  durationMs: number;
  image?: ImageProps;
  cellAddon?: string;
}

export function TracksTableRow({
  number,
  title,
  artistName,
  image,
  durationMs,
  cellAddon,
}: TracksTableRowProps) {
  return (
    <TableRow className={cellAddon ? CELL_ADDON_CLASS : undefined} sx={rowStyles}>
      <td>
        <Box sx={({ theme }) => ({ color: theme?.colors.secondary.default })}>{number}</Box>
      </td>
      <td>
        <Box
          className={image ? undefined : 'disable-image'}
          sx={{
            display: 'grid',
            gridTemplateColumns: '40px 1fr',
            columnGap: '1rem',
            '&.disable-image': { display: 'block' },
            '& > *': { marginTop: 'auto', marginBottom: 'auto' },
          }}
        >
          {image && <Image ratio={1} sx={{ borderRadius: '.125rem' }} alt={title} {...image} />}
          <Box sx={{ minWidth: 0 }}>
            <Paragraph
              title={title}
              sx={{ textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}
            >
              {title}
            </Paragraph>
            <SecondaryText>{artistName}</SecondaryText>
          </Box>
        </Box>
      </td>
      {cellAddon && (
        <td>
          <SecondaryText>{cellAddon}</SecondaryText>
        </td>
      )}
      <td>
        <SecondaryText sx={{ display: 'block', textAlign: 'right' }}>
          <Duration ms={durationMs} />
        </SecondaryText>
      </td>
    </TableRow>
  );
}

TracksTableRow.defaultProps = { image: undefined, cellAddon: undefined };

export interface TracksTablePropsOptions {
  head?: {
    cellAddon?: string;
  };
  disableHead?: boolean;
  headSticky?: boolean;
}

export interface TracksTableProps extends TracksTablePropsOptions {
  children: React.ReactNode;
}

export function TracksTable({ children, head, disableHead, headSticky }: TracksTableProps) {
  return (
    <Table className={disableHead ? DISABLED_HEAD_CLASS : undefined}>
      <TableHead
        className={classes([disableHead && 'sr-only', headSticky && 'head-sticky'])}
        sx={({ theme }) => ({
          '&.head-sticky': {
            position: 'sticky',
            top: TOPBAR_HEIGHTS,
            backgroundColor: theme?.colors.body.background,
            zIndex: 1,
          },
        })}
      >
        <TableRow className={head?.cellAddon && CELL_ADDON_CLASS} sx={rowStyles}>
          <th>#</th>
          <th>Title</th>
          {head?.cellAddon && <th>{head?.cellAddon}</th>}
          <th>
            <Box sx={{ textAlign: 'right' }}>Duration</Box>
          </th>
        </TableRow>
      </TableHead>
      <tbody>{children}</tbody>
    </Table>
  );
}

TracksTable.defaultProps = { head: undefined, disableHead: undefined, headSticky: undefined };
