import React, { useMemo } from 'react';
import { Box, Text, Image } from '@andideve/ids-react';
import clsx from 'clsx';

import Clock from '../../../../components/atoms/icons/Clock';

import { formatDuration } from '../../../../utils/time-formatter';

import { tableConfig } from '../config';

import { TracksTableProps, TracksTableRowProps } from './types';

const Th = Box.withComponent('th');
const Td = Box.withComponent('td');

export function TracksTable({ children, cols, disableHead }: TracksTableProps) {
  return (
    <table>
      <thead className={clsx(disableHead && 'sr-only', 'color-secondary')}>
        <tr>
          <th style={{ width: tableConfig.numberColWidth }}>#</th>
          <th>Title</th>
          {cols?.map((col) => (
            <Th key={col} display={{ _: 'none', 2: 'table-cell' }}>
              {col}
            </Th>
          ))}
          <th className="text-right">
            <Clock aria-label="Duration" />
          </th>
        </tr>
      </thead>
      <tbody className="color-secondary">{children}</tbody>
    </table>
  );
}

export function TracksTableRow({
  number,
  images,
  title,
  artist,
  duration: _duration,
  cols,
}: TracksTableRowProps) {
  const duration = useMemo(() => formatDuration(_duration), [_duration]);
  return (
    <tr>
      <td style={{ width: tableConfig.numberColWidth }}>{number}</td>
      <td>
        <div className="flex items-center">
          {images.length ? (
            <Image
              ratio={1}
              alt={title}
              width={images[0].width}
              src={images[0].url}
              srcSet={images.map((img) => `${img.url} ${img.width || 320}w`).toString()}
              style={{ marginRight: '1rem', width: '100%', maxWidth: tableConfig.albumImageWidth }}
            />
          ) : null}
          <div>
            <Text className="song-title block color-foreground">{title}</Text>
            {artist && (
              <Text size="sm" className="song-artist block">
                {artist}
              </Text>
            )}
          </div>
        </div>
      </td>
      {cols?.map((col, i) => (
        <Td key={i} display={{ _: 'none', 2: 'table-cell' }}>
          <Text size="sm">{col}</Text>
        </Td>
      ))}
      <td className="text-right">
        <Text size="sm">{duration}</Text>
      </td>
    </tr>
  );
}
