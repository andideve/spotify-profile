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
        {toggleMore.list.map((track, i) => {
          const { images } = track.album;
          return (
            <TracksTableRow
              key={track.id}
              number={i + 1}
              title={track.name}
              artistName=""
              durationMs={track.duration_ms}
              cellAddon={`${track.popularity}%`}
              image={{
                as: 'picture',
                children: (
                  <>
                    {images.map((image, imageIndex) => (
                      <source
                        key={imageIndex}
                        srcSet={image.url}
                        media={`(min-width: ${image.width}px)`}
                      />
                    ))}
                    <img alt={track.name} src={images[images.length - 1].url} />
                  </>
                ),
              }}
            />
          );
        })}
      </TracksTable>
      <MoreButton onClick={toggleMore.handler}>
        <Text size="xs">{toggleMore.more ? 'Show Less' : 'See More'}</Text>
      </MoreButton>
    </>
  );
}

export { Popular as PopularSection };
export default Popular;

