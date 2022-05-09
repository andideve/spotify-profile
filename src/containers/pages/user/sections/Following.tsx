import React from 'react';

import AlbumList from '../../../templates/AlbumList';

import SectionHead from '../../../organisms/SectionHead';
import AlbumItem from '../../../organisms/AlbumItem';

import { SITE_PATHS } from '../../../../config/globals';
import { MyFollowingArtistsData } from '../../../../services/api';

interface FollowingProps {
  items: MyFollowingArtistsData['artists']['items'];
  headingTag?: keyof JSX.IntrinsicElements;
}

function Following({ items, headingTag }: FollowingProps) {
  return (
    <>
      <SectionHead headingTag={headingTag} title="Following" />
      <AlbumList>
        {items.map((artist) => (
          <AlbumItem
            key={artist.id}
            link={SITE_PATHS.ARTIST(artist.id)}
            title={artist.name}
            description="Profile"
            image={{ alt: artist.name, src: artist.images[0].url }}
          />
        ))}
      </AlbumList>
    </>
  );
}

Following.defaultProps = { headingTag: undefined };

export { Following as FollowingSection };
export default Following;
