import Link from 'next/link';
import React from 'react';

import Image, { ImageProps } from '../../components/molecules/Image';
import Duration from '../../components/molecules/Duration';

import { Box } from '../../components/atoms/box';
import { Paragraph, Text, TextProps } from '../../components/atoms/typography';
import { Table, TableRow, TableRowProps } from '../../components/atoms/table';
import TimeCircle from '../../components/atoms/icons/TimeCircle';

import media from '../../utils/media';
import classes from '../../utils/classes';
import createTransitions from '../../utils/transition';

import { TOPBAR_HEIGHTS, SITE_PATHS } from '../../config/globals';

const TableHead = Box.withComponent('thead');
const Anchor = Box.withComponent('a');

const HOVERABLE = true;

const TABLE_ROW_HOVERABLE_CLASS = 'table-row-hoverable';
const CELL_ADDON_CLASS = 'cell-addon';
const DISABLED_HEAD_CLASS = 'head-inactive';

const rowStyles = ({ theme }: TableRowProps) => `
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
  .TableRow__SecondaryText {
    transition: ${createTransitions('color', { ms: 150 })};
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
    &.${TABLE_ROW_HOVERABLE_CLASS}:hover .TableRow__SecondaryText {
      color: ${theme?.colors.secondary.hovered};
    }
  }
`;

function SecondaryText({ children, as, className, ...rest }: TextProps) {
  return (
    <Text as={as} className={classes(['color-secondary', className])} size="sm" {...rest}>
      {children}
    </Text>
  );
}

SecondaryText.defaultProps = { sx: undefined };

export interface DataLinkProps {
  to: string;
  children?: string;
}

export function DataLink({ children, to }: DataLinkProps) {
  return (
    <Link href={to} passHref>
      <Anchor
        className="underlined"
        sx={({ theme }) => ({ '&:focus': { color: theme?.colors.secondary.hovered } })}
      >
        {children}
      </Anchor>
    </Link>
  );
}

DataLink.defaultProps = { children: undefined };

export interface TracksTableRowProps {
  number: number;
  title: string;
  artistName: string;
  durationMs: number;
  image?: ImageProps;
  cellAddon?: string | React.ReactElement;
  artistId?: string | number;
}

export function TracksTableRow({
  number,
  title,
  artistName,
  image,
  durationMs,
  cellAddon,
  artistId,
}: TracksTableRowProps) {
  return (
    <TableRow
      className={classes([cellAddon && CELL_ADDON_CLASS, HOVERABLE && TABLE_ROW_HOVERABLE_CLASS])}
      sx={rowStyles}
      hoverable={HOVERABLE}
    >
      <td className="color-secondary">{number}</td>
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
            <Paragraph className="single-line-text" title={title}>
              {title}
            </Paragraph>
            <SecondaryText className="TableRow__SecondaryText">
              {artistId ? (
                <DataLink to={SITE_PATHS.ARTIST(artistId)}>{artistName}</DataLink>
              ) : (
                artistName
              )}
            </SecondaryText>
          </Box>
        </Box>
      </td>
      {cellAddon && (
        <td>
          <SecondaryText className="TableRow__SecondaryText">{cellAddon}</SecondaryText>
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

TracksTableRow.defaultProps = { image: undefined, cellAddon: undefined, artistId: undefined };

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
          {head?.cellAddon && <th>{head.cellAddon}</th>}
          <th>
            <Box aria-label="Duration" sx={{ svg: { marginLeft: 'auto' } }}>
              <TimeCircle />
            </Box>
          </th>
        </TableRow>
      </TableHead>
      <tbody>{children}</tbody>
    </Table>
  );
}

TracksTable.defaultProps = { head: undefined, disableHead: undefined, headSticky: undefined };
