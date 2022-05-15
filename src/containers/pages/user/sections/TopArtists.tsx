import React, { useMemo } from 'react';

import AlbumList from '../../../templates/AlbumList';

import SectionHead from '../../../organisms/SectionHead';
import AlbumItem from '../../../organisms/AlbumItem';

import { SITE_PATHS } from '../../../../config/globals';

import { MyTopArtistsData } from '../../../../services/api';

interface TopArtistsProps {
  items: MyTopArtistsData['items'];
  headingTag?: keyof JSX.IntrinsicElements;
  max?: number;
}

function TopArtists({ items, headingTag, max }: TopArtistsProps) {
  const list = useMemo(() => (max ? items.slice(0, max) : items), [items, max]);
  return (
    <>
      <SectionHead
        headingTag={headingTag}
        title="Top artists this month"
        description="Only visible to you"
        arrowLink={
          items.length > list.length
            ? { to: SITE_PATHS.USER_TOP_ARTISTS, label: 'See all' }
            : undefined
        }
      />
      <AlbumList>
        {list.map((artist) => {
          const { images } = artist;
          return (
            <AlbumItem
              key={artist.id}
              link={SITE_PATHS.ARTIST(artist.id)}
              title={artist.name}
              description="Artist"
              image={{
                as: 'picture',
                sx: { borderRadius: 999 },
                children: (
                  <>
                    {images.map((image, i) => (
                      <source key={i} srcSet={image.url} media={`(min-width: ${image.width}px)`} />
                    ))}
                    <img alt={artist.name} src={images[images.length - 1].url} />
                  </>
                ),
              }}
            />
          );
        })}
      </AlbumList>
    </>
  );
}

TopArtists.defaultProps = { headingTag: undefined, max: undefined };

export { TopArtists as TopArtistsSection };
export default TopArtists;

