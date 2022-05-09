import React from 'react';
import styled from '@emotion/styled';

import SectionHead from '../../../organisms/SectionHead';
import { TracksTable, TracksTableRow } from '../../../organisms/TracksTable';

import { Text } from '../../../../components/atoms/typography';

import useToggleMore from '../../../../hooks/useToggleMore';

import media from '../../../../utils/media';
import { StyledProps } from '../../../../types/styled';

import { ArtistTopTracksData } from '../../../../services/api';

const MoreButton = styled.button<StyledProps<HTMLButtonElement>>`
  text-transform: uppercase;
  padding: 1rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.secondary.default};
  &:focus {
    color: ${({ theme }) => theme.colors.secondary.hovered};
  }
  ${media('lg')} {
    &:hover {
      color: ${({ theme }) => theme.colors.secondary.hovered};
    }
  }
`;

MoreButton.defaultProps = { type: 'button' };

interface PopularProps {
  items: ArtistTopTracksData['tracks'];
}

function Popular({ items }: PopularProps) {
  const toggleMore = useToggleMore(items);
  return (
    <>
      <SectionHead title="Popular" />
      <TracksTable head={{ cellAddon: 'Popularity' }} disableHead>
        {toggleMore.list.map((tracks, i) => (
          <TracksTableRow
            key={tracks.id}
            number={i + 1}
            image={{ alt: tracks.name, src: tracks.album.images[0].url }}
            title={tracks.name}
            artistName=""
            durationMs={tracks.duration_ms}
            cellAddon={tracks.popularity.toString()}
          />
        ))}
      </TracksTable>
      <MoreButton onClick={toggleMore.handler}>
        <Text size="xs">{toggleMore.more ? 'Show Less' : 'See More'}</Text>
      </MoreButton>
    </>
  );
}

export { Popular as PopularSection };
export default Popular;
