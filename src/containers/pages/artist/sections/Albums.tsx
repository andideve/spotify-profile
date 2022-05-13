import React from 'react';

import AlbumList from '../../../templates/AlbumList';

import SectionHead from '../../../organisms/SectionHead';
import AlbumItem from '../../../organisms/AlbumItem';

import AlbumYear from '../../../../components/molecules/AlbumYear';
import AlbumType from '../../../../components/molecules/AlbumType';

import { SITE_PATHS } from '../../../../config/globals';
import { ArtistAlbumsData } from '../../../../services/api';

function Album({ items }: { items: ArtistAlbumsData['items'] }) {
  return (
    <>
      <SectionHead title="Albums" />
      <AlbumList>
        {items.map((album) => {
          const { images } = album;
          return (
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
              image={{
                as: 'picture',
                children: (
                  <>
                    {images.map((image, i) => (
                      <source key={i} srcSet={image.url} media={`(min-width: ${image.width}px)`} />
                    ))}
                    <img alt={album.name} src={images[images.length - 1].url} />
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

export { Album as AlbumSection };
export default Album;
