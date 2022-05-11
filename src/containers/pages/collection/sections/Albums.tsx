import React from 'react';

import AlbumList from '../../../templates/AlbumList';

import SectionHead from '../../../organisms/SectionHead';
import AlbumItem from '../../../organisms/AlbumItem';

import AlbumYear from '../../../../components/molecules/AlbumYear';
import AlbumType from '../../../../components/molecules/AlbumType';

import { MySavedAlbumsData } from '../../../../services/api';
import { SITE_PATHS } from '../../../../config/globals';

interface AlbumProps {
  items: MySavedAlbumsData['items'];
  headingTag?: keyof JSX.IntrinsicElements;
}

function Album({ items, headingTag }: AlbumProps) {
  return (
    <>
      <SectionHead title="Albums" headingTag={headingTag} />
      <AlbumList>
        {items.map(({ album }) => {
          if (!album) return null;
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
              image={{ alt: album.name, src: album.images[0].url }}
            />
          );
        })}
      </AlbumList>
    </>
  );
}

Album.defaultProps = { headingTag: undefined };

export { Album as AlbumSection };
export default Album;
