import React from 'react';

import AlbumList from '../../../templates/AlbumList';

import SectionHead from '../../../organisms/SectionHead';
import AlbumItem from '../../../organisms/AlbumItem';

import AlbumYear from '../../../../components/molecules/AlbumYear';
import AlbumType from '../../../../components/molecules/AlbumType';

import { SITE_PATHS } from '../../../../config/globals';
import { ArtistTopTracksData } from '../../../../services/api';

function PopularReleases({ items }: { items: ArtistTopTracksData['tracks'][0]['album'][] }) {
  return (
    <>
      <SectionHead title="Popular Releases" />
      <AlbumList>
        {items.map((album) => (
          <AlbumItem
            key={album.id}
            link={SITE_PATHS.ALBUM(album.id)}
            title={album.name}
            description={
              <>
                <AlbumYear date={album.release_date} />
                &nbsp;•&nbsp;
                <AlbumType>{album.album_type}</AlbumType>
              </>
            }
            image={{ alt: album.name, src: album.images[0].url }}
          />
        ))}
      </AlbumList>
    </>
  );
}

export { PopularReleases as PopularReleasesSection };
export default PopularReleases;
