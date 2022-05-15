import React, { useMemo } from 'react';

import AlbumList from '../../../templates/AlbumList';

import SectionHead from '../../../organisms/SectionHead';
import AlbumItem from '../../../organisms/AlbumItem';

import { SITE_PATHS } from '../../../../config/globals';
import { MyFollowingArtistsData } from '../../../../services/api';

interface FollowingProps {
  items: MyFollowingArtistsData['artists']['items'];
  title?: string;
  headingTag?: keyof JSX.IntrinsicElements;
  max?: number;
}

function Following({ items, title = 'Following', headingTag, max }: FollowingProps) {
  const list = useMemo(() => (max ? items.slice(0, max) : items), [items, max]);
  return (
    <>
      <SectionHead
        headingTag={headingTag}
        title={title}
        arrowLink={
          items.length > list.length
            ? { to: SITE_PATHS.USER_FOLLOWING, label: 'See all' }
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
              description="Profile"
              image={{
                as: 'picture',
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

Following.defaultProps = { title: undefined, headingTag: undefined, max: undefined };

export { Following as FollowingSection };
export default Following;
